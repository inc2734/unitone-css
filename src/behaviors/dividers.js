import { dividersResizeObserver } from '../library';
import { registerLayoutInitializer } from '../register-layout-initializer';

registerLayoutInitializer({
  key: 'behaviors/dividers',
  selector: '[data-unitone-layout*="-divider:"]',
  initialize: dividersResizeObserver,
});
