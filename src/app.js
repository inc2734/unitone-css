import {
  dividersResizeObserver,
  stairsResizeObserver,
  verticalsResizeObserver,
  result1emPxForFireFoxObserver,
  marqueeResizeObserver,
} from '@inc2734/unitone-css/library';

const createInitializer = ({ selector, initialize, enabled = () => true }) => {
  const initialized = new WeakSet();

  return (root) => {
    if (!enabled() || root?.nodeType !== Node.ELEMENT_NODE) {
      return;
    }

    const targets = new Set();

    if (root.matches?.(selector)) {
      targets.add(root);
    }

    root.querySelectorAll?.(selector).forEach((target) => {
      targets.add(target);
    });

    targets.forEach((target) => {
      if (initialized.has(target)) {
        return;
      }

      initialize(target);
      initialized.add(target);
    });
  };
};

const initializeLayouts = () => {
  const computedStyle = window.getComputedStyle(document.documentElement);
  const isFirefox = !!computedStyle.getPropertyValue('--unitone--is-firefox').trim();

  const initializers = [
    createInitializer({
      selector: '[data-unitone-layout*="-divider:"]',
      initialize: dividersResizeObserver,
    }),
    createInitializer({
      selector: '[data-unitone-layout*="-stairs:"]',
      initialize: stairsResizeObserver,
    }),
    createInitializer({
      selector: '[data-unitone-layout~="vertical-writing"]',
      initialize: verticalsResizeObserver,
    }),
    createInitializer({
      selector: '[style*="font-size:"], [data-unitone-layout~="-fluid-typography"]',
      initialize: result1emPxForFireFoxObserver,
      enabled: () => isFirefox,
    }),
    createInitializer({
      selector: '[data-unitone-layout~="marquee-wrapper"]',
      initialize: marqueeResizeObserver,
    }),
  ];

  const initializeNode = (node) => {
    initializers.forEach((initialize) => {
      initialize(node);
    });
  };

  initializeNode(document.body);

  const pendingNodes = new Set();
  let rafId = 0;

  const flushPendingNodes = () => {
    pendingNodes.forEach((node) => {
      initializeNode(node);
    });

    pendingNodes.clear();
    rafId = 0;
  };

  const observer = new MutationObserver((entries) => {
    for (const entry of entries) {
      entry.addedNodes.forEach((addedNode) => {
        if (addedNode?.nodeType === Node.ELEMENT_NODE) {
          pendingNodes.add(addedNode);
        }
      });
    }

    if (!rafId && 0 < pendingNodes.size) {
      rafId = requestAnimationFrame(flushPendingNodes);
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
};

if ('loading' === document.readyState) {
  document.addEventListener('DOMContentLoaded', initializeLayouts, { once: true });
} else {
  initializeLayouts();
}
