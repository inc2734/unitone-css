import React from 'react';

export const Stack = ({ center, divider, gap, negative, style, ...props }) => {
  style = {
    ...style,
  };

  return (
    <div
      data-unitone-layout={[
        'stack',
        !!divider ? `-divider:${divider}` : undefined,
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
