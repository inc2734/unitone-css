import {
  fluidFontSizeResizeObserver,
  dividersResizeObserver,
  verticalsResizeObserve,
} from '@inc2734/unitone-css/library';

document.addEventListener('DOMContentLoaded', () => {
  const observer = new MutationObserver((entries) => {
    entries.forEach((entry) => {
      entry.addedNodes.forEach((addedNode) => {
        const targets = addedNode.parentNode?.querySelectorAll(
          '[data-unitone-layout~="-fluid-typography"]',
        );
        targets?.forEach((target) => {
          fluidFontSizeResizeObserver.unobserve(target);
          fluidFontSizeResizeObserver.observe(target);
        });
      });
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const observer = new MutationObserver((entries) => {
    entries.forEach((entry) => {
      entry.addedNodes.forEach((addedNode) => {
        const targets = addedNode.parentNode?.querySelectorAll(
          '[data-unitone-layout*="-divider:"]',
        );
        targets?.forEach((target) => {
          dividersResizeObserver.unobserve(target);
          dividersResizeObserver.observe(target);
        });
      });
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const observer = new MutationObserver((entries) => {
    entries.forEach((entry) => {
      entry.addedNodes.forEach((addedNode) => {
        const targets = addedNode.parentNode?.querySelectorAll(
          '[data-unitone-layout~="vertical-writing"]',
        );
        targets?.forEach((target) => {
          verticalsResizeObserve(target);
        });
      });
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
});
