import React from 'react';

export const Container = ({ gutters, maxWidth, style, ...props }) => {
  style = {
    ...style,
    '--max-width': !!maxWidth ? maxWidth : undefined,
  };

  return (
    <div
      data-layout={[
        'container',
        'undefined' !== typeof gutters ? `container--gutters:${gutters}` : undefined,
      ]
        .filter(Boolean)
        .join(' ')}
      style={style}
    >
      {props.children}
    </div>
  );
};
