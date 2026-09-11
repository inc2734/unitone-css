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
  const observer = env.createResizeObserver(target, () => applied.push(width), scope, {
    getValue: (record) => record.contentRect.width,
  });
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
  const observer = env.createResizeObserver(target, () => calls++, scope, {
    getValue: (record) => record.contentRect.width,
  });
  observer.callback([entry(target, 200)]);
  flushTimers(env);
  assert.equal(calls, 1);
  scope.dispose();
});

test('independent child resize batches cannot overwrite a relevant change', () => {
  const env = createEnvironment();
  const target = env.element();
  const a = env.element(target);
  const b = env.element(target);
  const scope = env.createObserverScope(target);
  let calls = 0;
  const { resizeObserver: observer } = env.createDirectChildrenResizeObserver(
    target,
    () => calls++,
    scope,
    { getValue: (record) => record.contentRect.width },
  );
  observer.callback([entry(a, 100), entry(b, 100)]);
  flushTimers(env);
  calls = 0;
  observer.callback([entry(a, 200)]);
  observer.callback([entry(b, 100)]);
  flushTimers(env);
  assert.equal(calls, 1);
  observer.callback([entry(a, 200)]);
  assert.equal(env.timers.size, 0);
  scope.dispose();
});

test('target and child mutations share one frame without a second frame of delay', () => {
  const env = createEnvironment();
  const target = env.element();
  const child = env.element(target);
  let calls = 0;
  const stop = env.createLayoutObserver(target, () => calls++, {
    observeDirectChildrenResize: true,
    targetMutation: { options: { attributes: true } },
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
