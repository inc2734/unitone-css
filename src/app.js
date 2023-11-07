import {
  fluidFontSizeResizeObserver,
  dividersResizeObserver,
  verticalsResizeObserve,
} from '@inc2734/unitone-css/library';

document.addEventListener('DOMContentLoaded', () => {
  const fluidFontSizeElements = document.querySelectorAll(
    '[data-unitone-layout~="-fluid-typography"]',
  );
  fluidFontSizeElements.forEach((target) => {
    fluidFontSizeResizeObserver.observe(target);
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const dividers = document.querySelectorAll('[data-unitone-layout*="-divider:"]');
  dividers.forEach((target) => {
    dividersResizeObserver.observe(target);
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const verticals = document.querySelectorAll('[data-unitone-layout~="vertical-writing"]');
  verticals.forEach((target) => {
    verticalsResizeObserve(target);
  });
});
