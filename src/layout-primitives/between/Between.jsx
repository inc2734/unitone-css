import React from 'react';

export const Between = ({ gap, alignItems, style, ...props }) => {
  style = {
    ...style,
  };

  return (
    <div
      data-layout={[
        'between',
        'undefined' !== typeof gap ? `-gap:${gap}` : undefined,
        'undefined' !== typeof alignItems ? `-align-items:${alignItems}` : undefined,
      ]
        .filter(Boolean)
        .join(' ')}
      style={style}
    >
      {props.children}
    </div>
  );
};
