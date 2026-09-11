const INITIALIZER_REGISTRY_KEY = Symbol.for('@inc2734/unitone-css/layout-initializers');

const canUseDOM = () =>
  'undefined' !== typeof window &&
  'undefined' !== typeof document &&
  'undefined' !== typeof MutationObserver &&
  'undefined' !== typeof Node;

const getRegistry = () => {
  if (!canUseDOM()) {
    return null;
  }

  globalThis[INITIALIZER_REGISTRY_KEY] ||= {
    initializers: new Map(),
    pendingNodes: new Set(),
    observer: null,
    rafId: 0,
    hasDOMContentLoadedListener: false,
  };

  return globalThis[INITIALIZER_REGISTRY_KEY];
};

const initializeInitializer = (initializer, root) => {
  if (!root?.isConnected || !initializer.enabled() || root.nodeType !== Node.ELEMENT_NODE) {
    return;
  }

  const targets = new Set();

  if (root.matches?.(initializer.selector)) {
    targets.add(root);
  }

  root.querySelectorAll?.(initializer.selector).forEach((target) => {
    targets.add(target);
  });

  targets.forEach((target) => {
    if (initializer.initialized.has(target)) {
      return;
    }

    const cleanup = initializer.initialize(target);
    initializer.initialized.add(target);
    if ('function' === typeof cleanup) {
      initializer.cleanups.set(target, cleanup);
    }
  });
};

const initializeNode = (root) => {
  const registry = getRegistry();
  if (!registry) {
    return;
  }

  registry.initializers.forEach((initializer) => {
    initializeInitializer(initializer, root);
  });
};

// Inspect detached subtrees without relying on selectors that may have changed before removal.
const disposeNode = (root) => {
  const registry = getRegistry();
  if (!registry || root?.isConnected || root?.nodeType !== Node.ELEMENT_NODE) {
    return;
  }

  [root, ...root.querySelectorAll('*')].forEach((target) => {
    registry.initializers.forEach((initializer) => {
      const cleanup = initializer.cleanups?.get(target);
      if (!cleanup || target.isConnected) {
        return;
      }

      initializer.cleanups.delete(target);
      initializer.initialized.delete(target);
      cleanup();
    });
  });
};

const flushPendingNodes = () => {
  const registry = getRegistry();
  if (!registry) {
    return;
  }

  registry.pendingNodes.forEach((node) => {
    initializeNode(node);
  });

  registry.pendingNodes.clear();
  registry.rafId = 0;
};

const observeDocument = () => {
  const registry = getRegistry();
  if (!registry || registry.observer || !document.body) {
    return;
  }

  initializeNode(document.body);

  registry.observer = new MutationObserver((entries) => {
    entries.forEach((entry) => {
      entry.removedNodes.forEach(disposeNode);
      entry.addedNodes.forEach((addedNode) => {
        if (addedNode?.isConnected && addedNode.nodeType === Node.ELEMENT_NODE) {
          registry.pendingNodes.add(addedNode);
        }
      });
    });

    registry.pendingNodes.forEach((node) => {
      if (!node.isConnected) {
        registry.pendingNodes.delete(node);
      }
    });

    if (!registry.rafId && 0 < registry.pendingNodes.size) {
      registry.rafId = requestAnimationFrame(flushPendingNodes);
    }
  });

  registry.observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
};

export const registerLayoutInitializer = ({ key, selector, initialize, enabled = () => true }) => {
  const registry = getRegistry();
  if (!registry || registry.initializers.has(key)) {
    return;
  }

  const initializer = {
    selector,
    initialize,
    enabled,
    initialized: new WeakSet(),
    cleanups: new WeakMap(),
  };

  registry.initializers.set(key, initializer);

  if (registry.observer) {
    initializeInitializer(initializer, document.body);
    return;
  }

  if ('loading' === document.readyState) {
    if (!registry.hasDOMContentLoadedListener) {
      document.addEventListener('DOMContentLoaded', observeDocument, { once: true });
      registry.hasDOMContentLoadedListener = true;
    }
    return;
  }

  observeDocument();
};
