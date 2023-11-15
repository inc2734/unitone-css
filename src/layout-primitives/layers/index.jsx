import React from 'react';

export const Layers = ({
  cover,
  fill,
  applyBlur,
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
    '--unitone--min-height': 'undefined' !== typeof minHeight ? minHeight : undefined,
    '--unitone--columns': 'undefined' !== typeof columns ? columns : undefined,
    '--unitone--rows': 'undefined' !== typeof rows ? rows : undefined,
    '--unitone--blur': 'undefined' !== typeof blur ? blur : undefined,
  };

  return (
    <div
      data-unitone-layout={[
        'layers',
        'undefined' !== typeof gap ? `-gap:${gap}` : undefined,
        true === cover ? `-cover` : undefined,
        true === fill ? `-fill` : undefined,
        true === applyBlur ? `-blur` : undefined,
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
