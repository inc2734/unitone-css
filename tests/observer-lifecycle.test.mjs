import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createEnvironment } from './helpers/environment.mjs';

test('the scope cancels queued frames and disposes resources only once', () => {
  const env = createEnvironment();
  const scope = env.createObserverScope(env.element());
  let effects = 0;
  let cleanups = 0;
  scope.addCleanup(() => cleanups++);
  scope.requestAnimationFrame(() => effects++);
  const stop = scope.dispose;
  stop();
  stop();
  env.flushFrames();
  scope.requestAnimationFrame(() => effects++);
  assert.equal(cleanups, 1);
  assert.equal(effects, 0);
  assert.equal(env.frames.size, 0);
  assert.equal(scope.disposed, true);
});

test('debounce retains context and arguments and supports cancelling pending work', () => {
  const env = createEnvironment();
  const calls = [];
  const receiver = {};
  const debounced = env.debounce(function (...args) {
    calls.push({ receiver: this, args });
  }, 250);
  debounced.call(receiver, 1);
  debounced.call(receiver, 2, 3);
  assert.equal(env.timers.size, 1);
  const callback = [...env.timers.values()][0];
  env.timers.clear();
  callback();
  assert.deepEqual(calls, [{ receiver, args: [2, 3] }]);
  debounced(4);
  debounced.cancel();
  assert.equal(env.timers.size, 0);
});

for (const name of [
  'dividersResizeObserver',
  'stairsResizeObserver',
  'verticalsResizeObserver',
  'marqueeResizeObserver',
]) {
  test(`${name} keeps its existing arguments and returns an idempotent cleanup`, () => {
    const env = createEnvironment();
    const target = env.element();
    env.element(target);
    const stop = env[name](target);
    assert.equal(typeof stop, 'function');
    assert(env.observers.some((observer) => observer.targets.size > 0));
    for (const observer of env.observers) {
      if (observer.type === 'resize' && name !== 'marqueeResizeObserver') {
        observer.callback([
          { target, contentRect: { width: 100 }, borderBoxSize: [{ inlineSize: 100 }] },
        ]);
      }
    }
    stop();
    stop();
    assert(env.observers.every((observer) => observer.targets.size === 0));
    assert.equal(env.frames.size, 0);
    assert.equal(env.timers.size, 0);
    assert.equal(target.listeners.size, 0);
    assert.equal(env.windowListeners.size, 0);
  });
}

test('removing an ancestor disposes all initialized descendants and permits reinsertion', () => {
  const env = createEnvironment();
  const parent = env.element();
  const child = env.element(parent);
  const starts = [];
  const stops = [];
  env.registerLayoutInitializer({
    key: 'test',
    selector: '.fixture',
    initialize: (target) => {
      starts.push(target);
      return () => stops.push(target);
    },
  });
  assert.equal(starts.length, 2);
  parent.remove();
  child.fixture = false;
  env.notify([], [parent]);
  assert.deepEqual(stops, [parent, child]);
  child.fixture = true;
  env.document.body.append(parent);
  env.notify([parent]);
  env.flushFrames();
  assert.deepEqual(starts, [parent, child, parent, child]);
  env.notify([parent]);
  env.flushFrames();
  assert.equal(starts.length, 4);
});

test('moving a connected subtree keeps existing initializations', () => {
  const env = createEnvironment();
  const target = env.element();
  const destination = env.element();
  destination.fixture = false;
  let starts = 0;
  let stops = 0;
  env.registerLayoutInitializer({
    key: 'test',
    selector: '.fixture',
    initialize: () => {
      starts++;
      return () => stops++;
    },
  });
  destination.append(target);
  env.notify([target], [target]);
  env.flushFrames();
  assert.equal(starts, 1);
  assert.equal(stops, 0);
});

test('an element added and removed before initialization is never initialized', () => {
  const env = createEnvironment();
  let starts = 0;
  env.registerLayoutInitializer({
    key: 'test',
    selector: '.fixture',
    initialize: () => {
      starts++;
    },
  });
  const target = env.element();
  env.notify([target]);
  target.remove();
  env.notify([], [target]);
  env.flushFrames();
  assert.equal(starts, 0);
});

test('legacy initializers without cleanup keep their existing one-time behavior', () => {
  const env = createEnvironment();
  const target = env.element();
  let starts = 0;
  env.registerLayoutInitializer({
    key: 'legacy',
    selector: '.fixture',
    initialize: () => {
      starts++;
    },
  });
  target.remove();
  env.notify([], [target]);
  env.document.body.append(target);
  env.notify([target]);
  env.flushFrames();
  assert.equal(starts, 1);
});

test('cleanup cancels an observer callback queued before a synchronous reinsertion', () => {
  const env = createEnvironment({ intersection: false });
  const target = env.element();
  env.registerLayoutInitializer({
    key: 'test',
    selector: '.fixture',
    initialize: (element) =>
      env.createLayoutObserver(element, () => {}, { observeDirectChildrenResize: true }),
  });
  const childObserver = env.observers.find(
    (observer) => observer.type === 'mutation' && observer.targets.has(target),
  );
  childObserver.callback([{ type: 'childList' }]);
  assert(env.frames.size > 0);
  target.remove();
  env.notify([], [target]);
  assert.equal(env.frames.size, 0);
  env.document.body.append(target);
  env.notify([target]);
  env.flushFrames();
  assert(childObserver.targets.size === 0);
  assert(
    env.observers.some((observer) => observer !== childObserver && observer.targets.has(target)),
  );
});
