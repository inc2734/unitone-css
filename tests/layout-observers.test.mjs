import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createEnvironment } from './helpers/environment.mjs';

const entry = (target, width) => ({ target, contentRect: { width } });
const flushTimers = (env) => {
  const callbacks = [...env.timers.values()];
  env.timers.clear();
  callbacks.forEach((callback) => callback());
};

test('a resize before the first debounce finishes is applied with the latest size', () => {
  const env = createEnvironment();
  const target = env.element();
  const scope = env.createObserverScope(target);
  let width = 100;
  const applied = [];
  const observer = env.createResizeObserver(
    target,
    () => applied.push(width),
    scope,
    (record) => record.contentRect.width,
  );
  observer.callback([entry(target, width)]);
  width = 200;
  observer.callback([entry(target, width)]);
  flushTimers(env);
  assert.deepEqual(applied, [200]);
  observer.callback([entry(target, width)]);
  assert.equal(env.timers.size, 0);
  scope.dispose();
});

test('the first resize notification alone is enough to remeasure the layout', () => {
  const env = createEnvironment();
  const target = env.element();
  const scope = env.createObserverScope(target);
  let calls = 0;
  const observer = env.createResizeObserver(
    target,
    () => calls++,
    scope,
    (record) => record.contentRect.width,
  );
  observer.callback([entry(target, 200)]);
  flushTimers(env);
  assert.equal(calls, 1);
  scope.dispose();
});

test('independent child resize batches cannot overwrite a relevant change', () => {
  const env = createEnvironment({ intersection: false });
  const target = env.element();
  const a = env.element(target);
  const b = env.element(target);
  let calls = 0;
  const stop = env.createLayoutObserver(target, () => calls++, {
    getResizeValue: (record) => record.contentRect.width,
    observeDirectChildrenResize: true,
  });
  const observer = env.observers.find((item) => item.type === 'resize');
  observer.callback([entry(a, 100), entry(b, 100)]);
  flushTimers(env);
  env.flushFrames();
  calls = 0;
  observer.callback([entry(a, 200)]);
  observer.callback([entry(b, 100)]);
  flushTimers(env);
  env.flushFrames();
  assert.equal(calls, 1);
  observer.callback([entry(a, 200)]);
  assert.equal(env.timers.size, 0);
  stop();
});

test('target and child mutations share one frame without a second frame of delay', () => {
  const env = createEnvironment({ intersection: false });
  const target = env.element();
  const child = env.element(target);
  let calls = 0;
  const stop = env.createLayoutObserver(target, () => calls++, {
    observeDirectChildrenResize: true,
    targetMutation: { options: { attributes: true }, shouldApply: () => true },
    directChildMutation: { attributeFilter: ['style'], shouldApply: () => true },
  });
  calls = 0;
  for (const observer of env.observers.filter((item) => item.type === 'mutation')) {
    const record = observer.options.get(target)?.childList
      ? { type: 'childList', target, addedNodes: [child], removedNodes: [] }
      : {
          type: 'attributes',
          target: observer.targets.has(target) ? target : child,
          attributeName: 'style',
        };
    observer.callback([record]);
    observer.callback([record]);
  }
  assert.equal(env.frames.size, 1);
  env.flushFrames();
  assert.equal(calls, 1);
  assert.equal(env.frames.size, 0);
  stop();
});

test('temporary attribute resets are ignored while final author changes are retained', () => {
  const env = createEnvironment();
  const target = env.element();
  let currentValue = 'width: 100px;';
  const records = ['width: 100px;', '', 'width: 50px;'].map((oldValue) => ({
    type: 'attributes',
    target,
    attributeName: 'style',
    oldValue,
  }));
  const changed = (record) => record.oldValue !== currentValue;
  assert.equal(env.hasAttributeMutation(records, changed), false);
  currentValue = 'width: 200px;';
  assert.equal(env.hasAttributeMutation(records, changed), true);
});

test('child observation follows additions and removals without watching grandchildren', () => {
  const env = createEnvironment({ intersection: false });
  const target = env.element();
  const removed = env.element(target);
  let calls = 0;
  const stop = env.createLayoutObserver(target, () => calls++, {
    observeDirectChildrenResize: true,
    directChildMutation: { attributeFilter: ['style'], shouldApply: () => true },
  });
  const resize = env.observers.find((observer) => observer.type === 'resize');
  const attributes = env.observers.find((observer) => observer.options.get(removed)?.attributes);
  const childList = env.observers.find((observer) => observer.options.get(target)?.childList);
  const added = env.element(target);
  const grandchild = env.element(added);
  removed.remove();
  childList.callback([{ type: 'childList', target, addedNodes: [added], removedNodes: [removed] }]);
  env.flushFrames();
  calls = 0;
  assert(resize.targets.has(added));
  assert(attributes.targets.has(added));
  assert(!resize.targets.has(removed));
  assert(!attributes.targets.has(removed));
  assert(!resize.targets.has(grandchild));
  assert(!attributes.targets.has(grandchild));
  const mutation = (element) => ({ type: 'attributes', target: element, attributeName: 'style' });
  attributes.callback([mutation(removed), mutation(grandchild)]);
  env.flushFrames();
  assert.equal(calls, 0);
  attributes.callback([mutation(added)]);
  env.flushFrames();
  assert.equal(calls, 1);
  stop();
  assert.equal(resize.targets.size, 0);
  assert.equal(attributes.targets.size, 0);
});

test('offscreen changes are deferred until reentry and pending work is cancelled on cleanup', () => {
  const env = createEnvironment();
  const target = env.element();
  let calls = 0;
  const stop = env.createLayoutObserver(target, () => calls++, {
    observeDirectChildrenResize: true,
  });
  const resize = env.observers.find((observer) => observer.type === 'resize');
  const intersection = env.observers.find((observer) => observer.type === 'intersection');
  resize.callback([entry(target, 100)]);
  flushTimers(env);
  assert.equal(env.frames.size, 0);
  assert.equal(calls, 0);
  intersection.callback([{ target, isIntersecting: true }]);
  env.flushFrames();
  assert.equal(calls, 1);
  intersection.callback([{ target, isIntersecting: false }]);
  resize.callback([entry(target, 200)]);
  flushTimers(env);
  assert.equal(env.frames.size, 0);
  intersection.callback([{ target, isIntersecting: true }]);
  assert.equal(env.frames.size, 1);
  stop();
  env.flushFrames();
  assert.equal(calls, 1);
});
