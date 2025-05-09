import React from 'react';

export const Switcher = ({
  gap,
  columnGap,
  rowGap,
  limit,
  revert,
  threshold,
  alignItems,
  stairs,
  stairsUp,
  style,
  ...props
}) => {
  style = {
    ...style,
    '--unitone--threshold': '' !== threshold ? threshold : undefined,
  };

  return (
    <div
      data-unitone-layout={[
        'switcher',
        revert ? '-revert' : undefined,
        '' !== (gap ?? '') ? `-gap:${gap}` : undefined,
        '' !== (columnGap ?? '') ? `-column-gap:${columnGap}` : undefined,
        '' !== (rowGap ?? '') ? `-row-gap:${rowGap}` : undefined,
        '' !== (alignItems ?? '') ? `-align-items:${alignItems}` : undefined,
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
