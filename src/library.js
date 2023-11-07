const setFluidFontSizeMagnification = (target) => {
  const baseFontSize = parseFloat(
    window.getComputedStyle(document.documentElement).getPropertyValue('font-size'),
  );
  const fontSize = parseFloat(window.getComputedStyle(target).getPropertyValue('font-size'));
  target.style.setProperty('--unitone--fluid-font-size-magnification', fontSize / baseFontSize);
};

export const fluidFontSizeResizeObserver = new ResizeObserver((entries) => {
  for (const entry of entries) {
    setFluidFontSizeMagnification(entry.target);
  }
});

const setDividerLinewrap = (target) => {
  const firstChild = [].slice.call(target.children)?.[0];
  if (!!firstChild) {
    let prevChild;

    [].slice.call(target.children).forEach((child) => {
      const baseRect = firstChild.getBoundingClientRect();
      const prevRect = prevChild?.getBoundingClientRect();
      const targetRect = child.getBoundingClientRect();

      let layout = (child.getAttribute('data-unitone-layout') || '').split(' ');
      if (baseRect.top < targetRect.top) {
        if (!layout.includes('-linewrap')) {
          layout.push('-linewrap');
        }
      } else {
        layout = layout.filter((value) => value !== '-linewrap');
      }

      if (firstChild === child || (!!prevRect?.top && prevRect.top < targetRect.top)) {
        if (!layout.includes('-bol')) {
          layout.push('-bol');
        }
      } else {
        layout = layout.filter((value) => value !== '-bol');
      }

      child.setAttribute('data-unitone-layout', layout.join(' '));
      prevChild = child;
    });
  }
};

export const dividersResizeObserver = new ResizeObserver((entries) => {
  for (const entry of entries) {
    setDividerLinewrap(entry.target);
  }
});

const setColumnCountForVertical = (target) => {
  target.parentNode.style.height = '';
  target.parentNode.style.width = '';
  target.style.columnCount = '';

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

  // For Firefox
  if (target.getBoundingClientRect().left > lastChild.getBoundingClientRect().left) {
    target.style.columnCount = 'auto';
    target.parentNode.style.width = `${Math.ceil(
      target.getBoundingClientRect().width +
        target.getBoundingClientRect().left -
        lastChild.getBoundingClientRect().left,
    )}px`;

    if (target.getBoundingClientRect().width >= target.parentNode.getBoundingClientRect().width) {
      target.style.columnCount = '';
    }
  }

  // For Safari
  if (target.getBoundingClientRect().left > lastChild.getBoundingClientRect().left) {
    target.style.columnCount = 2;
  }

  const targetY = target.getBoundingClientRect().top + target.getBoundingClientRect().height;
  const lastChildY =
    lastChild.getBoundingClientRect().top + lastChild.getBoundingClientRect().height;
  if (targetY < lastChildY) {
    target.parentNode.style.height = `${Math.ceil(
      lastChildY - target.getBoundingClientRect().top,
    )}px`;
  }
};

export const verticalsResizeObserve = (target) => {
  let prevWidth = 0;

  const mutationObserver = new MutationObserver((entries) => {
    for (const entry of entries) {
      setColumnCountForVertical(target);
    }
  });

  mutationObserver.observe(target, {
    // attributes: true,
    characterData: true,
    childList: true,
    subtree: true,
  });

  const resizeObserver = new ResizeObserver((entries, observer) => {
    for (const entry of entries) {
      const width = entry.borderBoxSize?.[0].blockSize;
      if (width !== prevWidth) {
        prevWidth = width;
        observer.unobserve(entry.target);
        setColumnCountForVertical(entry.target);
        observer.observe(entry.target);
      }
    }
  });

  resizeObserver.observe(target);
};
