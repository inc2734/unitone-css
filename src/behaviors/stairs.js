import { stairsResizeObserver } from '../library';
import { registerLayoutInitializer } from '../register-layout-initializer';

registerLayoutInitializer({
  key: 'behaviors/stairs',
  selector: '[data-unitone-layout*="-stairs:"]',
  initialize: stairsResizeObserver,
});
