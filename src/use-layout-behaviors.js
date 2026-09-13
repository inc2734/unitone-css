'use client';

import { useEffect, useImperativeHandle, useLayoutEffect, useRef } from 'react';
import { dividersResizeObserver, stairsResizeObserver, verticalsResizeObserver } from './library';
import { layoutRefreshEvent, resetLayoutBehavior } from './layout-behavior-state';

const useBrowserLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect;
const observers = {
  divider: dividersResizeObserver,
  stairs: stairsResizeObserver,
  vertical: verticalsResizeObserver,
};

/** React owns observer lifetimes; calculations and resize handling remain shared with HTML. */
export const useLayoutBehaviors = (enabled, forwardedRef) => {
  const targetRef = useRef(null);
  const lifetimeRef = useRef(null);
  useImperativeHandle(forwardedRef, () => targetRef.current);

  const dispose = () => {
    const lifetime = lifetimeRef.current;
    if (!lifetime) return;
    lifetime.target.removeEventListener(layoutRefreshEvent, lifetime.refresh);
    lifetime.controllers.forEach((controller, name) => {
      controller.dispose();
      resetLayoutBehavior(lifetime.target, name);
    });
    lifetimeRef.current = null;
  };

  useBrowserLayoutEffect(() => dispose, []);
  useBrowserLayoutEffect(() => {
    const target = targetRef.current;
    if (lifetimeRef.current?.target !== target) dispose();
    if (!target) return;
    if (!lifetimeRef.current) {
      const controllers = new Map();
      const refresh = () => controllers.forEach((controller) => controller.refresh());
      lifetimeRef.current = { target, controllers, refresh };
      target.addEventListener(layoutRefreshEvent, refresh);
    }
    const { controllers } = lifetimeRef.current;
    for (const [name, observe] of Object.entries(observers)) {
      if (!enabled[name]) {
        if (controllers.has(name)) {
          controllers.get(name).dispose();
          controllers.delete(name);
          resetLayoutBehavior(target, name);
        }
      } else if (!controllers.has(name)) {
        const stop = observe(target, { reactOwned: true });
        controllers.set(name, { dispose: stop, refresh: stop.refresh });
      } else {
        controllers.get(name).refresh();
      }
    }
  });

  return targetRef;
};
