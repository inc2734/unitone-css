import { verticalsResizeObserver } from '../../library';
import { registerLayoutInitializer } from '../../register-layout-initializer';

registerLayoutInitializer({
  key: 'layout-primitives/vertical-writing',
  selector: '[data-unitone-layout~="vertical-writing"]',
  initialize: verticalsResizeObserver,
});
