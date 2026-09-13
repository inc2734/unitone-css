'use client';

import React from 'react';
import { useLayoutBehaviors } from '../../use-layout-behaviors';

export const ResponsiveGrid = React.forwardRef(function ResponsiveGrid(
  {
    columnMinWidth,
    gap,
    autoRepeat,
    divider,
    dividerWidth,
    dividerStyle,
    dividerColor,
    stairs,
    stairsUp,
    containerType,
    responsiveContext,
    fluidReference, // @deprecated Kept for backward compatibility. Use responsiveContext on an ancestor instead.
    style,
    ...props
  },
  forwardedRef,
) {
  const layoutRef = useLayoutBehaviors(
    { divider: '' !== (divider ?? ''), stairs: '' !== (stairs ?? '') },
    forwardedRef,
  );
  style = {
    ...style,
    '--unitone--column-min-width': '' !== columnMinWidth ? columnMinWidth : undefined,
    '--unitone--divider-width': '' !== dividerWidth ? dividerWidth : undefined,
    '--unitone--divider-style': '' !== dividerStyle ? dividerStyle : undefined,
    '--unitone--divider-color': '' !== dividerColor ? dividerColor : undefined,
  };

  return (
    <div
      data-unitone-layout={[
        'responsive-grid',
        '' !== (gap ?? '') ? `-gap:${gap}` : undefined,
        '' !== (autoRepeat ?? '') ? `-auto-repeat:${autoRepeat}` : undefined,
        '' !== (divider ?? '') ? `-divider:${divider}` : undefined,
        '' !== (stairs ?? '') ? `-stairs:${stairs}` : undefined,
        '' !== (stairsUp ?? '') ? `-stairs-up:${stairsUp}` : undefined,
        '' !== (containerType ?? '') ? `-container-type:${containerType}` : undefined,
        'container' === responsiveContext ? '-responsive-context:container' : undefined,
        '' !== (fluidReference ?? '') ? `-fluid-reference:${fluidReference}` : undefined,
      ]
        .filter(Boolean)
        .join(' ')}
      style={style}
      {...props}
      ref={layoutRef}
      data-unitone-react-layout=""
    >
      {props.children}
    </div>
  );
});
