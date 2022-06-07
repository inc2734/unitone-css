import React from 'react';

export const Text = ({ center, maxWidth, scale, style, ...props }) => {
  style = {
    ...style,
    '--unitone--max-width': !!maxWidth ? maxWidth : undefined,
  };

  return (
    <div
      data-layout={['text', true === center ? '-center' : undefined].filter(Boolean).join(' ')}
      style={style}
    >
      {props.children}
    </div>
  );
};
