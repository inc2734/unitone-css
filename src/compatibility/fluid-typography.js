import { result1emPxForFireFoxObserver } from '../library';
import { registerLayoutInitializer } from '../register-layout-initializer';

const isFirefox = () => {
  if ('undefined' === typeof window || 'undefined' === typeof document) {
    return false;
  }

  const computedStyle = window.getComputedStyle(document.documentElement);
  return !!computedStyle.getPropertyValue('--unitone--is-firefox').trim();
};

registerLayoutInitializer({
  key: 'compatibility/fluid-typography',
  selector: '[style*="font-size:"], [data-unitone-layout~="-fluid-typography"]',
  initialize: result1emPxForFireFoxObserver,
  enabled: isFirefox,
});
