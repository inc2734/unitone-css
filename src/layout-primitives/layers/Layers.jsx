import React from 'react';

export const Layers = ({ style, ...props }) => {
  style = {
    ...style,
  };

  return (
    <div data-layout="layers" style={style}>
      {props.children}
    </div>
  );
};
