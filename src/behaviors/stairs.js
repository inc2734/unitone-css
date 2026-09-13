import { resetLayoutBehavior } from '../layout-behavior-state';
import { stairsResizeObserver } from '../library';
import { registerLayoutInitializer } from '../register-layout-initializer';

registerLayoutInitializer({
  key: 'behaviors/stairs',
  selector: '[data-unitone-layout*="-stairs:"]:not([data-unitone-react-layout])',
  reset: (target) => resetLayoutBehavior(target, 'stairs'),
  initialize: stairsResizeObserver,
});
