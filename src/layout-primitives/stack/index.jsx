'use client';

import React from 'react';
import { useLayoutBehaviors } from '../../use-layout-behaviors';

export const Stack = React.forwardRef(function Stack(
  {
    gap,
    negative,
    revert,
    divider,
    dividerWidth,
    dividerStyle,
    dividerColor,
    containerType,
    responsiveContext,
    fluidReference, // @deprecated Kept for backward compatibility. Use responsiveContext on an ancestor instead.
    tagName = 'div',
    style,
    ...props
  },
  forwardedRef,
) {
  const layoutRef = useLayoutBehaviors({ divider: '' !== (divider ?? '') }, forwardedRef);
  const Tag = tagName;

  style = {
    ...style,
    '--unitone--divider-width': '' !== dividerWidth ? dividerWidth : undefined,
    '--unitone--divider-style': '' !== dividerStyle ? dividerStyle : undefined,
    '--unitone--divider-color': '' !== dividerColor ? dividerColor : undefined,
  };

  return (
    <Tag
      data-unitone-layout={[
        'stack',
        revert ? '-revert' : undefined,
        '' !== (divider ?? '') ? `-divider:${divider}` : undefined,
        '' !== (gap ?? '') ? `-gap:${gap}` : undefined,
        negative ? '-negative' : undefined,
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
    </Tag>
  );
});
