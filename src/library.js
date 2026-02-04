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
  const firstChild = [].slice.call(target?.children ?? [])?.[0];
  if (!firstChild) {
    return;
  }

  let prevChild;
  const baseRect = firstChild.getBoundingClientRect();

  let currentLayoutArray = (target.getAttribute('data-unitone-layout') ?? '').split(/\s+/);
  if (currentLayoutArray.some((value) => ['divider:initialized', '-stack'].includes(value))) {
    currentLayoutArray = currentLayoutArray.filter(
      (value) => !['divider:initialized', '-stack'].includes(value),
    );
    target.setAttribute('data-unitone-layout', currentLayoutArray.join(' '));
  }

  const targetChildren = [].slice.call(target.children).filter((child) => {
    const position = window.getComputedStyle(child).getPropertyValue('position');
    const display = window.getComputedStyle(child).getPropertyValue('display');
    return 'absolute' !== position && 'fixed' !== position && 'none' !== display;
  });

  targetChildren.forEach((child, index) => {
    let childCurrentLayoutArray = (child.getAttribute('data-unitone-layout') ?? '').split(/\s+/);
    if (childCurrentLayoutArray.some((value) => ['-bol', '-linewrap'].includes(value))) {
      childCurrentLayoutArray = childCurrentLayoutArray.filter(
        (value) => !['-bol', '-linewrap'].includes(value),
      );
      child.setAttribute('data-unitone-layout', childCurrentLayoutArray.join(' '));
    }

    const prevRect = prevChild?.getBoundingClientRect();
    const childRect = child.getBoundingClientRect();

    let shouldUpdate = false;

    if (0 === index || (prevRect?.top < childRect.top && prevRect?.left >= childRect.left)) {
      childCurrentLayoutArray.push('-bol');
      shouldUpdate = true;
    }

    if (0 < index && baseRect.top < childRect.top) {
      childCurrentLayoutArray.push('-linewrap');
      shouldUpdate = true;
    }

    if (shouldUpdate) {
      child.setAttribute('data-unitone-layout', childCurrentLayoutArray.join(' '));
    }

    prevChild = child;
  });

  const isStack = [].slice
    .call(targetChildren)
    .every((child) => child.getBoundingClientRect().left === baseRect.left);
  if (isStack) {
    currentLayoutArray.push('-stack');
  }

  currentLayoutArray.push('divider:initialized');
  target.setAttribute('data-unitone-layout', currentLayoutArray.join(' '));
};

export const dividersResizeObserver = (target, args = {}) => {
  let prevWidth = 0;

  const observer = new ResizeObserver(
    debounce((entries) => {
      for (const entry of entries) {
        const width = entry.borderBoxSize?.[0].inlineSize;
        if (width !== prevWidth) {
          setDividerLinewrap(entry.target);
          prevWidth = width;
        }
      }
    }, 250),
  );

  const mObserverArgs = {
    attributes: true,
    attributeFilter: ['style', 'data-unitone-layout', 'class'],
    attributeOldValue: true,
    subtree: true,
    characterData: true,
  };

  const mObserver = new MutationObserver((entries) => {
    requestAnimationFrame(() => {
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
  });

  observer.observe(target);
  mObserver.observe(target, mObserverArgs);

  return {
    resizeObserver: observer,
    mutationObserver: mObserver,
  };
};

export const setStairsStep = (target) => {
  const children = [].slice.call(target.children);
  const firstChild = children?.[0];
  if (!firstChild) {
    return;
  }

  // Reset
  target.style.removeProperty('--unitone--stairs-step-overflow-volume');
  target.style.removeProperty('--unitone--max-stairs-step');
  [].slice.call(target?.children ?? []).forEach((child) => {
    child.style.removeProperty('--unitone--stairs-step');
  });

  const filteredChildren = [];

  let prevChild;
  let stairsStep = 0;
  let maxStairsStep = stairsStep;

  const stairsUp = (target.getAttribute('data-unitone-layout') ?? '')
    .split(/\s+/)
    .find((value) => value.startsWith('-stairs-up:'))
    ?.replace('-stairs-up:', '');

  const isAlternatingStairs = ['up-down', 'down-up'].includes(stairsUp);

  const direction = window.getComputedStyle(target).getPropertyValue('flex-direction');

  children.forEach((child) => {
    const position = window.getComputedStyle(child).getPropertyValue('position');
    const display = window.getComputedStyle(child).getPropertyValue('display');
    if ('absolute' === position || 'fixed' === position || 'none' === display) {
      return;
    }

    filteredChildren.push(child);

    const isBol =
      'row-reverse' === direction
        ? prevChild?.getBoundingClientRect()?.left <= child.getBoundingClientRect().left
        : prevChild?.getBoundingClientRect()?.left >= child.getBoundingClientRect().left;

    if (firstChild === child || isBol) {
      stairsStep = 0;
    } else if (isAlternatingStairs) {
      stairsStep = 0 === stairsStep ? 1 : 0;
    } else {
      stairsStep++;
    }

    child.style.setProperty('--unitone--stairs-step', stairsStep);

    prevChild = child;

    if (stairsStep > maxStairsStep) {
      maxStairsStep = stairsStep;
    }
  });

  target.style.setProperty('--unitone--max-stairs-step', maxStairsStep);

  const targetBottom = target.getBoundingClientRect().bottom;
  const overflowVolume = filteredChildren.reduce((accumulator, current) => {
    const childBottom = current.getBoundingClientRect().bottom;
    const overflow = childBottom - targetBottom;
    return accumulator > overflow ? accumulator : overflow;
  }, 0);

  target.style.setProperty('--unitone--stairs-step-overflow-volume', overflowVolume);
};

export const stairsResizeObserver = (target) => {
  const observer = new ResizeObserver(
    debounce((entries) => {
      for (const entry of entries) {
        setStairsStep(entry.target);
      }
    }, 250),
  );

  observer.observe(target);

  return observer;
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

  let prevWidth = 0;

  const observer = new ResizeObserver(
    debounce((entries) => {
      for (const entry of entries) {
        const width = entry.borderBoxSize?.[0].inlineSize;
        if (width !== prevWidth) {
          setResult1emPxForFireFox(entry.target);
          prevWidth = width;
        }
      }
    }, 250),
  );

  const mObserverArgs = {
    attributes: true,
    attributeFilter: ['style', 'data-unitone-layout', 'class'],
    characterData: true,
  };

  const mObserver = new MutationObserver(() => {
    requestAnimationFrame(() => {
      setResult1emPxForFireFox(target);
    });
  });

  observer.observe(target);
  mObserver.observe(target, mObserverArgs);

  return {
    resizeObserver: observer,
    mutationObserver: mObserver,
  };
};

export const setMarquee = (target) => {
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
    const clonedMarquee = marquee.cloneNode(true);
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
};

export const marqueeResizeObserver = (target) => {
  let prevWidth = 0;

  setMarquee(target);

  const observer = new ResizeObserver(
    debounce((entries) => {
      for (const entry of entries) {
        const width = entry.contentRect?.width;
        if (parseInt(width) !== parseInt(prevWidth)) {
          prevWidth = width;
          setMarquee(entry.target);
        }
      }
    }, 250),
  );

  observer.observe(target);

  const mObserverArgs = {
    childList: true,
  };

  const mObserver = new MutationObserver(() => {
    requestAnimationFrame(() => {
      if (!target?.isConnected) {
        return;
      }
      setMarquee(target);
    });
  });

  mObserver.observe(target, mObserverArgs);

  return {
    resizeObserver: observer,
    mutationObserver: mObserver,
  };
};
