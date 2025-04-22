import React from 'react';

export const Masonry = ({ gap, columnWidth, style, ...props }) => {
  style = {
    ...style,
    '--unitone--column-width': '' !== columnWidth ? columnWidth : undefined,
  };

  return (
    <div
      data-unitone-layout={['masonry', '' !== (gap ?? '') ? `-gap:${gap}` : undefined]
        .filter(Boolean)
        .join(' ')}
      style={style}
      {...props}
    >
      {props.children}
    </div>
  );
};
