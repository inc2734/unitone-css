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
    '--top': 'undefined' !== typeof top ? top : undefined,
    '--right': 'undefined' !== typeof right ? right : undefined,
    '--bottom': 'undefined' !== typeof bottom ? bottom : undefined,
    '--left': 'undefined' !== typeof left ? left : undefined,
    '--z-index': 'undefined' !== typeof zIndex ? zIndex : undefined,
  };

  return (
    <div
      data-layout={[
        'decorator',
        'undefined' !== typeof padding ? `-padding:${padding}` : undefined,
        !!shadow ? '-shadow' : undefined,
        !!position ? `-position:${position}` : undefined,
      ]
        .filter(Boolean)
        .join(' ')}
      style={style}
    >
      {props.children}
    </div>
  );
};
