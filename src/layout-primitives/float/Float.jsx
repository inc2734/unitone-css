import React from 'react';

export const Float = ({ gap, minWidth, minMeasure, position, style, ...props }) => {
  style = {
    ...style,
    '--unitone--min-width': !!minWidth ? minWidth : undefined,
    '--unitone--min-measure': !!minMeasure ? minMeasure : undefined,
  };

  return (
    <div
      data-layout={[
        'float',
        !!position ? `-${position}` : undefined,
        'undefined' !== typeof gap ? `-gap:${gap}` : undefined,
      ]
        .filter(Boolean)
        .join(' ')}
      style={style}
    >
      {props.children}
    </div>
  );
};
