import React from 'react';

export const Section = ({ backgroundColor, color, padding, style, ...props }) => {
  style = {
    ...style,
    '--background-color': backgroundColor,
    '--color': color,
  };

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
