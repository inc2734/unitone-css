import React from 'react';

export const Text = ({ center, maxWidth, style, ...props }) => {
  style = {
    ...style,
    '--max-width': !!maxWidth ? maxWidth : undefined,
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
