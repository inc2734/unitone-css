import React from 'react';

export const Between = ({ gap, style, ...props }) => {
  style = {
    ...style,
  };

  return (
    <div
      data-layout={['between', 'undefined' !== typeof gap ? `-gap:${gap}` : undefined]
        .filter(Boolean)
        .join(' ')}
      style={style}
    >
      {props.children}
    </div>
  );
};
