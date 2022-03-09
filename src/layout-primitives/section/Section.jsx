import React from 'react';

export const Section = ({ padding, style, ...props }) => {
  return (
    <div
      data-layout={['section', 'undefined' !== typeof padding ? `-padding:${padding}` : undefined]
        .filter(Boolean)
        .join(' ')}
      style={style}
    >
      {props.children}
    </div>
  );
};
