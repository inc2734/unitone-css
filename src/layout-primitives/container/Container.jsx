import React from 'react';

export const Container = ({ align, gutters, maxWidth, text, style, ...props }) => {
  style = {
    ...style,
    '--max-width': !!maxWidth ? maxWidth : undefined,
  };

  return (
    <div
      data-layout={[
        'container',
        'undefined' !== typeof align ? `-align:${align}` : undefined,
        'undefined' !== typeof gutters ? `-gutters:${gutters}` : undefined,
      ]
        .filter(Boolean)
        .join(' ')}
      style={style}
    >
      {props.children}
    </div>
  );
};
