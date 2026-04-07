const layoutAttributeName = 'data-unitone-layout';
const layoutIntersectionMargin = 200;
const layoutIntersectionRootMargin = `${layoutIntersectionMargin}px 0px`;

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
 * @param {(target: Element, entry?: ResizeObserverEntry) => void} callback Callback to run.
 * @param {{ getValue?: (entry: ResizeObserverEntry) => unknown, delay?: number }} [options]
 * @returns {ResizeObserver} ResizeObserver instance.
 */
const createResizeObserver = (target, callback, { getValue, delay = 250 } = {}) => {
  let prevValue;
  let isFirstEntry = true;

  const observer = new ResizeObserver(
    debounce((entries) => {
      for (const entry of entries) {
        const currentValue = getValue?.(entry);
        if (isFirstEntry) {
          prevValue = currentValue;
          isFirstEntry = false;
          continue;
        }

        if (undefined === currentValue || currentValue !== prevValue) {
          callback(entry.target, entry);
          prevValue = currentValue;
        }
      }
    }, delay),
  );

  observer.observe(target);

  return observer;
};

/**
 * Creates a MutationObserver for the target node.
 *
 * @param {Node} target Target node.
 * @param {MutationObserverInit} options Observer options.
 * @param {(entries: MutationRecord[]) => void} callback Callback to run.
 * @returns {MutationObserver} MutationObserver instance.
 */
const createMutationObserver = (target, options, callback) => {
  const observer = new MutationObserver((entries) => {
    requestAnimationFrame(() => {
      if (!target?.isConnected) {
        return;
      }

      callback(entries);
    });
  });

  observer.observe(target, options);

  return observer;
};

/**
 * Creates an IntersectionObserver for the target element.
 *
 * @param {Element} target Target element.
 * @param {(entry: IntersectionObserverEntry) => void} callback Callback to run.
 * @returns {IntersectionObserver} IntersectionObserver instance.
 */
const createIntersectionObserver = (target, callback) => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry) {
        callback(entry);
      }
    },
    { rootMargin: layoutIntersectionRootMargin },
  );

  observer.observe(target);

  return observer;
};

/**
 * Returns a scheduler that coalesces re-application work into a single frame.
 *
 * @param {Element} target Target element.
 * @param {(target: Element) => void} callback Callback to run.
 * @returns {() => void} Schedule function.
 */
const createScheduledTargetCallback = (target, callback) => {
  let rafId = 0;
  let defaultView;

  return () => {
    defaultView = target?.ownerDocument?.defaultView;
    if (!defaultView?.requestAnimationFrame) {
      callback(target);
      return;
    }

    if (rafId) {
      return;
    }

    rafId = defaultView.requestAnimationFrame(() => {
      rafId = 0;
      defaultView = null;

      if (target?.isConnected) {
        callback(target);
      }
    });
  };
};

/**
 * Observes resizes on the target and its direct children.
 *
 * @param {Element} target Target element.
 * @param {(target: Element) => void} callback Callback to run.
 * @param {{ getValue?: (entry: ResizeObserverEntry) => unknown, delay?: number, onChildList?: (entries: MutationRecord[]) => void }} [options]
 * @returns {{ resizeObserver: ResizeObserver, mutationObserver: MutationObserver }}
 */
const createDirectChildrenResizeObserver = (
  target,
  callback,
  { getValue, delay = 250, onChildList } = {},
) => {
  const prevValues = new WeakMap();
  const observedChildren = new Set();

  const observer = new ResizeObserver(
    debounce((entries) => {
      let shouldApply = false;

      for (const entry of entries) {
        const currentValue = getValue?.(entry);
        if (!prevValues.has(entry.target)) {
          prevValues.set(entry.target, currentValue);
          continue;
        }

        if (undefined === currentValue || currentValue !== prevValues.get(entry.target)) {
          shouldApply = true;
        }

        prevValues.set(entry.target, currentValue);
      }

      if (shouldApply) {
        callback(target);
      }
    }, delay),
  );

  const syncObservedChildren = () => {
    Array.from(observedChildren).forEach((child) => {
      if (child.parentElement !== target) {
        observer.unobserve(child);
        observedChildren.delete(child);
        prevValues.delete(child);
      }
    });

    Array.from(target?.children ?? []).forEach((child) => {
      if (observedChildren.has(child)) {
        return;
      }

      observer.observe(child);
      observedChildren.add(child);
    });
  };

  observer.observe(target);
  syncObservedChildren();

  const mutationObserver = createMutationObserver(target, { childList: true }, (entries) => {
    if (!entries.some((entry) => 'childList' === entry.type)) {
      return;
    }

    syncObservedChildren();
    onChildList?.(entries);
    callback(target);
  });

  return {
    resizeObserver: observer,
    mutationObserver,
  };
};

/**
 * Observes attribute changes on direct children.
 *
 * @param {Element} target Target element.
 * @param {(target: Element) => void} callback Callback to run.
 * @param {{ attributeFilter: string[], shouldApply: (entry: MutationRecord) => boolean, attributeOldValue?: boolean }} options
 * @returns {{ observer: MutationObserver, syncObservedChildren: () => void }}
 */
const createDirectChildrenAttributeObserver = (
  target,
  callback,
  { attributeFilter, shouldApply, attributeOldValue = true } = {},
) => {
  const observer = new MutationObserver((entries) => {
    requestAnimationFrame(() => {
      if (!target?.isConnected) {
        return;
      }

      if (
        entries.some(
          (entry) =>
            'attributes' === entry.type &&
            entry.target.parentElement === target &&
            shouldApply(entry),
        )
      ) {
        callback(target);
      }
    });
  });

  const syncObservedChildren = () => {
    observer.disconnect();
    Array.from(target?.children ?? []).forEach((child) => {
      observer.observe(child, {
        attributes: true,
        attributeFilter,
        attributeOldValue,
      });
    });
  };

  syncObservedChildren();

  return {
    observer,
    syncObservedChildren,
  };
};

/**
 * Creates a bundled observer setup for layout re-application.
 *
 * @param {Element} target Target element.
 * @param {(target: Element) => void} apply Apply function.
 * @param {{
 *   getResizeValue?: (entry: ResizeObserverEntry) => unknown,
 *   delay?: number,
 *   observeResize?: boolean,
 *   observeIntersection?: boolean,
 *   observeDirectChildrenResize?: boolean,
 *   targetMutation?: { options: MutationObserverInit, shouldApply?: (entries: MutationRecord[]) => boolean },
 *   directChildMutation?: { attributeFilter: string[], shouldApply: (entry: MutationRecord) => boolean, attributeOldValue?: boolean }
 * }} [options]
 * @returns {void}
 */
const createLayoutObserver = (
  target,
  apply,
  {
    getResizeValue,
    delay = 250,
    observeResize = true,
    observeIntersection = false,
    observeDirectChildrenResize = false,
    targetMutation,
    directChildMutation,
  } = {},
) => {
  const shouldObserveIntersection =
    observeIntersection && 'undefined' !== typeof IntersectionObserver;
  let isIntersecting = !shouldObserveIntersection || isNearViewport(target);
  let needsApply = shouldObserveIntersection && !isIntersecting;

  const runApply = (element = target) => {
    if (!element?.isConnected) {
      return;
    }

    if (shouldObserveIntersection && !isIntersecting) {
      needsApply = true;
      return;
    }

    needsApply = false;
    apply(element);
  };

  const schedule = createScheduledTargetCallback(target, runApply);
  const scheduleApply = () => {
    if (!target?.isConnected) {
      return;
    }

    if (shouldObserveIntersection && !isIntersecting) {
      needsApply = true;
      return;
    }

    needsApply = true;
    schedule();
  };

  let syncDirectChildAttributes = () => {};

  const resizeBundle = !observeResize
    ? {
        resizeObserver: null,
        mutationObserver: null,
      }
    : observeDirectChildrenResize
      ? createDirectChildrenResizeObserver(target, scheduleApply, {
          getValue: getResizeValue,
          delay,
          onChildList: () => {
            syncDirectChildAttributes();
          },
        })
      : {
          resizeObserver: createResizeObserver(target, scheduleApply, {
            getValue: getResizeValue,
            delay,
          }),
        };

  if (shouldObserveIntersection) {
    createIntersectionObserver(target, (entry) => {
      isIntersecting = entry.isIntersecting;
      if (isIntersecting && needsApply) {
        scheduleApply();
      }
    });
  }

  if (targetMutation?.options) {
    createMutationObserver(target, targetMutation.options, (entries) => {
      if (targetMutation.shouldApply?.(entries) ?? 0 < entries.length) {
        scheduleApply();
      }
    });
  }

  const directChildAttributeBundle =
    directChildMutation?.attributeFilter && directChildMutation.shouldApply
      ? createDirectChildrenAttributeObserver(target, scheduleApply, {
          attributeFilter: directChildMutation.attributeFilter,
          shouldApply: directChildMutation.shouldApply,
          attributeOldValue: directChildMutation.attributeOldValue,
        })
      : null;

  if (directChildAttributeBundle) {
    syncDirectChildAttributes = directChildAttributeBundle.syncObservedChildren;
  }

  if (!resizeBundle.mutationObserver && directChildAttributeBundle) {
    createMutationObserver(target, { childList: true }, (entries) => {
      if (!entries.some((entry) => 'childList' === entry.type)) {
        return;
      }

      syncDirectChildAttributes();
      scheduleApply();
    });
  }

  if (!shouldObserveIntersection || isIntersecting) {
    runApply(target);
  }
};

const getBorderBoxInlineSize = (entry) => entry.borderBoxSize?.[0].inlineSize;

const getContentRectWidth = (entry) => parseInt(entry.contentRect?.width);

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
 * Returns whether the mutation list contains a matching attributes record.
 *
 * @param {MutationRecord[]} entries Mutation records.
 * @param {(entry: MutationRecord) => boolean} predicate Match predicate.
 * @returns {boolean} Whether a matching attributes mutation exists.
 */
const hasAttributeMutation = (entries, predicate) =>
  entries.some((entry) => 'attributes' === entry.type && predicate(entry));

/**
 * Coalesces repeated calls into the final call within the delay window.
 *
 * @param {Function} fn Function to wrap.
 * @param {number} delay Delay in milliseconds.
 * @returns {Function} Debounced function.
 */
export function debounce(fn, delay) {
  let timer;

  return function (...args) {
    const context = this;
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  };
}

/**
 * Recalculates line wrapping state for divider layouts.
 *
 * @param {Element} target Target element.
 * @returns {void}
 */
export const setDividerLinewrap = (target) => {
  const children = Array.from(target?.children ?? []);
  const firstChild = children[0];
  if (!firstChild) {
    return;
  }

  const currentLayoutArray = withoutLayoutTokens(getLayoutTokens(target), [
    'divider:initialized',
    '-stack',
  ]);
  setLayoutTokens(target, currentLayoutArray);

  const childLayoutMap = new Map();
  children.forEach((child) => {
    const layoutTokens = withoutLayoutTokens(getLayoutTokens(child), ['-bol', '-linewrap']);
    childLayoutMap.set(child, layoutTokens);
    setLayoutTokens(child, layoutTokens);
  });

  if (!hasLayoutBox(target)) {
    return;
  }

  const baseRect = firstChild.getBoundingClientRect();
  const targetChildren = children.reduce((accumulator, child) => {
    const position = window.getComputedStyle(child).getPropertyValue('position');
    const display = window.getComputedStyle(child).getPropertyValue('display');
    if ('absolute' !== position && 'fixed' !== position && 'none' !== display) {
      accumulator.push({
        child,
        layoutTokens: childLayoutMap.get(child) ?? [],
        rect: child.getBoundingClientRect(),
      });
    }
    return accumulator;
  }, []);

  let prevRect;
  const nextChildLayouts = targetChildren.map(({ child, layoutTokens, rect }, index) => {
    const nextLayoutTokens = [...layoutTokens];

    if (0 === index || (prevRect?.top < rect.top && prevRect?.left >= rect.left)) {
      nextLayoutTokens.push('-bol');
    }

    if (0 < index && baseRect.top < rect.top) {
      nextLayoutTokens.push('-linewrap');
    }

    prevRect = rect;
    return { child, layoutTokens: nextLayoutTokens };
  });

  nextChildLayouts.forEach(({ child, layoutTokens }) => {
    setLayoutTokens(child, layoutTokens);
  });

  const isStack = targetChildren.every(({ rect }) => rect.left === baseRect.left);
  const nextTargetLayout = [...currentLayoutArray];
  if (isStack) {
    nextTargetLayout.push('-stack');
  }

  nextTargetLayout.push('divider:initialized');
  setLayoutTokens(target, nextTargetLayout);
};

/**
 * Creates the observer bundle for divider layouts.
 *
 * @param {Element} target Target element.
 * @param {{ ignore?: { layout?: string[], className?: string[] } }} [args]
 * @returns {void}
 */
export const dividersResizeObserver = (target, args = {}) => {
  const shouldRecalculateByAttributeMutation = (entry) => {
    if ('data-unitone-layout' === entry.attributeName) {
      const ignoreUnitoneLayouts = [
        ...(args?.ignore?.layout ?? []),
        ...['divider:initialized', '-bol', '-linewrap', '-stack'],
      ];

      const current = (entry.target.getAttribute(entry.attributeName) ?? '')
        .split(' ')
        .filter((v) => !ignoreUnitoneLayouts.includes(v))
        .join(' ');

      const old = (entry.oldValue ?? '')
        .split(' ')
        .filter((v) => !ignoreUnitoneLayouts.includes(v))
        .join(' ');

      return current !== old;
    }

    if ('class' === entry.attributeName) {
      const ignoreClassNames = [...(args?.ignore?.className ?? [])];

      const current = (entry.target.getAttribute(entry.attributeName) ?? '')
        .split(' ')
        .filter((v) => !ignoreClassNames.includes(v))
        .join(' ');

      const old = (entry.oldValue ?? '')
        .split(' ')
        .filter((v) => !ignoreClassNames.includes(v))
        .join(' ');

      return current !== old;
    }

    return 'style' === entry.attributeName;
  };

  createLayoutObserver(target, setDividerLinewrap, {
    getResizeValue: getBorderBoxInlineSize,
    observeIntersection: true,
    observeDirectChildrenResize: true,
    targetMutation: {
      options: {
        attributes: true,
        attributeFilter: ['style', 'data-unitone-layout', 'class'],
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
      attributeOldValue: true,
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

  const firstChild = children[0];
  if (!firstChild) {
    setLayoutTokens(target, [...currentLayoutArray, 'stairs:initialized']);
    return;
  }

  // Reset
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

  const direction = window.getComputedStyle(target).getPropertyValue('flex-direction');
  const targetBottom = target.getBoundingClientRect().bottom;
  const filteredChildren = children.reduce((accumulator, child) => {
    const position = window.getComputedStyle(child).getPropertyValue('position');
    const display = window.getComputedStyle(child).getPropertyValue('display');
    if ('absolute' === position || 'fixed' === position || 'none' === display) {
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

    if (0 === index || (firstChild === child && !prevRect) || isBol) {
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
 * @returns {void}
 */
export const stairsResizeObserver = (target) => {
  createLayoutObserver(target, setStairsStep, {
    observeIntersection: true,
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
  [
    'vertical-writing__thresholder',
    'vertical-writing:initialized',
    'vertical-writing:safari',
  ].includes(node.getAttribute('data-unitone-layout'));

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
 * @returns {void}
 */
export const setColumnCountForVertical = (target) => {
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
      if (
        !['absolute', 'fixed'].includes(getComputedStyle(child).position) &&
        'none' !== getComputedStyle(child).display
      ) {
        lastChild = child;
        return true;
      }
    });

  if (!lastChild) {
    setLayoutTokens(target, [...nextLayoutTokens, 'vertical-writing:initialized']);
    return;
  }

  const computedStyle = getComputedStyle(target);
  const threshold = String(computedStyle.getPropertyValue('--unitone--threshold')).trim();
  let forceSwitch = false;

  if (threshold) {
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

  requestAnimationFrame(() => {
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
 * Creates the observer bundle for vertical-writing layouts.
 *
 * @param {Element} target Target element.
 * @returns {void}
 */
export const verticalsResizeObserver = (target) => {
  const applyVerticalColumns = (element) => {
    if (element.parentNode?.style) {
      element.parentNode.style.height = '';
    }

    setColumnCountForVertical(element);
  };

  createLayoutObserver(target, applyVerticalColumns, {
    getResizeValue: getContentRectWidth,
    observeIntersection: true,
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

/**
 * Writes the computed 1em value to a CSS custom property for Firefox.
 *
 * @param {HTMLElement} target Target element.
 * @returns {void}
 */
export const setResult1emPxForFireFox = (target) => {
  const ownerDocument = target.ownerDocument;
  const defaultView = ownerDocument.defaultView;

  const computedStyle = defaultView.getComputedStyle(target);
  const fontSize = parseFloat(computedStyle.fontSize);
  const result1emPx = parseFloat(computedStyle.getPropertyValue('--unitone--result--1em-px'));
  if (fontSize === result1emPx) {
    return;
  }

  target.style.setProperty('--unitone--result--1em-px', fontSize);
};

/**
 * Creates the observer bundle for the Firefox 1em measurement workaround.
 *
 * @param {HTMLElement} target Target element.
 * @returns {void}
 */
export const result1emPxForFireFoxObserver = (target) => {
  const ownerDocument = target.ownerDocument;
  const defaultView = ownerDocument.defaultView;
  const computedStyle = defaultView.getComputedStyle(ownerDocument.documentElement);
  const isFirefox = computedStyle.getPropertyValue('--unitone--is-firefox').trim();
  if (!isFirefox) {
    return;
  }

  createLayoutObserver(target, setResult1emPxForFireFox, {
    getResizeValue: getBorderBoxInlineSize,
    targetMutation: {
      options: {
        attributes: true,
        attributeFilter: ['style', 'data-unitone-layout', 'class'],
        characterData: true,
      },
      shouldApply: () => true,
    },
  });
};

/**
 * Creates duplicated marquee content and refreshes initialization markers.
 *
 * @param {Element} target Target element.
 * @returns {Element | undefined} The duplicated marquee element, if created.
 */
export const setMarquee = (target) => {
  let clonedMarquee;

  const addInitializedToken = (element) => {
    const layout = element.getAttribute('data-unitone-layout') ?? '';
    if (layout.split(/\s+/).includes('marquee:initialized')) {
      return;
    }
    element.setAttribute('data-unitone-layout', `${layout} marquee:initialized`.trim());
  };

  const removeInitializedToken = (element) => {
    const layout = element.getAttribute('data-unitone-layout') ?? '';
    const next = layout
      .split(/\s+/)
      .filter((value) => value && 'marquee:initialized' !== value)
      .join(' ');
    element.setAttribute('data-unitone-layout', next);
  };

  const getMarquees = () => target.querySelectorAll(':scope > [data-unitone-layout~="marquee"]');
  let marquees = getMarquees();
  if (0 === marquees.length) {
    return;
  }

  const shouldRestartAnimation = Array.from(marquees).some((marquee) =>
    (marquee.getAttribute(layoutAttributeName) ?? '').split(/\s+/).includes('marquee:initialized'),
  );

  if (1 === target.childElementCount && 1 === marquees.length) {
    const marquee = marquees[0];
    clonedMarquee = marquee.cloneNode(true);
    clonedMarquee.setAttribute('aria-hidden', 'true');
    marquee.after(clonedMarquee);
  }

  marquees = getMarquees();

  if (!shouldRestartAnimation) {
    marquees.forEach((marquee) => {
      addInitializedToken(marquee);
    });
    return clonedMarquee;
  }

  marquees.forEach((marquee) => {
    removeInitializedToken(marquee);
  });

  requestAnimationFrame(() => {
    if (!target?.isConnected) {
      return;
    }
    getMarquees().forEach((marquee) => {
      addInitializedToken(marquee);
    });
  });

  return clonedMarquee;
};

/**
 * Creates the observer bundle for marquee layouts.
 *
 * @param {Element} target Target element.
 * @returns {void}
 */
export const marqueeResizeObserver = (target) => {
  let clonedMarquee;

  const applyMarquee = (element) => {
    clonedMarquee = setMarquee(element);
  };

  createLayoutObserver(target, applyMarquee, {
    observeResize: false,
    observeIntersection: true,
    targetMutation: {
      options: {
        childList: true,
      },
      shouldApply: (entries) => {
        const addedNodes = entries.flatMap((entry) => Array.from(entry.addedNodes ?? []));
        const removedNodes = entries.flatMap((entry) => Array.from(entry.removedNodes ?? []));

        if (
          clonedMarquee?.isConnected &&
          1 === addedNodes.length &&
          0 === removedNodes.length &&
          addedNodes[0] === clonedMarquee
        ) {
          clonedMarquee = null;
          return false;
        }

        clonedMarquee = null;
        return true;
      },
    },
  });
};
