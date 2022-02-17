import React from 'react';

export const Center = ({ maxWidth, style, ...props }) => {
  style = {
    ...style,
    '--max-width': !!maxWidth ? maxWidth : undefined,
  };

  return (
    <div data-layout="center" style={style}>
      {props.children}
    </div>
  );
};
