import React from 'react';

export const Decorator = ({
  backgroundColor,
  borderColor,
  borderRadius,
  borderWidth,
  color,
  padding,
  shadow,
  position,
  top,
  right,
  bottom,
  left,
  zIndex,
  overflow,
  style,
  ...props
}) => {
  style = {
    ...style,
    '--unitone--background-color': backgroundColor,
    '--unitone--border-color': borderColor,
    '--unitone--border-radius': borderRadius,
    '--unitone--border-width': borderWidth,
    '--unitone--color': color,
    '--unitone--top': 'undefined' !== typeof top ? top : undefined,
    '--unitone--right': 'undefined' !== typeof right ? right : undefined,
    '--unitone--bottom': 'undefined' !== typeof bottom ? bottom : undefined,
    '--unitone--left': 'undefined' !== typeof left ? left : undefined,
    '--unitone--z-index': 'undefined' !== typeof zIndex ? zIndex : undefined,
  };

  return (
    <div
      data-unitone-layout={[
        'decorator',
        'undefined' !== typeof padding ? `-padding:${padding}` : undefined,
        !!shadow ? '-shadow' : undefined,
        !!position ? `-position:${position}` : undefined,
        !!overflow ? `-overflow:${overflow}` : undefined,
      ]
        .filter(Boolean)
        .join(' ')}
      style={style}
    >
      {props.children}
    </div>
  );
};
