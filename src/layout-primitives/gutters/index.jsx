import React from 'react';

export const Gutters = ({ padding, containerType, fluidReference, style, ...props }) => {
  return (
    <div
      data-unitone-layout={[
        'gutters',
        '' !== (padding ?? '') ? `-padding:${padding}` : undefined,
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
