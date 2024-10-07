import React from 'react';

export const Switcher = ({
  gap,
  columnGap,
  rowGap,
  limit,
  revert,
  threshold,
  alignItems,
  style,
  ...props
}) => {
  style = {
    ...style,
    '--unitone--threshold': !!threshold ? threshold : undefined,
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
