import React from 'react';

export const Container = ({ maxWidth, style, ...props }) => {
  style = {
    ...style,
    '--max-width': !!maxWidth ? maxWidth : undefined,
  };

  return (
    <div data-layout="container" style={style}>
      {props.children}
    </div>
  );
};
