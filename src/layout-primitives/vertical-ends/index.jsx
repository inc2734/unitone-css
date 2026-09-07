import React from 'react';

export const VerticalEnds = ({
  gap,
  alignItems,
  containerType,
  responsiveContext,
  fluidReference, // @deprecated Kept for backward compatibility. Use responsiveContext on an ancestor instead.
  style,
  ...props
}) => {
  style = {
    ...style,
  };

  return (
    <div
      data-unitone-layout={[
        'vertical-ends',
        '' !== (gap ?? '') ? `-gap:${gap}` : undefined,
        '' !== (alignItems ?? '') ? `-align-items:${alignItems}` : undefined,
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
