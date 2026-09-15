'use client';

import React from 'react';
import { useLayoutBehaviors } from '../../use-layout-behaviors';

export const WithSidebar = React.forwardRef(function WithSidebar(
  {
    gap,
    columnGap,
    rowGap,
    contentMinWidth,
    revert,
    sidebar,
    sidebarWidth,
    alignItems,
    overflow,
    divider,
    dividerWidth,
    dividerStyle,
    dividerColor,
    containerType,
    responsiveContext,
    style,
    ...props
  },
  forwardedRef,
) {
  const layoutRef = useLayoutBehaviors({ divider: '' !== (divider ?? '') }, forwardedRef);
  style = {
    ...style,
    '--unitone--sidebar-width': '' !== sidebarWidth ? sidebarWidth : undefined,
    '--unitone--content-min-width': '' !== contentMinWidth ? contentMinWidth : undefined,
    '--unitone--divider-width': '' !== dividerWidth ? dividerWidth : undefined,
    '--unitone--divider-style': '' !== dividerStyle ? dividerStyle : undefined,
    '--unitone--divider-color': '' !== dividerColor ? dividerColor : undefined,
  };

  return (
    <div
      data-unitone-layout={[
        'with-sidebar',
        revert ? '-revert' : undefined,
        '' !== (gap ?? '') ? `-gap:${gap}` : undefined,
        '' !== (columnGap ?? '') ? `-column-gap:${columnGap}` : undefined,
        '' !== (rowGap ?? '') ? `-row-gap:${rowGap}` : undefined,
        '' !== (sidebar ?? '') ? `-sidebar:${sidebar}` : undefined,
        '' !== (alignItems ?? '') ? `-align-items:${alignItems}` : undefined,
        '' !== (overflow ?? '') ? `-overflow:${overflow}` : undefined,
        '' !== (divider ?? '') ? `-divider:${divider}` : undefined,
        '' !== (containerType ?? '') ? `-container-type:${containerType}` : undefined,
        'container' === responsiveContext ? '-responsive-context:container' : undefined,
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
