const setFluidFontSizeMagnification = (target) => {
  const baseFontSize = parseFloat(
    window.getComputedStyle(document.documentElement).getPropertyValue('font-size'),
  );
  const fontSize = parseFloat(window.getComputedStyle(target).getPropertyValue('font-size'));
  target.style.setProperty('--unitone--fluid-font-size-magnification', fontSize / baseFontSize);
};

const fluidFontSizeResizeObserver = new ResizeObserver((entries) => {
  for (const entry of entries) {
    setFluidFontSizeMagnification(entry.target);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const fluidFontSizeElements = document.querySelectorAll(
    '[data-unitone-layout~="-fluid-typography"]',
  );
  fluidFontSizeElements.forEach((target) => {
    fluidFontSizeResizeObserver.observe(target);
  });
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

document.addEventListener('DOMContentLoaded', () => {
  const dividers = document.querySelectorAll('[data-unitone-layout*="-divider:"]');
  dividers.forEach((target) => {
    dividersResizeObserver.observe(target);
  });
});

const setHeightForVertical = (target) => {
  const parent = target.parentNode;
  parent.style.height = '';
  target.style.columnCount = '';

  const targetRect = target.getBoundingClientRect();

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
  const childrenMinX = lastChild.getBoundingClientRect().left;
  const preRowCount = Math.ceil(
    (childrenMinX * -1 + targetRect.left + targetRect.width) / targetRect.width,
  );
  const preHeight = `calc(${preRowCount} * ${getComputedStyle(target).getPropertyValue(
    '--unitone--max-height',
  )} + ${preRowCount - 1} * ${getComputedStyle(target).getPropertyValue(
    '--unitone--column-gap',
  )} )`;

  parent.style.height = preHeight;
  if (targetRect.left > childrenMinX) {
    target.style.columnCount = 2;
  }

  const childrenY = [];
  [].slice.call(target.children).forEach((child) => {
    const childRect = child.getBoundingClientRect();
    childrenY.push(childRect.top + childRect.height);
  });
  const childrenMaxY = Math.max(...childrenY);

  if (1 < preRowCount) {
    const height = Math.ceil(childrenMaxY - targetRect.top);
    parent.style.height = !!height ? `${height}px` : '';
  } else {
    parent.style.height = '';
    target.style.columnCount = '';
  }
};

export const verticalsResizeObserver = new ResizeObserver((entries) => {
  for (const entry of entries) {
    setHeightForVertical(entry.target);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const verticals = document.querySelectorAll('[data-unitone-layout~="vertical-writing"]');
  verticals.forEach((target) => {
    verticalsResizeObserver.observe(target);
  });
});
