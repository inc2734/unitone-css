import React from 'react';

export const WithSidebar = ({
  gap,
  contentMinWidth,
  sidebarPosition,
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
        'left' === sidebarPosition ? 'with-sidebar--sidebar:left' : undefined,
        'undefined' !== typeof gap ? `with-sidebar--gap:${gap}` : undefined,
      ]
        .filter(Boolean)
        .join(' ')}
      style={style}
    >
      {props.children}
    </div>
  );
};
