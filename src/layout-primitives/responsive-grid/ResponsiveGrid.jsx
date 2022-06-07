import React from 'react';

export const ResponsiveGrid = ({ columnMinWidth, gap, style, ...props }) => {
  style = {
    ...style,
    '--unitone--column-min-width': !!columnMinWidth ? columnMinWidth : undefined,
  };

  return (
    <div
      data-layout={['responsive-grid', 'undefined' !== typeof gap ? `-gap:${gap}` : undefined]
        .filter(Boolean)
        .join(' ')}
      style={style}
    >
      {props.children}
    </div>
  );
};
