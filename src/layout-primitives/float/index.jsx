import React from 'react';

export const Float = ({ gap, minWidth, minMeasure, position, style, ...props }) => {
  style = {
    ...style,
    '--unitone--min-width': '' !== minWidth ? minWidth : undefined,
    '--unitone--min-measure': '' !== minMeasure ? minMeasure : undefined,
  };

  return (
    <div
      data-unitone-layout={[
        'float',
        '' !== (position ?? '') ? `-position:${position}` : undefined,
        '' !== (gap ?? '') ? `-gap:${gap}` : undefined,
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
