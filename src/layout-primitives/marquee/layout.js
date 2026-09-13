import { createObserverScope } from '../../observer-scope';

const marqueeCopyAttribute = 'data-unitone-marquee-copy';
const marqueeBoundaryAttribute = 'data-unitone-marquee-boundary';
const marqueeRefreshEvent = 'unitone:marquee-refresh';

export const isReactMarquee = (target) => target.matches('[data-unitone-marquee-react]');

const marqueeStyle = (element) => element.ownerDocument.defaultView.getComputedStyle(element);
const marqueeHasBox = (element) => element.isConnected && element.getClientRects().length > 0;

const marqueeWidth = (style, borderBox = false) => {
  const edges = ['paddingLeft', 'paddingRight', 'borderLeftWidth', 'borderRightWidth'].reduce(
    (total, property) => total + (parseFloat(style[property]) || 0),
    0,
  );
  return (
    (parseFloat(style.width) || 0) +
    (borderBox ? edges : 0) -
    (style.boxSizing === 'border-box' ? edges : 0)
  );
};

/** Returns the original items and generated items without moving either collection. */
export const getMarqueeParts = (target) => {
  const marquees = Array.from(target.children).filter((child) =>
    child.matches('[data-unitone-layout~="marquee"]'),
  );
  const marquee = marquees.length === 1 ? marquees[0] : null;
  const originals = [];
  const copies = [];
  let afterBoundary = false;
  for (const child of marquee?.children ?? []) {
    if (child.hasAttribute(marqueeBoundaryAttribute)) {
      afterBoundary = true;
    } else if (afterBoundary || child.hasAttribute(marqueeCopyAttribute)) {
      copies.push(child);
    } else {
      originals.push(child);
    }
  }
  return { marquee, originals, copies };
};

/** Decorations belong to the behavior; React retains ownership of the copied nodes. */
export const markMarqueeCopy = (copy) => {
  for (const [name, value] of [
    [marqueeCopyAttribute, ''],
    ['aria-hidden', 'true'],
    ['inert', ''],
  ]) {
    if (copy.getAttribute(name) !== value) copy.setAttribute(name, value);
  }
};

/**
 * Measures the start-to-start repeat distance, including the CSS gap at the boundary.
 * One complete copy is requested first so no separate gap resolver is needed.
 */
export const measureMarquee = (target, { marquee, originals, copies }) => {
  const empty = { groups: 0, distance: 0, rtl: false };
  if (!marquee || !marqueeHasBox(target) || !marqueeHasBox(marquee)) return empty;
  const style = marqueeStyle(marquee);
  if (!style.writingMode.startsWith('horizontal')) return empty;
  const wrapperStyle = marqueeStyle(target);
  const width = marqueeWidth(wrapperStyle);
  const items = originals.filter(marqueeHasBox);
  if (!(width > 0) || !items.some((item) => item.getBoundingClientRect().width > 0)) return empty;
  const rtl = style.direction === 'rtl';
  const firstCopy = copies.find(marqueeHasBox);
  if (!firstCopy) return { groups: 1, distance: 0, rtl };
  const firstRect = items[0].getBoundingClientRect();
  const copyRect = firstCopy.getBoundingClientRect();
  // Positive, axis-aligned ancestor scales must be removed from CSS translation lengths.
  const scale = target.getBoundingClientRect().width / marqueeWidth(wrapperStyle, true);
  const distance =
    (rtl ? firstRect.right - copyRect.right : copyRect.left - firstRect.left) / scale;
  if (!(distance > 0) || !Number.isFinite(distance)) return empty;
  return { groups: Math.ceil(width / distance), distance, rtl };
};

/** Observes layout changes, never measuring on each animation frame. */
export const observeMarquee = (target, update, { listenForRefresh = true } = {}) => {
  const scope = createObserverScope(target);
  const observed = new Set();
  const sizes = new WeakMap();
  let frame = 0;

  const observeMutations = () => {
    mutations.observe(target, {
      attributes: true,
      childList: true,
      characterData: true,
      subtree: true,
    });
    for (let ancestor = target.parentElement; ancestor; ancestor = ancestor.parentElement) {
      mutations.observe(ancestor, { attributes: true });
    }
  };
  const refresh = () => {
    if (scope.disposed || !target.isConnected) return;
    mutations.disconnect();
    try {
      update();
      const { marquee, originals } = getMarqueeParts(target);
      const next = new Set([target, marquee, ...originals].filter(Boolean));
      for (const element of observed) {
        if (!next.has(element)) {
          resizes.unobserve(element);
          observed.delete(element);
          sizes.delete(element);
        }
      }
      for (const element of next) {
        if (!observed.has(element)) {
          resizes.observe(element, { box: 'border-box' });
          observed.add(element);
        }
      }
    } finally {
      observeMutations();
    }
  };
  const schedule = () => {
    if (scope.disposed || frame) return;
    frame = scope.requestAnimationFrame(() => {
      frame = 0;
      refresh();
    });
  };
  const mutations = new MutationObserver(schedule);
  const resizes = new ResizeObserver((entries) => {
    let changed = false;
    for (const entry of entries) {
      const box = entry.borderBoxSize?.[0];
      const size = [
        entry.contentRect.width,
        entry.contentRect.height,
        box?.inlineSize,
        box?.blockSize,
      ].join(',');
      changed ||= sizes.get(entry.target) !== size;
      sizes.set(entry.target, size);
    }
    if (changed) refresh();
  });
  const view = target.ownerDocument.defaultView;
  view.addEventListener('resize', schedule);
  if (listenForRefresh) target.addEventListener(marqueeRefreshEvent, refresh);
  scope.addCleanup(() => {
    mutations.disconnect();
    resizes.disconnect();
    observed.clear();
    view.removeEventListener('resize', schedule);
    if (listenForRefresh) target.removeEventListener(marqueeRefreshEvent, refresh);
  });
  refresh();
  return { refresh, dispose: scope.dispose };
};

export const requestMarqueeRefresh = (target) => {
  target.dispatchEvent(new target.ownerDocument.defaultView.Event(marqueeRefreshEvent));
};
