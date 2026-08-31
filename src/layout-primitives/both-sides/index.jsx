import React from 'react';

export const BothSides = ({
  gap,
  columnGap,
  rowGap,
  alignItems,
  containerType,
  fluidReference,
  style,
  ...props
}) => {
  style = {
    ...style,
  };

  return (
    <div
      data-unitone-layout={[
        'both-sides',
        '' !== (gap ?? '') ? `-gap:${gap}` : undefined,
        '' !== (columnGap ?? '') ? `-column-gap:${columnGap}` : undefined,
        '' !== (rowGap ?? '') ? `-row-gap:${rowGap}` : undefined,
        '' !== (alignItems ?? '') ? `-align-items:${alignItems}` : undefined,
        '' !== (containerType ?? '') ? `-container-type:${containerType}` : undefined,
        '' !== (fluidReference ?? '') ? `-fluid-reference:${fluidReference}` : undefined,
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
