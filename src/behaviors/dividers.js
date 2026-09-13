import { resetLayoutBehavior } from '../layout-behavior-state';
import { dividersResizeObserver } from '../library';
import { registerLayoutInitializer } from '../register-layout-initializer';

registerLayoutInitializer({
  key: 'behaviors/dividers',
  selector: '[data-unitone-layout*="-divider:"]:not([data-unitone-react-layout])',
  reset: (target) => resetLayoutBehavior(target, 'divider'),
  initialize: dividersResizeObserver,
});
