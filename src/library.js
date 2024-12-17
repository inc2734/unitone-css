const setFluidFontSizeMagnification = (target) => {
  const baseFontSize = parseFloat(
    window.getComputedStyle(document.documentElement).getPropertyValue('font-size'),
  );
  const fontSize = parseFloat(window.getComputedStyle(target).getPropertyValue('font-size'));
  target.style.setProperty('--unitone--fluid-font-size-magnification', fontSize / baseFontSize);
};

export const fluidFontSizeResizeObserver = (target) => {
  let prevWidth = 0;

  const observer = new ResizeObserver((entries) => {
    for (const entry of entries) {
      const width = entry.borderBoxSize?.[0].inlineSize;
      if (width !== prevWidth) {
        setFluidFontSizeMagnification(entry.target);
        prevWidth = width;
      }
    }
  });

  observer.observe(target);
};

export const setDividerLinewrap = (target) => {
  const firstChild = [].slice.call(target?.children ?? [])?.[0];
  if (!!firstChild) {
    let prevChild;

    [].slice.call(target.children).forEach((child) => {
      const currentLayout = child.getAttribute('data-unitone-layout') || '';
      let newLayout = currentLayout.split(' ');
      if (child.classList.contains('unitone-empty')) {
        child.remove();
        return;
      }

      newLayout =
        [...newLayout.filter((value) => !['-bol', '-linewrap', ' '].includes(value))].join(' ') ||
        '';

      if (newLayout !== currentLayout) {
        child.setAttribute('data-unitone-layout', newLayout);
      }
    });

    [].slice.call(target.children).forEach((child) => {
      const baseRect = firstChild.getBoundingClientRect();
      const prevRect = prevChild?.getBoundingClientRect();

      const currentLayout = child.getAttribute('data-unitone-layout') || '';
      let newLayout = currentLayout.split(' ');

      if (firstChild === child || prevRect?.top < child.getBoundingClientRect().top) {
        if (!newLayout.includes('-bol')) {
          newLayout = [...newLayout, '-bol'];
        }
      }

      if (prevRect?.top < child.getBoundingClientRect().top) {
        const hardWrap = document.createElement('div');
        hardWrap.classList.add('unitone-empty');
        child.before(hardWrap);

        if (prevRect?.top < hardWrap.getBoundingClientRect().top) {
          hardWrap.remove();
        }
      }

      if (baseRect.top < child.getBoundingClientRect().top) {
        if (!newLayout.includes('-linewrap')) {
          newLayout = [...newLayout, '-linewrap'];
        }
      }

      newLayout = newLayout.filter(Boolean).join(' ') || '';

      if (newLayout !== currentLayout) {
        child.setAttribute('data-unitone-layout', newLayout);
      }

      prevChild = child;
    });
  }
};

export const dividersResizeObserver = (target, args = {}) => {
  let prevWidth = 0;

  const observer = new ResizeObserver((entries) => {
    for (const entry of entries) {
      const width = entry.borderBoxSize?.[0].inlineSize;
      if (width !== prevWidth) {
        setDividerLinewrap(entry.target);
        prevWidth = width;
      }
    }
  });

  const mObserverArgs = {
    attributes: true,
    attributeFilter: ['style', 'data-unitone-layout', 'class'],
    attributeOldValue: true,
    subtree: true,
    characterData: true,
  };

  const mObserver = new MutationObserver((entries) => {
    for (const entry of entries) {
      if ('attributes' === entry.type && 'data-unitone-layout' === entry.attributeName) {
        const ignoreUnitoneLayouts = [...(args?.ignore?.layout ?? []), ...['-bol', '-linewrap']];

        const current = (entry.target.getAttribute(entry.attributeName) ?? '')
          .split(' ')
          .filter((v) => !ignoreUnitoneLayouts.includes(v))
          .join(' ');

        const old = (entry.oldValue ?? '')
          .split(' ')
          .filter((v) => !ignoreUnitoneLayouts.includes(v))
          .join(' ');

        if (current !== old) {
          setDividerLinewrap(entry.target);
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
          setDividerLinewrap(entry.target);
        }
      } else if ('attributes' === entry.type && 'style' === entry.attributeName) {
        setDividerLinewrap(entry.target);
      }
    }
  });

  const iObserver = new IntersectionObserver(
    (entries, _observer) => {
      entries.forEach((entry) => {
        const target = entry.target;

        if (entry.isIntersecting) {
          _observer.unobserve(target);
          observer.observe(target);
          mObserver.observe(target, mObserverArgs);
        }
      });
    },
    {
      rootMargin: '100px 0px',
    },
  );

  iObserver.observe(target);
};

const setStairsStep = (target) => {
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

  const targetRect = target.getBoundingClientRect();
  const filteredChildren = [];

  let prevChild;
  let stairsStep = 0;
  let maxStairsStep = stairsStep;

  children.forEach((child) => {
    const position = window.getComputedStyle(child).getPropertyValue('position');
    const display = window.getComputedStyle(child).getPropertyValue('display');
    if ('absolute' === position || 'fixed' === position || 'none' === display) {
      return;
    }

    filteredChildren.push(child);

    if (
      firstChild === child ||
      prevChild?.getBoundingClientRect()?.left >= child.getBoundingClientRect().left
    ) {
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

  const { childrenHeight } = filteredChildren.reduce(
    (accumulator, current) => {
      const _childrenTop = !accumulator?.childrenTop
        ? current.getBoundingClientRect().top
        : Math.min(accumulator?.childrenTop, current.getBoundingClientRect().top);

      const _childrenHeight = current.getBoundingClientRect().bottom - _childrenTop;

      return {
        childrenTop: _childrenTop,
        childrenHeight: Math.max(accumulator?.childrenHeight, _childrenHeight),
      };
    },
    {
      childrenTop: filteredChildren?.[0]?.getBoundingClientRect()?.top,
      childrenHeight: filteredChildren?.[0]?.getBoundingClientRect()?.height,
    },
  );

  target.style.setProperty(
    '--unitone--stairs-step-overflow-volume',
    childrenHeight - targetRect.height,
  );
};

export const stairsResizeObserver = (target) => {
  let prevWidth = 0;

  const observer = new ResizeObserver((entries) => {
    for (const entry of entries) {
      const width = entry.borderBoxSize?.[0].inlineSize;
      if (width !== prevWidth) {
        setStairsStep(entry.target);
        prevWidth = width;
      }
    }
  });

  observer.observe(target);
};

const setColumnCountForVertical = (target) => {
  target.style.columnCount = '';

  // Process of the threshold
  target.setAttribute(
    'data-unitone-layout',
    target.getAttribute('data-unitone-layout').replace(' -force-switch', ''),
  );
  const computedStyle = getComputedStyle(target);
  const threshold = String(computedStyle.getPropertyValue('--unitone--threshold')).trim();
  if (!!threshold) {
    const thresholder = document.createElement('div');
    thresholder.setAttribute('data-unitone-layout', 'vertical-writing__thresholder');
    target.appendChild(thresholder);
    const forceSwitch = thresholder.offsetWidth >= target.offsetWidth;
    target.removeChild(thresholder);
    if (forceSwitch) {
      target.setAttribute(
        'data-unitone-layout',
        `${target.getAttribute('data-unitone-layout')} -force-switch`,
      );
      return;
    }
  }

  let lastChild;
  [].slice
    .call(target.children)
    .reverse()
    .some((child) => {
      if (!['absolute', 'fixed'].includes(getComputedStyle(child).position)) {
        lastChild = child;
        return true;
      }
    });

  if (!lastChild) {
    return;
  }

  // For Safari
  let maybeSafari = false;
  if (target.getBoundingClientRect().left > lastChild.getBoundingClientRect().left) {
    target.style.columnCount = 2;
    maybeSafari = true;
  }

  setTimeout(
    () => {
      const targetY = target.getBoundingClientRect().top + target.getBoundingClientRect().height;
      const lastChildY =
        lastChild.getBoundingClientRect().top + lastChild.getBoundingClientRect().height;
      if (targetY !== lastChildY) {
        target.parentNode.style.height = `${Math.ceil(
          lastChildY - target.getBoundingClientRect().top,
        )}px`;
      }
    },
    maybeSafari ? 250 : 0,
  );
};

export const verticalsResizeObserver = (target) => {
  let prevWidth = 0;

  target.setAttribute(
    'data-unitone-layout',
    `${target.getAttribute('data-unitone-layout')} -initialized`,
  );

  const observer = new ResizeObserver((entries, thisObserver) => {
    for (const entry of entries) {
      const width = entry.contentRect?.width;
      if (parseInt(width) !== parseInt(prevWidth)) {
        prevWidth = width;
        observer.unobserve(target);
        thisObserver.unobserve(entry.target);
        entry.target.parentNode.style.height = '';
        setColumnCountForVertical(entry.target);
        setTimeout(() => {
          thisObserver.observe(entry.target);
        }, 500);
      }
    }
  });

  observer.observe(target);

  const mObserverArgs = {
    attributes: true,
    attributeFilter: ['style'],
    childList: true,
    subtree: true,
  };

  let timer;
  const mObserver = new MutationObserver((entries, thisObserver) => {
    clearTimeout(timer);

    if (0 < entries.length) {
      const entry = entries[0];
      const addedNode = entry.addedNodes?.[0];
      const removedNode = entry.removedNodes?.[0];
      if (
        (addedNode?.nodeType === Node.ELEMENT_NODE &&
          'vertical-writing__thresholder' === addedNode.getAttribute('data-unitone-layout')) ||
        (removedNode?.nodeType === Node.ELEMENT_NODE &&
          'vertical-writing__thresholder' === removedNode.getAttribute('data-unitone-layout'))
      ) {
        return;
      }

      thisObserver.disconnect();
      observer.unobserve(target);
      timer = setTimeout(() => {
        setColumnCountForVertical(target);
        setTimeout(() => {
          thisObserver.observe(target, mObserverArgs);
          observer.observe(target);
        }, 500);
      }, 500);
    }
  });

  mObserver.observe(target, mObserverArgs);
};
