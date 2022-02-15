import React from 'react';

export const ResponsiveGrid = ({ columnMinWidth, gap, style, ...props }) => {
  style = {
    ...style,
    '--column-min-width': !!columnMinWidth ? columnMinWidth : undefined,
  };

  return (
    <div
      data-layout={[
        'responsive-grid',
        'undefined' !== typeof gap ? `responsive-grid--gap:${gap}` : undefined,
      ]
        .filter(Boolean)
        .join(' ')}
      style={style}
    >
      {props.children}
    </div>
  );
};
