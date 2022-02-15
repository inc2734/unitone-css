import React from 'react';

export const Box = ({
  backgroundColor,
  borderColor,
  borderRadius,
  borderWidth,
  color,
  padding,
  style,
  ...props
}) => {
  style = {
    ...style,
    '--background-color': backgroundColor,
    '--border-color': borderColor,
    '--border-radius': borderRadius,
    '--border-width': borderWidth,
    '--color': color,
  };

  return (
    <div
      data-layout={['box', 'undefined' !== typeof padding ? `box--padding:${padding}` : undefined]
        .filter(Boolean)
        .join(' ')}
      style={style}
    >
      {props.children}
    </div>
  );
};
