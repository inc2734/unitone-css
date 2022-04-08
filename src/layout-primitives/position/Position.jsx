import React from 'react';

export const Position = ({ position, top, right, bottom, left, zIndex, style, ...props }) => {
  style = {
    ...style,
    '--top': 'undefined' !== typeof top ? top : undefined,
    '--right': 'undefined' !== typeof right ? right : undefined,
    '--bottom': 'undefined' !== typeof bottom ? bottom : undefined,
    '--left': 'undefined' !== typeof left ? left : undefined,
    '--z-index': 'undefined' !== typeof zIndex ? zIndex : undefined,
  };

  return (
    <div
      data-layout={['position', !!position ? `-${position}` : undefined].filter(Boolean).join(' ')}
      style={style}
    >
      {props.children}
    </div>
  );
};
