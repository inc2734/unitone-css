import React from 'react';

export const Center = ({ maxWidth, withText, style, ...props }) => {
  style = {
    ...style,
    '--max-width': !!maxWidth ? maxWidth : undefined,
  };

  return (
    <div
      data-layout={['center', 'undefined' !== typeof withText ? `-with-text` : undefined]
        .filter(Boolean)
        .join(' ')}
      style={style}
    >
      {props.children}
    </div>
  );
};
