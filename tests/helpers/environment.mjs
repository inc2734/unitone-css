import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const source = ['observer-scope.js', 'library.js', 'register-layout-initializer.js']
  .map((file) => readFileSync(new URL(`../../src/${file}`, import.meta.url), 'utf8'))
  .join('\n')
  .replace(/^import .*;\n/gm, '')
  .replace(/^export /gm, '');

// Run the source with controlled browser scheduling; no timers or observers escape a test.
export const createEnvironment = ({ intersection = true } = {}) => {
  const frames = new Map();
  const timers = new Map();
  const observers = [];
  const windowListeners = new Map();
  let nextId = 1;

  class Element {
    nodeType = 1;
    children = [];
    parentElement = null;
    fixture = true;
    ownerDocument;
    listeners = new Map();

    addEventListener(name, callback) {
      this.listeners.set(name, callback);
    }
    removeEventListener(name) {
      this.listeners.delete(name);
    }

    get isConnected() {
      return this === document.body || !!this.parentElement?.isConnected;
    }
    append(child) {
      child.remove();
      this.children.push(child);
      child.parentElement = this;
      child.ownerDocument = document;
    }
    remove() {
      if (this.parentElement) {
        const siblings = this.parentElement.children;
        siblings.splice(siblings.indexOf(this), 1);
        this.parentElement = null;
      }
    }
    matches(selector) {
      return selector === '.fixture' && this.fixture;
    }
    querySelectorAll(selector) {
      return this.children.flatMap((child) => [
        ...(selector === '*' || child.matches(selector) ? [child] : []),
        ...child.querySelectorAll(selector),
      ]);
    }
    getClientRects() {
      return [];
    }
  }

  const makeObserver = (type) =>
    class {
      targets = new Set();
      options = new Map();
      constructor(callback) {
        this.callback = callback;
        this.type = type;
        observers.push(this);
      }
      observe(target, options) {
        this.targets.add(target);
        this.options.set(target, options);
      }
      unobserve(target) {
        this.targets.delete(target);
        this.options.delete(target);
      }
      disconnect() {
        this.targets.clear();
        this.options.clear();
      }
      takeRecords() {
        return [];
      }
    };
  const document = { readyState: 'complete', body: new Element(), defaultView: null };
  document.body.fixture = false;
  document.body.ownerDocument = document;
  document.documentElement = document.body;
  const context = vm.createContext({
    document,
    Node: { ELEMENT_NODE: 1 },
    ResizeObserver: makeObserver('resize'),
    MutationObserver: makeObserver('mutation'),
    IntersectionObserver: intersection ? makeObserver('intersection') : undefined,
    requestAnimationFrame: (callback) => {
      const id = nextId++;
      frames.set(id, callback);
      return id;
    },
    cancelAnimationFrame: (id) => frames.delete(id),
    setTimeout: (callback) => {
      const id = nextId++;
      timers.set(id, callback);
      return id;
    },
    clearTimeout: (id) => timers.delete(id),
    addEventListener: (name, callback) => windowListeners.set(name, callback),
    removeEventListener: (name) => windowListeners.delete(name),
  });
  document.defaultView = context;
  context.window = context;
  vm.runInContext(
    `${source}\nglobalThis.api = {
    createObserverScope, debounce, registerLayoutInitializer,
    createLayoutObserver, createResizeObserver, hasAttributeMutation,
    dividersResizeObserver, stairsResizeObserver, verticalsResizeObserver, marqueeResizeObserver,
  };`,
    context,
  );
  const element = (parent = document.body) => {
    const target = new Element();
    target.ownerDocument = document;
    parent?.append(target);
    return target;
  };
  const registryObserver = () =>
    observers.find(
      (observer) => observer.type === 'mutation' && observer.targets.has(document.body),
    );
  const notify = (addedNodes = [], removedNodes = []) =>
    registryObserver().callback([{ addedNodes, removedNodes }]);
  const flushFrames = () => {
    const callbacks = [...frames.values()];
    frames.clear();
    callbacks.forEach((callback) => callback(0));
  };
  return {
    ...context.api,
    context,
    document,
    element,
    observers,
    frames,
    timers,
    windowListeners,
    notify,
    flushFrames,
  };
};
