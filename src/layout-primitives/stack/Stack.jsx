import React from 'react';

export const Stack = ({ center, gap, negative, style, ...props }) => {
  style = {
    ...style,
  };

  return (
    <div
      data-unitone-layout={[
        'stack',
        'undefined' !== typeof gap ? `-gap:${gap}` : undefined,
        true === negative ? '-negative' : undefined,
      ]
        .filter(Boolean)
        .join(' ')}
      style={style}
    >
      {props.children}
    </div>
  );
};
