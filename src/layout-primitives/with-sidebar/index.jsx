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
  style,
  ...props
}) => {
  style = {
    ...style,
    '--unitone--sidebar-width': !!sidebarWidth ? sidebarWidth : undefined,
    '--unitone--content-min-width': !!contentMinWidth ? contentMinWidth : undefined,
  };

  return (
    <div
      data-unitone-layout={[
        'with-sidebar',
        true === revert ? '-revert' : undefined,
        'undefined' !== typeof gap ? `-gap:${gap}` : undefined,
        'undefined' !== typeof columnGap ? `-column-gap:${columnGap}` : undefined,
        'undefined' !== typeof rowGap ? `-row-gap:${rowGap}` : undefined,
        'undefined' !== typeof sidebar ? `-sidebar:${sidebar}` : undefined,
        'undefined' !== typeof alignItems ? `-align-items:${alignItems}` : undefined,
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
