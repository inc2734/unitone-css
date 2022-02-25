import React from 'react';

export const Stack = ({ center, gap, style, ...props }) => {
  style = {
    ...style,
  };

  return (
    <div
      data-layout={['stack', 'undefined' !== typeof gap ? `-gap:${gap}` : undefined]
        .filter(Boolean)
        .join(' ')}
      style={style}
    >
      {props.children}
    </div>
  );
};
