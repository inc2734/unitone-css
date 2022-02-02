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
    '--box--background-color': backgroundColor,
    '--box--border-color': borderColor,
    '--box--border-radius': borderRadius,
    '--box--border-width': borderWidth,
    '--box--color': color,
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
