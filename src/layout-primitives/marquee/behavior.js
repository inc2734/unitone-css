import { marqueeResizeObserver } from '../../library';
import { registerLayoutInitializer } from '../../register-layout-initializer';

registerLayoutInitializer({
  key: 'layout-primitives/marquee',
  selector: '[data-unitone-layout~="marquee-wrapper"]:not([data-unitone-marquee-react])',
  initialize: marqueeResizeObserver,
});
