import React from 'react';

export const Layers = ({
  cover,
  fill,
  fixed,
  applyBlur,
  blur,
  portrait,
  gap,
  rowGap,
  columnGap,
  minHeight,
  columns,
  rows,
  repeatRowHeight,
  style,
  ...props
}) => {
  style = {
    ...style,
    '--unitone--min-height': '' !== minHeight ? minHeight : undefined,
    '--unitone--columns': '' !== columns ? columns : undefined,
    '--unitone--rows': '' !== rows ? rows : undefined,
    '--unitone--repeat-row-height': '' !== repeatRowHeight ? repeatRowHeight : undefined,
    '--unitone--blur': '' !== blur ? blur : undefined,
  };

  return (
    <div
      data-unitone-layout={[
        'layers',
        cover ? '-cover' : undefined,
        fill ? '-fill' : undefined,
        fixed ? '-fixed' : undefined,
        applyBlur ? '-blur' : undefined,
        portrait ? '-portrait' : undefined,
        '' !== (gap ?? '') ? `-gap:${gap}` : undefined,
        '' !== (columnGap ?? '') ? `-column-gap:${columnGap}` : undefined,
        '' !== (rowGap ?? '') ? `-row-gap:${rowGap}` : undefined,
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

export const Layer = ({
  alignSelf,
  justifySelf,
  gridColumn,
  gridRow,
  mixBlendMode,
  maxWidth,
  maxHeight,
  style,
  ...props
}) => {
  style = {
    ...style,
    '--unitone--grid-column': '' !== gridColumn ? gridColumn : undefined,
    '--unitone--grid-row': '' !== gridRow ? gridRow : undefined,
    '--unitone--max-width': '' !== maxWidth ? maxWidth : undefined,
    '--unitone--max-height': '' !== maxHeight ? maxHeight : undefined,
  };

  return (
    <div
      data-unitone-layout={[
        'layer',
        '' !== (alignSelf ?? '') ? `-align-self:${alignSelf}` : undefined,
        '' !== (justifySelf ?? '') ? `-justify-self:${justifySelf}` : undefined,
        '' !== (mixBlendMode ?? '') ? `-mix-blend-mode:${mixBlendMode}` : undefined,
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
