/**
 * Owns the resources and queued work of one layout observer initialization.
 *
 * @param {Element} target Target element.
 * @returns {object} Observer lifetime and cleanup helpers.
 */
export const createObserverScope = (target) => {
  const defaultView = target.ownerDocument.defaultView;
  const cleanups = new Set();
  const frames = new Set();
  let disposed = false;

  return {
    get disposed() {
      return disposed;
    },
    addCleanup(cleanup) {
      if (disposed) {
        cleanup();
      } else {
        cleanups.add(cleanup);
      }
    },
    requestAnimationFrame(callback) {
      if (disposed) {
        return 0;
      }
      if (!defaultView?.requestAnimationFrame) {
        callback();
        return 0;
      }

      const id = defaultView.requestAnimationFrame((time) => {
        frames.delete(id);
        if (!disposed) {
          callback(time);
        }
      });
      frames.add(id);
      return id;
    },
    dispose() {
      if (disposed) {
        return;
      }
      disposed = true;
      frames.forEach((id) => defaultView.cancelAnimationFrame(id));
      frames.clear();
      cleanups.forEach((cleanup) => cleanup());
      cleanups.clear();
    },
  };
};
