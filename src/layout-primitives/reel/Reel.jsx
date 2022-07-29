import React from 'react';

export const Reel = ({ gap, height, itemWidth, noBar, shifted, style, ...props }) => {
  style = {
    ...style,
    '--unitone--height': !!height ? height : undefined,
    '--unitone--item-width': !!itemWidth ? itemWidth : undefined,
  };

  return (
    <div
      data-unitone-layout={[
        'reel',
        !!gap ? `-gap:${gap}` : undefined,
        true === noBar ? `-no-bar` : undefined,
        true === shifted ? `-shifted` : undefined,
      ]
        .filter(Boolean)
        .join(' ')}
      style={style}
    >
      {props.children}
    </div>
  );
};
