import React from 'react';

export const Switcher = ({ gap, columnGap, rowGap, limit, threshold, style, ...props }) => {
  style = {
    ...style,
    '--unitone--threshold': !!threshold ? threshold : undefined,
  };

  return (
    <div
      data-unitone-layout={[
        'switcher',
        'undefined' !== typeof gap ? `-gap:${gap}` : undefined,
        'undefined' !== typeof columnGap ? `-column-gap:${columnGap}` : undefined,
        'undefined' !== typeof rowGap ? `-row-gap:${rowGap}` : undefined,
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
