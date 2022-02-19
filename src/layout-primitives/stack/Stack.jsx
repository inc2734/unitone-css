import React from 'react';

export const Stack = ({ center, gap, maxWidth, style, ...props }) => {
  style = {
    ...style,
    '--max-width': !!maxWidth ? maxWidth : undefined,
  };

  return (
    <div
      data-layout={[
        'stack',
        'undefined' !== typeof gap ? `-gap:${gap}` : undefined,
        true === center ? '-center' : undefined,
      ]
        .filter(Boolean)
        .join(' ')}
      style={style}
    >
      {props.children}
    </div>
  );
};
