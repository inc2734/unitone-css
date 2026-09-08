import React from 'react';

export const Marquee = ({ duration, gap, itemWidth, reverse, pauseOnHover, style, ...props }) => {
  style = {
    ...style,
    '--unitone--animation-duration': '' !== duration ? duration : undefined,
    '--unitone--item-width': '' !== itemWidth ? itemWidth : undefined,
  };

  return (
    <div
      data-unitone-layout={[
        'marquee-wrapper',
        reverse ? '-reverse' : undefined,
        pauseOnHover ? '-pause-on-hover' : undefined,
      ]
        .filter(Boolean)
        .join(' ')}
      style={style}
      {...props}
    >
      <div
        data-unitone-layout={['marquee', '' !== (gap ?? '') ? `-gap:${gap}` : undefined]
          .filter(Boolean)
          .join(' ')}
      >
        {props.children}
      </div>
    </div>
  );
};
