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

export const dividersResizeObserver = (target) => {
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

  observer.observe(target);
};

const setStairsStep = (target) => {
  const firstChild = [].slice.call(target.children)?.[0];
  if (!!firstChild) {
    let prevChild;
    let stairsStep = 0;

    [].slice.call(target.children).forEach((child) => {
      child.style.setProperty('--unitone--stairs-step', '');
      const prevRect = prevChild?.getBoundingClientRect();
      const targetRect = child.getBoundingClientRect();

      if (firstChild === child || (!!prevRect?.top && prevRect.top < targetRect.top)) {
        stairsStep = 0;
        child.style.setProperty('--unitone--stairs-step', stairsStep);
      } else {
        stairsStep++;
        child.style.setProperty('--unitone--stairs-step', stairsStep);
      }

      prevChild = child;
      target.style.setProperty('--unitone--stairs-step', stairsStep);
    });
  }
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
      if (targetY < lastChildY) {
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

  const observer = new ResizeObserver((entries) => {
    for (const entry of entries) {
      const width = entry.borderBoxSize?.[0].inlineSize;
      if (width !== prevWidth) {
        setColumnCountForVertical(entry.target);
        prevWidth = width;
      }
    }
  });

  observer.observe(target);
};
