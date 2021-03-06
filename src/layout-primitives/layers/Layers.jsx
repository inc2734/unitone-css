import React from 'react';

export const Layers = ({ cover, style, ...props }) => {
  style = {
    ...style,
  };

  return (
    <div
      data-unitone-layout={['layers', true === cover ? `-cover` : undefined]
        .filter(Boolean)
        .join(' ')}
      style={style}
    >
      {props.children}
    </div>
  );
};
