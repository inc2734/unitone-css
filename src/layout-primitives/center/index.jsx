import React from 'react';

export const Center = ({
  withText,
  gutters,
  maxWidth,
  containerType,
  fluidReference,
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
        'center',
        true === withText ? `-with-text` : undefined,
        '' !== (gutters ?? '') ? `-gutters:${gutters}` : undefined,
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
