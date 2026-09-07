import React from 'react';

export const Gutters = ({
  padding,
  containerType,
  responsiveContext,
  fluidReference, // @deprecated Kept for backward compatibility. Use responsiveContext on an ancestor instead.
  style,
  ...props
}) => {
  return (
    <div
      data-unitone-layout={[
        'gutters',
        '' !== (padding ?? '') ? `-padding:${padding}` : undefined,
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
