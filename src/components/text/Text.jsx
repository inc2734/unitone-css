import React from 'react';

export const Text = ({ center, maxWidth, style, ...props }) => {
  style = {
    ...style,
    '--text--max-width': !!maxWidth ? maxWidth : undefined,
  };

  return (
    <div
      data-layout={['text', true === center ? 'text--center' : undefined].filter(Boolean).join(' ')}
      style={style}
    >
      {props.children}
    </div>
  );
};
