import React from 'react';

export const Stack = ({ center, gap, maxWidth, style, ...props }) => {
  style = {
    ...style,
    '--stack--max-width': !!maxWidth ? maxWidth : undefined,
  };

  return (
    <div
      data-layout={[
        'stack',
        'undefined' !== typeof gap ? `stack--gap:${gap}` : undefined,
        true === center ? 'stack--center' : undefined,
      ]
        .filter(Boolean)
        .join(' ')}
      style={style}
    >
      {props.children}
    </div>
  );
};
