import { createObserverScope } from './observer-scope';

const layoutAttributeName = 'data-unitone-layout';
const layoutIntersectionMargin = 200;
const layoutIntersectionRootMargin = `${layoutIntersectionMargin}px 0px`;
const layoutPositionTolerance = 0.5;

/**
 * Returns layout tokens from the target element.
 *
 * @param {Element | null | undefined} element Target element.
 * @returns {string[]} Layout tokens.
 */
const getLayoutTokens = (element) =>
  (element.getAttribute(layoutAttributeName) ?? '').split(/\s+/).filter(Boolean);

/**
 * Returns tokens with the specified values removed.
 *
 * @param {string[]} tokens Source tokens.
 * @param {string[]} removedTokens Tokens to remove.
 * @returns {string[]} Filtered tokens.
 */
const withoutLayoutTokens = (tokens, removedTokens) =>
  tokens.filter((value) => !removedTokens.includes(value));

/**
 * Updates the layout token attribute on the element.
 *
 * @param {Element} element Target element.
 * @param {string[]} tokens Tokens to set.
 * @returns {void}
 */
const setLayoutTokens = (element, tokens) => {
  const nextValue = tokens.filter(Boolean).join(' ');
  if ((element.getAttribute(layoutAttributeName) ?? '') !== nextValue) {
    element.setAttribute(layoutAttributeName, nextValue);
  }
};

/**
 * Observes target resizes and invokes the callback when a relevant change is detected.
 *
 * @param {Element} target Target element.
 * @param {(target: Element) => void} callback Callback to run.
 * @param {ReturnType<typeof createObserverScope>} scope Observer lifetime.
 * @param {(entry: ResizeObserverEntry) => unknown} [getValue] Value to compare.
 * @returns {ResizeObserver} ResizeObserver instance.
 */
const createResizeObserver = (target, callback, scope, getValue) => {
  const prevValues = new WeakMap();
  const onResize = debounce(() => callback(target), 250);
  const observer = new ResizeObserver((entries) => {
    if (scope.disposed) {
      return;
    }

    let changed = false;
    for (const entry of entries) {
      const currentValue = getValue?.(entry);
      if (
        !prevValues.has(entry.target) ||
        undefined === currentValue ||
        currentValue !== prevValues.get(entry.target)
      ) {
        changed = true;
      }
      prevValues.set(entry.target, currentValue);
    }

    if (changed) {
      onResize();
    }
  });
  scope.addCleanup(onResize.cancel);
  scope.addCleanup(() => observer.disconnect());

  observer.observe(target);

  return observer;
};

/**
 * Creates a MutationObserver for the target node.
 *
 * @param {Node} target Target node.
 * @param {MutationObserverInit} options Observer options.
 * @param {(entries: MutationRecord[]) => void} callback Callback to run.
 * @param {ReturnType<typeof createObserverScope>} scope Observer lifetime.
 * @returns {void}
 */
const createMutationObserver = (target, options, callback, scope) => {
  const observer = new MutationObserver((entries) => {
    if (!scope.disposed && target.isConnected) {
      callback(entries);
    }
  });

  observer.observe(target, options);
  scope.addCleanup(() => observer.disconnect());
};

/**
 * Creates an IntersectionObserver for the target element.
 *
 * @param {Element} target Target element.
 * @param {(entry: IntersectionObserverEntry) => void} callback Callback to run.
 * @param {ReturnType<typeof createObserverScope>} scope Observer lifetime.
 * @returns {void}
 */
const createIntersectionObserver = (target, callback, scope) => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry && !scope.disposed) {
        callback(entry);
      }
    },
    { rootMargin: layoutIntersectionRootMargin },
  );

  observer.observe(target);
  scope.addCleanup(() => observer.disconnect());
};

/**
 * Returns a scheduler that coalesces re-application work into a single frame.
 *
 * @param {Element} target Target element.
 * @param {(target: Element) => void} callback Callback to run.
 * @param {ReturnType<typeof createObserverScope>} scope Observer lifetime.
 * @returns {() => void} Schedule function.
 */
const createScheduledTargetCallback = (target, callback, scope) => {
  let rafId = 0;

  return () => {
    if (scope.disposed || rafId) {
      return;
    }

    rafId = scope.requestAnimationFrame(() => {
      rafId = 0;
      if (target?.isConnected) {
        callback(target);
      }
    });
  };
};

/**
 * Keeps resize and optional attribute observation in sync with direct children.
 *
 * @param {Element} target Target element.
 * @param {ResizeObserver} resizeObserver Shared size observer.
 * @param {(target: Element) => void} callback Callback to run.
 * @param {ReturnType<typeof createObserverScope>} scope Observer lifetime.
 * @param {{ attributeFilter: string[], shouldApply: (entry: MutationRecord) => boolean }} [attributes]
 * @returns {void}
 */
const observeLayoutChildren = (target, resizeObserver, callback, scope, attributes) => {
  const observedChildren = new Set();
  const attributeObserver = attributes
    ? new MutationObserver((entries) => {
        if (
          !scope.disposed &&
          target.isConnected &&
          hasAttributeMutation(
            entries,
            (entry) => entry.target.parentElement === target && attributes.shouldApply(entry),
          )
        ) {
          callback(target);
        }
      })
    : null;
  scope.addCleanup(() => {
    observedChildren.clear();
    attributeObserver?.disconnect();
  });

  const syncChildren = () => {
    for (const child of observedChildren) {
      if (child.parentElement !== target) {
        resizeObserver.unobserve(child);
        observedChildren.delete(child);
      }
    }

    attributeObserver?.disconnect();
    for (const child of target.children) {
      if (!observedChildren.has(child)) {
        resizeObserver.observe(child);
        observedChildren.add(child);
      }
      attributeObserver?.observe(child, {
        attributes: true,
        attributeFilter: attributes.attributeFilter,
        attributeOldValue: true,
      });
    }
  };

  syncChildren();
  createMutationObserver(
    target,
    { childList: true },
    () => {
      syncChildren();
      callback(target);
    },
    scope,
  );
};

/**
 * Creates a bundled observer setup for layout re-application.
 *
 * @param {Element} target Target element.
 * @param {(target: Element, scope: ReturnType<typeof createObserverScope>) => void} apply Apply function.
 * @param {{
 *   getResizeValue?: (entry: ResizeObserverEntry) => unknown,
 *   observeDirectChildrenResize?: boolean,
 *   targetMutation?: { options: MutationObserverInit, shouldApply: (entries: MutationRecord[]) => boolean },
 *   directChildMutation?: { attributeFilter: string[], shouldApply: (entry: MutationRecord) => boolean }
 * }} [options]
 * @returns {() => void} Stops observation and cancels queued work.
 */
const createLayoutObserver = (
  target,
  apply,
  { getResizeValue, observeDirectChildrenResize = false, targetMutation, directChildMutation } = {},
) => {
  const scope = createObserverScope(target);
  const shouldObserveIntersection = 'undefined' !== typeof IntersectionObserver;
  let isIntersecting = !shouldObserveIntersection || isNearViewport(target);
  let needsApply = !isIntersecting;

  const runApply = () => {
    if (scope.disposed || !target.isConnected) {
      return;
    }

    if (!isIntersecting) {
      needsApply = true;
      return;
    }

    needsApply = false;
    apply(target, scope);
  };

  const schedule = createScheduledTargetCallback(target, runApply, scope);
  const scheduleApply = () => {
    if (scope.disposed || !target?.isConnected) {
      return;
    }

    needsApply = true;
    if (isIntersecting) {
      schedule();
    }
  };

  const resizeObserver = createResizeObserver(target, scheduleApply, scope, getResizeValue);
  if (observeDirectChildrenResize) {
    observeLayoutChildren(target, resizeObserver, scheduleApply, scope, directChildMutation);
  }

  if (shouldObserveIntersection) {
    createIntersectionObserver(
      target,
      (entry) => {
        isIntersecting = entry.isIntersecting;
        if (isIntersecting && needsApply) {
          scheduleApply();
        }
      },
      scope,
    );
  }

  if (targetMutation) {
    createMutationObserver(
      target,
      targetMutation.options,
      (entries) => {
        if (targetMutation.shouldApply(entries)) {
          scheduleApply();
        }
      },
      scope,
    );
  }

  if (isIntersecting) {
    runApply();
  }

  return scope.dispose;
};

const getBorderBoxInlineSize = (entry) => entry.borderBoxSize?.[0].inlineSize;

const getContentRectWidth = (entry) => parseInt(entry.contentRect?.width);

const getElementStyle = (element) =>
  (element.ownerDocument.defaultView ?? window).getComputedStyle(element);

const isInFlow = (element) => {
  const { position, display } = getElementStyle(element);
  return !['absolute', 'fixed'].includes(position) && 'none' !== display;
};

const hasLayoutBox = (element) => !!element?.isConnected && 0 < element.getClientRects().length;

const isNearViewport = (element) => {
  if (!hasLayoutBox(element)) {
    return false;
  }

  const defaultView = element?.ownerDocument?.defaultView;
  if (!defaultView) {
    return true;
  }

  const rect = element.getBoundingClientRect();
  const viewportWidth = defaultView.innerWidth;
  const viewportHeight = defaultView.innerHeight;

  return (
    rect.bottom > -layoutIntersectionMargin &&
    rect.right > 0 &&
    rect.top < viewportHeight + layoutIntersectionMargin &&
    rect.left < viewportWidth
  );
};

/**
 * Returns the target rectangle's start and end positions along the layout's inline flow.
 *
 * @param {DOMRect} rect Target rectangle.
 * @param {{ direction?: string, flexDirection?: string, writingMode?: string }} flow Layout flow.
 * @returns {{ start: number, end: number }} Normalized inline positions.
 */
const getNormalizedInlineRect = (
  rect,
  { direction = 'ltr', flexDirection = 'row', writingMode = 'horizontal-tb' } = {},
) => {
  const isVertical = !writingMode.startsWith('horizontal');
  const isSidewaysLr = 'sideways-lr' === writingMode;
  const isInlineReverse = ('rtl' === direction) !== isSidewaysLr;

  let start = isVertical ? rect.top : rect.left;
  let end = isVertical ? rect.bottom : rect.right;

  if (isInlineReverse) {
    [start, end] = [-end, -start];
  }

  if ('row-reverse' === flexDirection) {
    [start, end] = [-end, -start];
  }

  return { start, end };
};

/**
 * Compares each attribute before the batch with its final value, ignoring intermediate writes.
 *
 * @param {MutationRecord[]} entries Mutation records.
 * @param {(entry: MutationRecord) => boolean} predicate Match predicate.
 * @returns {boolean} Whether a matching attributes mutation exists.
 */
const hasAttributeMutation = (entries, predicate) => {
  const seen = new Map();
  return entries.some((entry) => {
    if ('attributes' !== entry.type) {
      return false;
    }
    const attributes = seen.get(entry.target) ?? new Set();
    if (attributes.has(entry.attributeName)) {
      return false;
    }
    attributes.add(entry.attributeName);
    seen.set(entry.target, attributes);
    return predicate(entry);
  });
};

/**
 * Coalesces repeated calls into the final call within the delay window.
 *
 * @param {Function} fn Function to wrap.
 * @param {number} delay Delay in milliseconds.
 * @returns {Function & { cancel: () => void }} Debounced function with cancellation.
 */
export function debounce(fn, delay) {
  let timer;

  const debounced = function (...args) {
    const context = this;
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = undefined;
      fn.apply(context, args);
    }, delay);
  };
  debounced.cancel = () => {
    clearTimeout(timer);
    timer = undefined;
  };
  return debounced;
}

/**
 * Recalculates line wrapping state for divider layouts.
 *
 * @param {Element} target Target element.
 * @returns {void}
 */
export const setDividerLinewrap = (target) => {
  const children = Array.from(target?.children ?? []);
  const currentLayoutArray = withoutLayoutTokens(getLayoutTokens(target), [
    'divider:initialized',
    '-stack',
  ]);
  setLayoutTokens(target, currentLayoutArray);

  const childLayouts = children.map((child) => ({
    child,
    layoutTokens: withoutLayoutTokens(getLayoutTokens(child), ['-bol', '-linewrap']),
  }));

  const applyChildLayouts = () => {
    childLayouts.forEach(({ child, layoutTokens }) => {
      setLayoutTokens(child, layoutTokens);
    });
  };

  if (!currentLayoutArray.some((value) => value.startsWith('-divider:'))) {
    applyChildLayouts();
    return;
  }

  if (0 === children.length) {
    setLayoutTokens(target, [...currentLayoutArray, 'divider:initialized']);
    return;
  }

  if (!hasLayoutBox(target)) {
    applyChildLayouts();
    return;
  }

  const defaultView =
    target?.ownerDocument?.defaultView ?? ('undefined' !== typeof window ? window : undefined);
  if (!defaultView?.getComputedStyle) {
    applyChildLayouts();
    return;
  }

  const targetStyle = getElementStyle(target);
  const flow = {
    direction: targetStyle.getPropertyValue('direction'),
    flexDirection: targetStyle.getPropertyValue('flex-direction'),
    writingMode: targetStyle.getPropertyValue('writing-mode'),
  };

  const targetChildren = [];
  for (const entry of childLayouts) {
    if (isInFlow(entry.child)) {
      entry.inlineRect = getNormalizedInlineRect(entry.child.getBoundingClientRect(), flow);
      targetChildren.push(entry);
    }
  }

  if (0 === targetChildren.length) {
    applyChildLayouts();
    setLayoutTokens(target, [...currentLayoutArray, 'divider:initialized']);
    return;
  }

  let prevInlineRect;
  let hasWrapped = false;
  let isStack = true;
  targetChildren.forEach(({ layoutTokens, inlineRect }, index) => {
    const isBeginningOfLine =
      0 === index ||
      inlineRect.start < prevInlineRect.end - layoutPositionTolerance ||
      inlineRect.start <= prevInlineRect.start + layoutPositionTolerance;

    if (isBeginningOfLine) {
      layoutTokens.push('-bol');
      if (0 < index) {
        hasWrapped = true;
      }
    } else {
      isStack = false;
    }

    if (hasWrapped) {
      layoutTokens.push('-linewrap');
    }

    prevInlineRect = inlineRect;
  });
  applyChildLayouts();

  const nextTargetLayout = [...currentLayoutArray];
  if (isStack) {
    nextTargetLayout.push('-stack');
  }

  nextTargetLayout.push('divider:initialized');
  setLayoutTokens(target, nextTargetLayout);
};

const withoutAttributeTokens = (value, ignoredTokens) =>
  withoutLayoutTokens((value ?? '').split(' '), ignoredTokens).join(' ');

/**
 * Creates the observer bundle for divider layouts.
 *
 * @param {Element} target Target element.
 * @param {{ ignore?: { layout?: string[], className?: string[] } }} [args]
 * @returns {() => void} Stops observation and cancels queued work.
 */
export const dividersResizeObserver = (target, args = {}) => {
  const shouldRecalculateByAttributeMutation = (entry) => {
    const { attributeName, oldValue } = entry;
    const currentValue = entry.target.getAttribute(attributeName);
    const ignoredTokens =
      layoutAttributeName === attributeName
        ? [...(args?.ignore?.layout ?? []), 'divider:initialized', '-bol', '-linewrap', '-stack']
        : 'class' === attributeName
          ? [...(args?.ignore?.className ?? [])]
          : null;

    if (ignoredTokens) {
      return (
        withoutAttributeTokens(currentValue, ignoredTokens) !==
        withoutAttributeTokens(oldValue, ignoredTokens)
      );
    }

    return ['style', 'dir'].includes(attributeName) && (currentValue ?? '') !== (oldValue ?? '');
  };

  return createLayoutObserver(target, setDividerLinewrap, {
    getResizeValue: getBorderBoxInlineSize,
    observeDirectChildrenResize: true,
    targetMutation: {
      options: {
        attributes: true,
        attributeFilter: ['style', 'dir', 'data-unitone-layout', 'class'],
        attributeOldValue: true,
      },
      shouldApply: (entries) =>
        hasAttributeMutation(
          entries,
          (entry) => entry.target === target && shouldRecalculateByAttributeMutation(entry),
        ),
    },
    directChildMutation: {
      attributeFilter: ['style', 'data-unitone-layout', 'class'],
      shouldApply: shouldRecalculateByAttributeMutation,
    },
  });
};

/**
 * Recalculates step values for stairs layouts.
 *
 * @param {Element} target Target element.
 * @returns {void}
 */
export const setStairsStep = (target) => {
  const children = Array.from(target.children);
  const currentLayoutArray = withoutLayoutTokens(getLayoutTokens(target), ['stairs:initialized']);
  setLayoutTokens(target, currentLayoutArray);

  if (0 === children.length) {
    setLayoutTokens(target, [...currentLayoutArray, 'stairs:initialized']);
    return;
  }

  // Measure the unshifted layout before applying steps and measuring their overflow.
  target.style.removeProperty('--unitone--stairs-step-overflow-volume');
  target.style.removeProperty('--unitone--max-stairs-step');
  children.forEach((child) => {
    child.style.removeProperty('--unitone--stairs-step');
  });

  if (!hasLayoutBox(target)) {
    return;
  }

  const stairsUp = (target.getAttribute('data-unitone-layout') ?? '')
    .split(/\s+/)
    .find((value) => value.startsWith('-stairs-up:'))
    ?.replace('-stairs-up:', '');

  const isAlternatingStairs = ['up-down', 'down-up'].includes(stairsUp);

  const direction = getElementStyle(target).getPropertyValue('flex-direction');
  const targetBottom = target.getBoundingClientRect().bottom;
  const filteredChildren = children.reduce((accumulator, child) => {
    if (!isInFlow(child)) {
      return accumulator;
    }

    accumulator.push({
      child,
      rect: child.getBoundingClientRect(),
    });
    return accumulator;
  }, []);

  let prevRect;
  let stairsStep = 0;
  let maxStairsStep = stairsStep;

  const nextSteps = filteredChildren.map(({ child, rect }, index) => {
    const isBol =
      'row-reverse' === direction ? prevRect?.left <= rect.left : prevRect?.left >= rect.left;

    if (0 === index || isBol) {
      stairsStep = 0;
    } else if (isAlternatingStairs) {
      stairsStep = 0 === stairsStep ? 1 : 0;
    } else {
      stairsStep++;
    }

    prevRect = rect;

    if (stairsStep > maxStairsStep) {
      maxStairsStep = stairsStep;
    }

    return {
      child,
      stairsStep,
    };
  });

  nextSteps.forEach(({ child, stairsStep }) => {
    child.style.setProperty('--unitone--stairs-step', stairsStep);
  });

  target.style.setProperty('--unitone--max-stairs-step', maxStairsStep);

  const overflowVolume = filteredChildren.reduce((accumulator, { child }) => {
    const overflow = child.getBoundingClientRect().bottom - targetBottom;
    return accumulator > overflow ? accumulator : overflow;
  }, 0);

  target.style.setProperty('--unitone--stairs-step-overflow-volume', overflowVolume);
  setLayoutTokens(target, [...currentLayoutArray, 'stairs:initialized']);
};

/**
 * Creates the observer bundle for stairs layouts.
 *
 * @param {Element} target Target element.
 * @returns {() => void} Stops observation and cancels queued work.
 */
export const stairsResizeObserver = (target) => {
  return createLayoutObserver(target, setStairsStep, {
    observeDirectChildrenResize: true,
  });
};

/**
 * Returns whether the node should be ignored by vertical-writing mutation handling.
 *
 * @param {Node | null | undefined} node Target node.
 * @returns {boolean} Whether the node should be ignored.
 */
const isIgnoredVerticalWritingMutationNode = (node) =>
  node?.nodeType === Node.ELEMENT_NODE &&
  'vertical-writing__thresholder' === node.getAttribute(layoutAttributeName);

/**
 * Returns whether vertical-writing mutations require re-application.
 *
 * @param {MutationRecord[]} entries Mutation records.
 * @returns {boolean} Whether re-application is required.
 */
const shouldApplyVerticalWritingMutation = (entries) =>
  entries.some((entry) => {
    if ('attributes' === entry.type) {
      return true;
    }

    if ('childList' !== entry.type) {
      return false;
    }

    return [...entry.addedNodes, ...entry.removedNodes].some(
      (node) => !isIgnoredVerticalWritingMutationNode(node),
    );
  });

/**
 * Recalculates column count and height for vertical-writing layouts.
 *
 * @param {Element} target Target element.
 * @param {ReturnType<typeof createObserverScope>} [scope] Observer lifetime.
 * @returns {void}
 */
const updateColumnCountForVertical = (target, scope) => {
  if (!target) {
    return;
  }

  const currentLayoutTokens = getLayoutTokens(target);
  const baseLayoutTokens = withoutLayoutTokens(currentLayoutTokens, [
    'vertical-writing:safari',
    '-force-switch',
  ]);
  const nextLayoutTokens = withoutLayoutTokens(currentLayoutTokens, [
    'vertical-writing:initialized',
    'vertical-writing:safari',
    '-force-switch',
  ]);
  setLayoutTokens(target, baseLayoutTokens);

  let lastChild;
  Array.from(target.children)
    .reverse()
    .some((child) => {
      if (isInFlow(child)) {
        lastChild = child;
        return true;
      }
    });

  if (!lastChild) {
    setLayoutTokens(target, [...nextLayoutTokens, 'vertical-writing:initialized']);
    return;
  }

  const computedStyle = getElementStyle(target);
  const threshold = String(computedStyle.getPropertyValue('--unitone--threshold')).trim();
  let forceSwitch = false;

  if (threshold && !/^[+-]?(?:0+\.?0*|\.0+)(?:[a-z]+|%)?$/i.test(threshold)) {
    const thresholder = target.ownerDocument.createElement('div');
    thresholder.setAttribute(layoutAttributeName, 'vertical-writing__thresholder');
    target.appendChild(thresholder);
    forceSwitch = thresholder.offsetWidth >= target.offsetWidth;
    thresholder.remove();
  }

  if (forceSwitch) {
    nextLayoutTokens.push('-force-switch');
  } else {
    const maybeSafari =
      target.getBoundingClientRect().left > lastChild.getBoundingClientRect().left;
    if (maybeSafari) {
      nextLayoutTokens.push('vertical-writing:safari');
    }
  }

  setLayoutTokens(target, [...nextLayoutTokens, 'vertical-writing:initialized']);

  const schedule = scope
    ? (callback) => scope.requestAnimationFrame(callback)
    : (callback) => target.ownerDocument.defaultView.requestAnimationFrame(callback);
  schedule(() => {
    if (!target?.isConnected) {
      return;
    }

    if (target.parentNode?.style) {
      if (forceSwitch) {
        target.parentNode.style.height = '';
        return;
      }

      const targetRect = target.getBoundingClientRect();
      const lastChildRect = lastChild.getBoundingClientRect();

      const targetY = targetRect.top + targetRect.height;
      const lastChildY = lastChildRect.top + lastChildRect.height;
      target.parentNode.style.height =
        targetY !== lastChildY ? `${Math.ceil(lastChildY - targetRect.top)}px` : '';
    }
  });
};

/**
 * Recalculates vertical-writing columns without creating persistent observers.
 *
 * @param {Element} target Target element.
 * @returns {void}
 */
export const setColumnCountForVertical = (target) => updateColumnCountForVertical(target);

/**
 * Creates the observer bundle for vertical-writing layouts.
 *
 * @param {Element} target Target element.
 * @returns {() => void} Stops observation and cancels queued work.
 */
export const verticalsResizeObserver = (target) => {
  const applyVerticalColumns = (element, scope) => {
    if (element.parentNode?.style) {
      element.parentNode.style.height = '';
    }

    updateColumnCountForVertical(element, scope);
  };

  return createLayoutObserver(target, applyVerticalColumns, {
    getResizeValue: getContentRectWidth,
    targetMutation: {
      options: {
        attributes: true,
        attributeFilter: ['style'],
        childList: true,
        subtree: true,
      },
      shouldApply: shouldApplyVerticalWritingMutation,
    },
  });
};

const marqueeClones = new WeakSet();
const marqueeStates = new WeakMap();

const getMarquees = (target) =>
  Array.from(target.querySelectorAll(':scope > [data-unitone-layout~="marquee"]'));

const getMarqueeAnimation = (element) =>
  element
    ?.getAnimations()
    .find(({ animationName }) => ['marquee', 'marquee-reverse'].includes(animationName));

/**
 * Measures layout width without including transforms or rounding fractional pixels.
 *
 * @param {CSSStyleDeclaration} style Computed style.
 * @param {boolean} borderBox Whether to include padding and borders.
 * @returns {number} Width in CSS pixels.
 */
const getMarqueeWidth = (style, borderBox) => {
  const edges = ['paddingLeft', 'paddingRight', 'borderLeftWidth', 'borderRightWidth'].reduce(
    (total, property) => total + (parseFloat(style[property]) || 0),
    0,
  );
  const width = parseFloat(style.width) || 0;
  return width + (borderBox ? edges : 0) - ('border-box' === style.boxSizing ? edges : 0);
};

/**
 * Synchronizes existing animations without measuring or rebuilding copies.
 *
 * @param {Element[]} marquees Original and copied marquees.
 * @param {ReturnType<typeof createObserverScope>} [scope] Observer lifetime.
 * @returns {void}
 */
const syncMarqueeAnimations = ([original, ...copies], scope) => {
  const animation = getMarqueeAnimation(original);
  if (animation) {
    const syncAnimations = () => {
      if (scope?.disposed || !original.isConnected || getMarqueeAnimation(original) !== animation) {
        return;
      }
      copies.forEach((element) => {
        const copyAnimation = getMarqueeAnimation(element);
        if (!element.isConnected || !copyAnimation) {
          return;
        }

        const syncTime = () => {
          if (
            !scope?.disposed &&
            element.isConnected &&
            getMarqueeAnimation(original) === animation
          ) {
            copyAnimation.currentTime = animation.currentTime;
          }
        };
        syncTime();
        // A pending play or pause task can otherwise apply an outdated hold time.
        if (copyAnimation.pending) {
          copyAnimation.ready.then(syncTime, () => {});
        }
      });
    };
    syncAnimations();
    if (animation.pending) {
      animation.ready.then(syncAnimations, () => {});
    }
  }
};

/**
 * Updates generated copies and synchronizes them with the original animation.
 *
 * @param {Element} target Marquee wrapper.
 * @param {boolean} [refreshClones] Whether source content has changed; omitted for manual detection.
 * @param {ReturnType<typeof createObserverScope>} [scope] Observer lifetime.
 * @returns {{ originals: Element[], firstClone?: Element }} Sources and the first new copy.
 */
const updateMarquee = (target, refreshClones, scope) => {
  const originals = [];
  const clones = [];
  for (const child of target.children) {
    if (marqueeClones.has(child)) {
      clones.push(child);
    } else if (child.matches('[data-unitone-layout~="marquee"]')) {
      originals.push(child);
    }
  }
  const original = originals[0];
  const state = marqueeStates.get(target);
  // Observer calls know whether content changed; manual calls compare the saved markup.
  // Form control state can change without changing its HTML attributes.
  refreshClones ??=
    state?.source !== original?.outerHTML || !!original?.querySelector('input, textarea, select');
  refreshClones ||= state?.original !== original;

  if (refreshClones || 1 !== originals.length) {
    clones.forEach((clone) => clone.remove());
    clones.length = 0;
  }

  if (!original || !hasLayoutBox(target)) {
    marqueeStates.delete(target);
    return { originals };
  }

  const wrapperStyle = getElementStyle(target);
  const originalStyle = getElementStyle(original);
  const wrapperWidth = getMarqueeWidth(wrapperStyle, false);
  const width = getMarqueeWidth(originalStyle, true);
  const columnGap = wrapperStyle.columnGap;
  const gap = (parseFloat(columnGap) || 0) * (columnGap.endsWith('%') ? wrapperWidth / 100 : 1);
  const gapValue = `${gap}px`;
  if (target.style.getPropertyValue('--unitone--marquee-gap') !== gapValue) {
    target.style.setProperty('--unitone--marquee-gap', gapValue);
  }

  // Keep author-provided sibling content intact instead of treating it as a generated copy.
  const canClone = 1 === originals.length && target.childElementCount - clones.length === 1;
  const count =
    canClone && 0 < wrapperWidth && 0 < width ? Math.ceil((wrapperWidth + gap) / (width + gap)) : 0;

  clones.splice(count).forEach((clone) => clone.remove());

  const lastMarquee = clones.at(-1) ?? original;
  let firstClone;
  const fragment = target.ownerDocument.createDocumentFragment();
  while (clones.length < count) {
    const clone = original.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    clone.setAttribute('inert', '');
    marqueeClones.add(clone);
    clones.push(clone);
    fragment.append(clone);
    firstClone ??= clone;
  }
  if (firstClone) {
    lastMarquee.after(fragment);
  }

  [...originals, ...clones].forEach((element) => {
    const tokens = getLayoutTokens(element);
    if (!tokens.includes('marquee:initialized')) {
      setLayoutTokens(element, [...tokens, 'marquee:initialized']);
    }
  });

  marqueeStates.set(target, {
    original,
    wrapperWidth,
    width,
    vertical: !originalStyle.writingMode.startsWith('horizontal'),
    source: refreshClones || !state ? original.outerHTML : state.source,
  });
  syncMarqueeAnimations([...originals, ...clones], scope);

  return { originals, firstClone };
};

/**
 * Refreshes marquee copies while retaining the original animation's progress.
 *
 * @param {Element} target Target element.
 * @returns {Element | undefined} The first newly created copy, if any.
 */
export const setMarquee = (target) => updateMarquee(target).firstClone;

/**
 * Observes marquee size and content changes without delaying resize updates.
 *
 * @param {Element} target Target element.
 * @returns {() => void} Stops observation and cancels queued work.
 */
export const marqueeResizeObserver = (target) => {
  const scope = createObserverScope(target);
  let isIntersecting = 'undefined' === typeof IntersectionObserver || isNearViewport(target);
  let refreshClones = true;
  const observedOriginals = new Set();
  scope.addCleanup(() => {
    observedOriginals.clear();
    marqueeStates.delete(target);
  });

  const observeMutations = () => {
    mutationObserver.observe(target, { attributes: true, childList: true });
    observedOriginals.forEach((element) => {
      mutationObserver.observe(element, {
        attributes: true,
        childList: true,
        characterData: true,
        subtree: true,
      });
    });
  };

  const changesSource = (entry) =>
    entry.target !== target ||
    ('childList' === entry.type &&
      [...entry.addedNodes, ...entry.removedNodes].some((node) => !marqueeClones.has(node)));

  const apply = () => {
    if (scope.disposed || !target.isConnected || !isIntersecting) {
      return;
    }

    // Preserve pending author edits, then exclude our own DOM writes from observation.
    refreshClones ||= mutationObserver.takeRecords().some(changesSource);
    mutationObserver.disconnect();
    const { originals } = updateMarquee(target, refreshClones, scope);
    refreshClones = false;

    observedOriginals.forEach((element) => {
      if (!originals.includes(element)) {
        resizeObserver.unobserve(element);
        observedOriginals.delete(element);
      }
    });
    originals.forEach((element) => {
      if (!observedOriginals.has(element)) {
        resizeObserver.observe(element, { box: 'border-box' });
        observedOriginals.add(element);
      }
    });
    observeMutations();
  };

  const scheduleApply = createScheduledTargetCallback(target, apply, scope);
  const mutationObserver = new MutationObserver((entries) => {
    if (!entries.some((entry) => 'childList' !== entry.type || changesSource(entry))) {
      return;
    }
    refreshClones ||= entries.some(changesSource);
    scheduleApply();
  });
  const resizeObserver = new ResizeObserver((entries) => {
    // Measurements already applied by a mutation callback need no second update.
    const state = marqueeStates.get(target);
    if (
      !state ||
      entries.some((entry) => {
        if (entry.target === target) {
          return Math.abs(entry.contentRect.width - state.wrapperWidth) > 0.01;
        }
        const box = entry.borderBoxSize?.[0];
        const width = state.vertical ? box?.blockSize : box?.inlineSize;
        return (
          entry.target !== state.original ||
          undefined === width ||
          Math.abs(width - state.width) > 0.01
        );
      })
    ) {
      apply();
    }
  });
  scope.addCleanup(() => mutationObserver.disconnect());
  scope.addCleanup(() => resizeObserver.disconnect());
  resizeObserver.observe(target);
  observeMutations();

  if ('undefined' !== typeof IntersectionObserver) {
    createIntersectionObserver(
      target,
      (entry) => {
        const wasIntersecting = isIntersecting;
        isIntersecting = entry.isIntersecting;
        if (isIntersecting && !wasIntersecting) {
          apply();
        }
      },
      scope,
    );
  }

  // Re-sync copies created while CSS has paused the original animation.
  const scheduleSync = createScheduledTargetCallback(
    target,
    () => syncMarqueeAnimations(getMarquees(target), scope),
    scope,
  );
  const onPauseChange = () => {
    if (getLayoutTokens(target).includes('-pause-on-hover')) {
      scheduleSync();
    }
  };
  ['pointerenter', 'pointerleave', 'focusin', 'focusout'].forEach((eventName) => {
    target.addEventListener(eventName, onPauseChange);
    scope.addCleanup(() => target.removeEventListener(eventName, onPauseChange));
  });

  // Viewport media queries can change only the gap, without resizing either marquee box.
  const defaultView = target.ownerDocument.defaultView;
  defaultView.addEventListener('resize', scheduleApply);
  scope.addCleanup(() => defaultView.removeEventListener('resize', scheduleApply));
  apply();

  return scope.dispose;
};
