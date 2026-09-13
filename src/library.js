import { createObserverScope } from './observer-scope';

import {
  getMarqueeParts,
  isReactMarquee,
  markMarqueeCopy,
  measureMarquee,
  observeMarquee,
  requestMarqueeRefresh,
} from './layout-primitives/marquee/layout';

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

const marqueeStates = new WeakMap();

/** Updates copied items while keeping the original nodes and animation intact. */
const updateMarquee = (target) => {
  let parts = getMarqueeParts(target);
  const { marquee, originals } = parts;
  if (!marquee) return;
  const state = marqueeStates.get(target);
  const source = originals.map((item) => item.outerHTML).join('');
  // Snapshots exclude generated nodes, so author additions after copies are detected too.
  if (
    state?.marquee !== marquee ||
    state?.source !== source ||
    originals.some(
      (item) =>
        item.matches('input, textarea, select') || item.querySelector('input, textarea, select'),
    )
  ) {
    parts.copies.forEach((copy) => copy.remove());
    parts.copies = [];
  }

  let firstClone;
  const renderCopies = (groups) => {
    const count = groups * originals.length;
    parts.copies.splice(count).forEach((copy) => copy.remove());
    const fragment = target.ownerDocument.createDocumentFragment();
    while (parts.copies.length < count) {
      const copy = originals[parts.copies.length % originals.length].cloneNode(true);
      markMarqueeCopy(copy);
      parts.copies.push(copy);
      fragment.append(copy);
      firstClone ??= copy;
    }
    if (fragment.childNodes.length) marquee.append(fragment);
  };

  let layout = measureMarquee(target, parts);
  if (layout.groups && !parts.copies.length) {
    renderCopies(1);
    layout = measureMarquee(target, parts);
  }
  renderCopies(layout.groups);
  if (marquee) {
    const travel = `${layout.rtl ? layout.distance : -layout.distance}px`;
    if (marquee.style.getPropertyValue('--unitone--marquee-travel') !== travel) {
      marquee.style.setProperty('--unitone--marquee-travel', travel);
    }
    if (layout.distance > 0) {
      const tokens = getLayoutTokens(marquee);
      if (!tokens.includes('marquee:initialized'))
        setLayoutTokens(marquee, [...tokens, 'marquee:initialized']);
    }
  }
  marqueeStates.set(target, { marquee, source });
  return firstClone?.isConnected ? firstClone : undefined;
};

/**
 * Refreshes copied items without restarting the animation.
 * React-owned marquees receive a refresh request and render copies through React.
 *
 * @param {Element} target Marquee wrapper.
 * @returns {Element | undefined} The first newly created HTML item copy, if any.
 */
export const setMarquee = (target) => {
  if (isReactMarquee(target)) {
    requestMarqueeRefresh(target);
    return;
  }
  return updateMarquee(target);
};

/**
 * Observes marquee and original item sizes and content changes.
 * React components own their observer lifetime and generated children.
 *
 * @param {Element} target Marquee wrapper.
 * @returns {() => void} Stops observation and cancels queued work.
 */
export const marqueeResizeObserver = (target) => {
  if (isReactMarquee(target)) {
    return observeMarquee(target, () => requestMarqueeRefresh(target), { listenForRefresh: false })
      .dispose;
  }
  const controller = observeMarquee(target, () => updateMarquee(target));
  return () => {
    controller.dispose();
    marqueeStates.delete(target);
  };
};
