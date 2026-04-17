import React from 'react';

export const ResponsiveGrid = ({
  columnMinWidth,
  gap,
  autoRepeat,
  divider,
  dividerWidth,
  dividerStyle,
  dividerColor,
  stairs,
  stairsUp,
  style,
  ...props
}) => {
  style = {
    ...style,
    '--unitone--column-min-width': '' !== columnMinWidth ? columnMinWidth : undefined,
    '--unitone--divider-width': '' !== dividerWidth ? dividerWidth : undefined,
    '--unitone--divider-style': '' !== dividerStyle ? dividerStyle : undefined,
    '--unitone--divider-color': '' !== dividerColor ? dividerColor : undefined,
  };

  return (
    <div
      data-unitone-layout={[
        'responsive-grid',
        '' !== (gap ?? '') ? `-gap:${gap}` : undefined,
        '' !== (autoRepeat ?? '') ? `-auto-repeat:${autoRepeat}` : undefined,
        '' !== (divider ?? '') ? `-divider:${divider}` : undefined,
        '' !== (stairs ?? '') ? `-stairs:${stairs}` : undefined,
        '' !== (stairsUp ?? '') ? `-stairs-up:${stairsUp}` : undefined,
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
