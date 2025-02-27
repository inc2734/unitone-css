import {
  fluidFontSizeResizeObserver,
  dividersResizeObserver,
  stairsResizeObserver,
  verticalsResizeObserver,
} from '@inc2734/unitone-css/library';

document.addEventListener('DOMContentLoaded', () => {
  const observer = new MutationObserver((entries) => {
    requestAnimationFrame(() => {
      for (const entry of entries) {
        entry.addedNodes.forEach((addedNode) => {
          const targets = addedNode.parentNode?.querySelectorAll(
            '[data-unitone-layout~="-fluid-typography"]',
          );
          targets?.forEach((target) => {
            fluidFontSizeResizeObserver(target);
          });
        });
      }
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const observer = new MutationObserver((entries) => {
    requestAnimationFrame(() => {
      for (const entry of entries) {
        entry.addedNodes.forEach((addedNode) => {
          const targets = addedNode.parentNode?.querySelectorAll(
            '[data-unitone-layout*="-divider:"]',
          );
          targets?.forEach((target) => {
            dividersResizeObserver(target);
          });
        });
      }
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const observer = new MutationObserver((entries) => {
    requestAnimationFrame(() => {
      for (const entry of entries) {
        entry.addedNodes.forEach((addedNode) => {
          const targets = addedNode.parentNode?.querySelectorAll(
            '[data-unitone-layout*="-stairs:"]',
          );
          targets?.forEach((target) => {
            stairsResizeObserver(target);
          });
        });
      }
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const observer = new MutationObserver((entries) => {
    requestAnimationFrame(() => {
      for (const entry of entries) {
        entry.addedNodes.forEach((addedNode) => {
          const targets = addedNode.parentNode?.querySelectorAll(
            '[data-unitone-layout~="vertical-writing"]',
          );
          targets?.forEach((target) => {
            verticalsResizeObserver(target);
          });
        });
      }
    });
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
});
