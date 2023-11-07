import React from 'react';

export const Switcher = ({ gap, limit, threshold, style, ...props }) => {
  style = {
    ...style,
    '--unitone--threshold': !!threshold ? threshold : undefined,
  };

  return (
    <div
      data-unitone-layout={['switcher', 'undefined' !== typeof gap ? `-gap:${gap}` : undefined]
        .filter(Boolean)
        .join(' ')}
      style={style}
    >
      {props.children}
    </div>
  );
};
