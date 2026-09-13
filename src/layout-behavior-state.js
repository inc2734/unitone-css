export const reactLayoutAttribute = 'data-unitone-react-layout';
export const layoutRefreshEvent = 'unitone:layout-refresh';

/** Defers explicit helper calls to the owning React component, including before hydration. */
export const requestReactLayoutRefresh = (target) => {
  if (!target?.hasAttribute?.(reactLayoutAttribute)) return false;
  target.dispatchEvent(new target.ownerDocument.defaultView.Event(layoutRefreshEvent));
  return true;
};

const removeTokens = (target, tokens) => {
  if (!target) return;
  const current = target.getAttribute('data-unitone-layout') ?? '';
  const next = current
    .split(/\s+/)
    .filter((token) => token && !tokens.includes(token))
    .join(' ');
  if (current !== next) target.setAttribute('data-unitone-layout', next);
};

/** Clears only generated state when a behavior is disabled; disposing alone preserves it. */
export const resetLayoutBehavior = (target, behavior) => {
  if (behavior === 'divider') {
    removeTokens(target, ['divider:initialized', '-stack']);
    Array.from(target.children).forEach((child) => removeTokens(child, ['-bol', '-linewrap']));
  } else if (behavior === 'stairs') {
    removeTokens(target, ['stairs:initialized']);
    target.style.removeProperty('--unitone--max-stairs-step');
    target.style.removeProperty('--unitone--stairs-step-overflow-volume');
    Array.from(target.children).forEach((child) =>
      child.style.removeProperty('--unitone--stairs-step'),
    );
  } else if (behavior === 'vertical') {
    removeTokens(target, [
      'vertical-writing:initialized',
      'vertical-writing:safari',
      '-force-switch',
    ]);
    if (target.parentElement?.style) target.parentElement.style.height = '';
  }
};
