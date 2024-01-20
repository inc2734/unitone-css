import React from 'react';

export const ResponsiveGrid = ({
  columnMinWidth,
  gap,
  autoRepeat,
  divider,
  stairs,
  stairsUp,
  style,
  ...props
}) => {
  style = {
    ...style,
    '--unitone--column-min-width': !!columnMinWidth ? columnMinWidth : undefined,
  };

  return (
    <div
      data-unitone-layout={[
        'responsive-grid',
        'undefined' !== typeof gap ? `-gap:${gap}` : undefined,
        'undefined' !== typeof autoRepeat ? `-auto-repeat:${autoRepeat}` : undefined,
        !!divider ? `-divider:${divider}` : undefined,
        'undefined' !== typeof stairs ? `-stairs:${stairs}` : undefined,
        !!stairsUp ? `-stairs-up:${stairsUp}` : undefined,
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
