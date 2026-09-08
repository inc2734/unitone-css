import React from 'react';

export const Reel = ({ gap, height, itemWidth, noBar, style, ...props }) => {
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
