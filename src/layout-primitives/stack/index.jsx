import React from 'react';

export const Stack = ({ center, divider, gap, negative, style, ...props }) => {
  style = {
    ...style,
  };

  return (
    <div
      data-unitone-layout={[
        'stack',
        '' !== (divider ?? '') ? `-divider:${divider}` : undefined,
        '' !== (gap ?? '') ? `-gap:${gap}` : undefined,
        negative ? '-negative' : undefined,
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
