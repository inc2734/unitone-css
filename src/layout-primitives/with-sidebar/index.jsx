import React from 'react';

export const WithSidebar = ({
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
  style,
  ...props
}) => {
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
      ]
        .filter(Boolean)
        .join(' ')}
      style={style}
      {...props}
    >
      {props.children}
    </div>
  );
};
