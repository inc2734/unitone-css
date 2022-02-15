import React from 'react';

export const Float = ({ minWidth, minMeasure, position, style, ...props }) => {
  style = {
    ...style,
    '--min-width': !!minWidth ? minWidth : undefined,
    '--min-measure': !!minMeasure ? minMeasure : undefined,
  };

  return (
    <div
      data-layout={['float', !!position ? `float--${position}` : undefined]
        .filter(Boolean)
        .join(' ')}
      style={style}
    >
      {props.children}
    </div>
  );
};
