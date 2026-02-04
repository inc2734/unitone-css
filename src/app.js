import {
  dividersResizeObserver,
  stairsResizeObserver,
  verticalsResizeObserver,
  result1emPxForFireFoxObserver,
} from '@inc2734/unitone-css/library';

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

document.addEventListener('DOMContentLoaded', () => {
  const computedStyle = window.getComputedStyle(document.documentElement);
  const isFirefox = computedStyle.getPropertyValue('--unitone--is-firefox').trim();
  if (!isFirefox) {
    return;
  }

  const observer = new MutationObserver((entries) => {
    requestAnimationFrame(() => {
      for (const entry of entries) {
        entry.addedNodes.forEach((addedNode) => {
          const targets = addedNode.parentNode?.querySelectorAll(
            '[style*="font-size:"], [data-unitone-layout~="-fluid-typography"]',
          );
          targets?.forEach((target) => {
            result1emPxForFireFoxObserver(target);
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
            '[data-unitone-layout~="marquee-wrapper"]',
          );
          targets?.forEach((target) => {
            if (1 === target.childElementCount) {
              const marquee = target.querySelector(':scope > [data-unitone-layout~="marquee"]');
              if (!marquee) {
                return;
              }

              const addInitializedToken = (element) => {
                const layout = element.getAttribute('data-unitone-layout') ?? '';
                if (layout.split(/\s+/).includes('marquee:initialized')) {
                  return;
                }
                element.setAttribute('data-unitone-layout', `${layout} marquee:initialized`.trim());
              };

              const clonedMarquee = marquee.cloneNode(true);
              clonedMarquee.setAttribute('aria-hidden', 'true');
              marquee.after(clonedMarquee);

              addInitializedToken(marquee);
              addInitializedToken(clonedMarquee);
            }
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
