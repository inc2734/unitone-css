import React from 'react';

export const VerticalEnds = ({ gap, alignItems, style, ...props }) => {
  style = {
    ...style,
  };

  return (
    <div
      data-unitone-layout={[
        'vertical-ends',
        '' !== (gap ?? '') ? `-gap:${gap}` : undefined,
        '' !== (alignItems ?? '') ? `-align-items:${alignItems}` : undefined,
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
