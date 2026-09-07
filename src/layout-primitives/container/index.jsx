import React from 'react';

export const Container = ({
  align,
  gutters,
  maxWidth,
  text,
  containerType,
  responsiveContext,
  fluidReference, // @deprecated Kept for backward compatibility. Use responsiveContext on an ancestor instead.
  style,
  ...props
}) => {
  style = {
    ...style,
    '--unitone--max-width': '' !== maxWidth ? maxWidth : undefined,
  };

  return (
    <div
      data-unitone-layout={[
        'container',
        '' !== (align ?? '') ? `-align:${align}` : undefined,
        '' !== (gutters ?? '') ? `-gutters:${gutters}` : undefined,
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
