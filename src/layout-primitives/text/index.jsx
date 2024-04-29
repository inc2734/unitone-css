import React from 'react';

export const Text = ({ center, column, applyGap, gap, gutters, maxWidth, style, ...props }) => {
  style = {
    ...style,
    '--unitone--max-width': !!maxWidth ? maxWidth : undefined,
  };

  return (
    <div
      data-unitone-layout={[
        'text',
        center ? '-center' : undefined,
        column ? '-column' : undefined,
        applyGap ? '-gap' : undefined,
        '' !== (gap ?? '') ? `-gap:${gap}` : undefined,
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
