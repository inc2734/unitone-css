import React from 'react';

export const Text = ({ center, column, applyGap, gap, gutters, maxWidth, style, ...props }) => {
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
        'undefined' !== typeof gutters ? `-gutters:${gutters}` : undefined,
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
