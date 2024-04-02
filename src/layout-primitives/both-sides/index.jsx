import React from 'react';

export const BothSides = ({ gap, columnGap, rowGap, alignItems, style, ...props }) => {
  style = {
    ...style,
  };

  return (
    <div
      data-unitone-layout={[
        'both-sides',
        'undefined' !== typeof gap ? `-gap:${gap}` : undefined,
        'undefined' !== typeof columnGap ? `-column-gap:${columnGap}` : undefined,
        'undefined' !== typeof rowGap ? `-row-gap:${rowGap}` : undefined,
        'undefined' !== typeof alignItems ? `-align-items:${alignItems}` : undefined,
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
