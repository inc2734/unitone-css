import React from 'react';

export const Reel = ({
  gap,
  height,
  itemWidth,
  noBar,
  containerType,
  fluidReference,
  style,
  ...props
}) => {
  style = {
    ...style,
    '--unitone--height': '' !== height ? height : undefined,
    '--unitone--item-width': '' !== itemWidth ? itemWidth : undefined,
  };

  return (
    <div
      data-unitone-layout={[
        'reel',
        '' !== (gap ?? '') ? `-gap:${gap}` : undefined,
        noBar ? '-no-bar' : undefined,
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
