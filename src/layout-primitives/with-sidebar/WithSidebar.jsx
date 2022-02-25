import React from 'react';

export const WithSidebar = ({
  gap,
  contentMinWidth,
  revert,
  sidebar,
  sidebarWidth,
  style,
  ...props
}) => {
  style = {
    ...style,
    '--sidebar-width': !!sidebarWidth ? sidebarWidth : undefined,
    '--content-min-width': !!contentMinWidth ? contentMinWidth : undefined,
  };

  return (
    <div
      data-layout={[
        'with-sidebar',
        true === revert ? '-revert' : undefined,
        'undefined' !== typeof gap ? `-gap:${gap}` : undefined,
        'undefined' !== typeof sidebar ? `-sidebar:${sidebar}` : undefined,
      ]
        .filter(Boolean)
        .join(' ')}
      style={style}
    >
      {props.children}
    </div>
  );
};
