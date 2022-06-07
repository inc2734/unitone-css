import React from 'react';

export const Gutters = ({ padding, style, ...props }) => {
  return (
    <div
      data-unitone-layout={[
        'gutters',
        'undefined' !== typeof padding ? `-padding:${padding}` : undefined,
      ]
        .filter(Boolean)
        .join(' ')}
      style={style}
    >
      {props.children}
    </div>
  );
};
