export function debounce(fn, delay) {
  let timer;

  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
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
      child.style.setProperty('--unitone--stairs-step', stairsStep);
    } else {
      stairsStep++;
      child.style.setProperty('--unitone--stairs-step', stairsStep);
    }

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

  // Process of the threshold
  const computedStyle = getComputedStyle(target);
  const threshold = String(computedStyle.getPropertyValue('--unitone--threshold')).trim();
  if (!!threshold) {
    const thresholder = document.createElement('div');
    thresholder.setAttribute('data-unitone-layout', 'vertical-writing__thresholder');
    target.appendChild(thresholder);
    const forceSwitch = thresholder.offsetWidth >= target.offsetWidth;
    target.removeChild(thresholder);
    if (forceSwitch) {
      currentLayoutArray.push('-force-switch');
      target.setAttribute('data-unitone-layout', currentLayoutArray.join(' '));
    }
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
    return;
  }

  currentLayoutArray.push('vertical-writing:initialized');

  // For Safari
  const maybeSafari = target.getBoundingClientRect().left > lastChild.getBoundingClientRect().left;
  if (maybeSafari) {
    currentLayoutArray.push('vertical-writing:safari');
  }

  target.setAttribute('data-unitone-layout', currentLayoutArray.join(' '));

  requestAnimationFrame(() => {
    const targetY = target.getBoundingClientRect().top + target.getBoundingClientRect().height;
    const lastChildY =
      lastChild.getBoundingClientRect().top + lastChild.getBoundingClientRect().height;
    if (targetY !== lastChildY) {
      target.parentNode.style.height = `${Math.ceil(
        lastChildY - target.getBoundingClientRect().top,
      )}px`;
    }
  });
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
