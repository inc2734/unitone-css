import React from 'react';

export const Gutters = ({ padding, style, ...props }) => {
  return (
    <div
      data-unitone-layout={['gutters', '' !== (padding ?? '') ? `-padding:${padding}` : undefined]
        .filter(Boolean)
        .join(' ')}
      style={style}
      {...props}
    >
      {props.children}
    </div>
  );
};
