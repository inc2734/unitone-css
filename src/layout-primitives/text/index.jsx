import React from 'react';

export const Text = ({ center, column, applyGap, gap, maxWidth, scale, style, ...props }) => {
  style = {
    ...style,
    '--unitone--max-width': !!maxWidth ? maxWidth : undefined,
  };

  return (
    <div
      data-unitone-layout={[
        'text',
        true === center ? '-center' : undefined,
        true === column ? '-column' : undefined,
        true === applyGap ? '-gap' : undefined,
        'undefined' !== typeof gap ? `-gap:${gap}` : undefined,
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
