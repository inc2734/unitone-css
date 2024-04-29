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
    '--unitone--min-height': '' !== (minHeight ?? '') ? minHeight : undefined,
    '--unitone--columns': '' !== (columns ?? '') ? columns : undefined,
    '--unitone--rows': '' !== (rows ?? '') ? rows : undefined,
    '--unitone--blur': '' !== (blur ?? '') ? blur : undefined,
  };

  return (
    <div
      data-unitone-layout={[
        'layers',
        '' !== (gap ?? '') ? `-gap:${gap}` : undefined,
        cover ? '-cover' : undefined,
        fill ? '-fill' : undefined,
        applyBlur ? '-blur' : undefined,
        portrait ? '-portrait' : undefined,
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
