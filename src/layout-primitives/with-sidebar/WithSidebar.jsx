import React from 'react';

export const WithSidebar = ({
  gap,
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
      data-layout={[
        'with-sidebar',
        true === revert ? '-revert' : undefined,
        'undefined' !== typeof gap ? `-gap:${gap}` : undefined,
        'undefined' !== typeof sidebar ? `-sidebar:${sidebar}` : undefined,
        'undefined' !== typeof alignItems ? `-align-items:${alignItems}` : undefined,
      ]
        .filter(Boolean)
        .join(' ')}
      style={style}
    >
      {props.children}
    </div>
  );
};
