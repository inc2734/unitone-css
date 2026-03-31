const layoutAttributeName = 'data-unitone-layout';

const getLayoutTokens = (element) =>
  (element.getAttribute(layoutAttributeName) ?? '').split(/\s+/).filter(Boolean);

const withoutLayoutTokens = (tokens, removedTokens) =>
  tokens.filter((value) => !removedTokens.includes(value));

const setLayoutTokens = (element, tokens) => {
  const nextValue = tokens.filter(Boolean).join(' ');
  if ((element.getAttribute(layoutAttributeName) ?? '') !== nextValue) {
    element.setAttribute(layoutAttributeName, nextValue);
  }
};

const createResizeObserver = (target, callback, { getValue, delay = 250 } = {}) => {
  callback(target);

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

const getBorderBoxInlineSize = (entry) => entry.borderBoxSize?.[0].inlineSize;

const getContentRectWidth = (entry) => parseInt(entry.contentRect?.width);

const hasLayoutBox = (element) => !!element?.isConnected && 0 < element.getClientRects().length;

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

export const dividersResizeObserver = (target, args = {}) => {
  const mObserverArgs = {
    attributes: true,
    attributeFilter: ['style', 'data-unitone-layout', 'class'],
    attributeOldValue: true,
    subtree: true,
    characterData: true,
  };

  const observer = createResizeObserver(target, setDividerLinewrap, {
    getValue: getBorderBoxInlineSize,
  });

  const mObserver = createMutationObserver(target, mObserverArgs, (entries) => {
    for (const entry of entries) {
      if ('attributes' === entry.type && 'data-unitone-layout' === entry.attributeName) {
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

        if (current !== old) {
          setDividerLinewrap(target);
        }
      } else if ('attributes' === entry.type && 'class' === entry.attributeName) {
        const ignoreClassNames = [...(args?.ignore?.className ?? [])];

        const current = (entry.target.getAttribute(entry.attributeName) ?? '')
          .split(' ')
          .filter((v) => !ignoreClassNames.includes(v))
          .join(' ');

        const old = (entry.oldValue ?? '')
          .split(' ')
          .filter((v) => !ignoreClassNames.includes(v))
          .join(' ');

        if (current !== old) {
          setDividerLinewrap(target);
        }
      } else if ('attributes' === entry.type && 'style' === entry.attributeName) {
        setDividerLinewrap(target);
      }
    }
  });

  return {
    resizeObserver: observer,
    mutationObserver: mObserver,
  };
};

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

export const stairsResizeObserver = (target) => {
  return createResizeObserver(target, setStairsStep);
};

export const setColumnCountForVertical = (target) => {
  if (!target) {
    return;
  }

  let currentLayoutArray = (target.getAttribute('data-unitone-layout') ?? '').split(/\s+/);
  if (
    currentLayoutArray.some((value) =>
      ['vertical-writing:initialized', 'vertical-writing:safari', '-force-switch'].includes(value),
    )
  ) {
    currentLayoutArray = currentLayoutArray.filter(
      (value) =>
        !['vertical-writing:initialized', 'vertical-writing:safari', '-force-switch'].includes(
          value,
        ),
    );
    target.setAttribute('data-unitone-layout', currentLayoutArray.join(' '));
  }

  let lastChild;
  [].slice
    .call(target.children)
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
    currentLayoutArray.push('vertical-writing:initialized');
    target.setAttribute('data-unitone-layout', currentLayoutArray.join(' '));
    return;
  }

  // Process of the threshold
  const computedStyle = getComputedStyle(target);
  const threshold = String(computedStyle.getPropertyValue('--unitone--threshold')).trim();
  let forceSwitch = false;

  setTimeout(() => {
    if (!target?.isConnected) {
      return;
    }

    if (!!threshold) {
      const thresholder = document.createElement('div');
      thresholder.setAttribute('data-unitone-layout', 'vertical-writing__thresholder');
      target.appendChild(thresholder);
      forceSwitch = thresholder.offsetWidth >= target.offsetWidth;
      if (thresholder.parentNode) {
        thresholder.parentNode.removeChild(thresholder);
      }
    }

    if (forceSwitch) {
      currentLayoutArray.push('-force-switch');
      if (target.parentNode?.style) {
        target.parentNode.style.height = '';
      }
    } else {
      // For Safari
      const maybeSafari =
        target.getBoundingClientRect().left > lastChild.getBoundingClientRect().left;
      if (maybeSafari) {
        currentLayoutArray.push('vertical-writing:safari');
      }

      target.setAttribute('data-unitone-layout', currentLayoutArray.join(' '));

      requestAnimationFrame(() => {
        if (!target?.isConnected) {
          return;
        }

        const targetRect = target.getBoundingClientRect();
        const lastChildRect = lastChild.getBoundingClientRect();

        const targetY = targetRect.top + targetRect.height;
        const lastChildY = lastChildRect.top + lastChildRect.height;
        if (targetY !== lastChildY) {
          if (target.parentNode?.style) {
            target.parentNode.style.height = `${Math.ceil(lastChildY - targetRect.top)}px`;
          }
        }
      });
    }

    currentLayoutArray.push('vertical-writing:initialized');
    target.setAttribute('data-unitone-layout', currentLayoutArray.join(' '));
  }, 250);
};

export const verticalsResizeObserver = (target) => {
  let prevWidth = 0;

  const observer = new ResizeObserver(
    debounce((entries) => {
      for (const entry of entries) {
        const width = entry.contentRect?.width;
        if (parseInt(width) !== parseInt(prevWidth)) {
          prevWidth = width;
          entry.target.parentNode.style.height = '';
          setColumnCountForVertical(entry.target);
        }
      }
    }, 250),
  );

  observer.observe(target);

  const mObserverArgs = {
    attributes: true,
    attributeFilter: ['style'],
    childList: true,
    subtree: true,
  };

  const mObserver = new MutationObserver((entries) => {
    requestAnimationFrame(() => {
      if (0 < entries.length) {
        const entry = entries[0];
        const addedNode = entry.addedNodes?.[0];
        const removedNode = entry.removedNodes?.[0];
        if (
          (addedNode?.nodeType === Node.ELEMENT_NODE &&
            'vertical-writing__thresholder' === addedNode.getAttribute('data-unitone-layout')) ||
          (removedNode?.nodeType === Node.ELEMENT_NODE &&
            'vertical-writing__thresholder' === removedNode.getAttribute('data-unitone-layout')) ||
          (addedNode?.nodeType === Node.ELEMENT_NODE &&
            'vertical-writing:initialized' === addedNode.getAttribute('data-unitone-layout')) ||
          (removedNode?.nodeType === Node.ELEMENT_NODE &&
            'vertical-writing:initialized' === removedNode.getAttribute('data-unitone-layout')) ||
          (addedNode?.nodeType === Node.ELEMENT_NODE &&
            'vertical-writing:safari' === addedNode.getAttribute('data-unitone-layout')) ||
          (removedNode?.nodeType === Node.ELEMENT_NODE &&
            'vertical-writing:safari' === removedNode.getAttribute('data-unitone-layout'))
        ) {
          return;
        }

        setColumnCountForVertical(target);
      }
    });
  });

  mObserver.observe(target, mObserverArgs);

  return {
    resizeObserver: observer,
    mutationObserver: mObserver,
  };
};

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

export const result1emPxForFireFoxObserver = (target) => {
  const ownerDocument = target.ownerDocument;
  const defaultView = ownerDocument.defaultView;
  const computedStyle = defaultView.getComputedStyle(ownerDocument.documentElement);
  const isFirefox = computedStyle.getPropertyValue('--unitone--is-firefox').trim();
  if (!isFirefox) {
    return;
  }

  const mObserverArgs = {
    attributes: true,
    attributeFilter: ['style', 'data-unitone-layout', 'class'],
    characterData: true,
  };

  const observer = createResizeObserver(target, setResult1emPxForFireFox, {
    getValue: getBorderBoxInlineSize,
  });

  const mObserver = createMutationObserver(target, mObserverArgs, () => {
    setResult1emPxForFireFox(target);
  });

  return {
    resizeObserver: observer,
    mutationObserver: mObserver,
  };
};

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

  if (1 === target.childElementCount && 1 === marquees.length) {
    const marquee = marquees[0];
    clonedMarquee = marquee.cloneNode(true);
    clonedMarquee.setAttribute('aria-hidden', 'true');
    marquee.after(clonedMarquee);
  }

  marquees = getMarquees();
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

export const marqueeResizeObserver = (target) => {
  let clonedMarquee;

  const applyMarquee = (element) => {
    clonedMarquee = setMarquee(element);
  };

  const observer = createResizeObserver(target, applyMarquee, {
    getValue: getContentRectWidth,
  });

  const mObserverArgs = {
    childList: true,
  };

  const mObserver = createMutationObserver(target, mObserverArgs, (entries) => {
    if (!target?.isConnected) {
      return;
    }

    const addedNodes = entries.flatMap((entry) => Array.from(entry.addedNodes ?? []));
    const removedNodes = entries.flatMap((entry) => Array.from(entry.removedNodes ?? []));

    if (
      clonedMarquee?.isConnected &&
      1 === addedNodes.length &&
      0 === removedNodes.length &&
      addedNodes[0] === clonedMarquee
    ) {
      clonedMarquee = null;
      return;
    }

    clonedMarquee = null;
    applyMarquee(target);
  });

  return {
    resizeObserver: observer,
    mutationObserver: mObserver,
  };
};
