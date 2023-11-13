import React from 'react';

export const Layers = ({
  cover,
  fill,
  blur,
  portrait,
  gap,
  minHeight,
  columns,
  rows,
  style,
  ...props
}) => {
  style = {
    ...style,
    '--unitone--gap': 'undefined' !== typeof gap ? gap : undefined,
    '--unitone--min-height': 'undefined' !== typeof minHeight ? minHeight : undefined,
    '--unitone--columns': 'undefined' !== typeof columns ? columns : undefined,
    '--unitone--rows': 'undefined' !== typeof rows ? rows : undefined,
  };

  return (
    <div
      data-unitone-layout={[
        'layers',
        true === cover ? `-cover` : undefined,
        true === fill ? `-fill` : undefined,
        true === blur ? `-blur` : undefined,
        true === portrait ? `-portrait` : undefined,
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
