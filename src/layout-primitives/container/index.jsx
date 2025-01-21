import React from 'react';

export const Container = ({ align, gutters, maxWidth, text, style, ...props }) => {
  style = {
    ...style,
    '--unitone--max-width': '' !== maxWidth ? maxWidth : undefined,
  };

  return (
    <div
      data-unitone-layout={[
        'container',
        '' !== (align ?? '') ? `-align:${align}` : undefined,
        '' !== (gutters ?? '') ? `-gutters:${gutters}` : undefined,
      ]
        .filter(Boolean)
        .join(' ')}
      style={style}
      {...props}
    >
      {props.children}
    </div>
  );
};
