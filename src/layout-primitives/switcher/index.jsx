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
  containerType,
  responsiveContext,
  fluidReference, // @deprecated Kept for backward compatibility. Use responsiveContext on an ancestor instead.
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
        '' !== (containerType ?? '') ? `-container-type:${containerType}` : undefined,
        'container' === responsiveContext ? '-responsive-context:container' : undefined,
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
