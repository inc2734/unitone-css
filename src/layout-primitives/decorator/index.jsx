import React from 'react';

export const Decorator = ({
  backgroundColor,
  borderColor,
  borderRadius,
  borderWidth,
  maxHeight,
  color,
  padding,
  paddingTop,
  paddingRight,
  paddingBottom,
  paddingLeft,
  shadow,
  position,
  top,
  right,
  bottom,
  left,
  zIndex,
  overflow,
  backdropFilter,
  style,
  ...props
}) => {
  style = {
    ...style,
    '--unitone--background-color': '' !== backgroundColor ? backgroundColor : undefined,
    '--unitone--border-color': '' !== borderColor ? borderColor : undefined,
    '--unitone--border-radius': '' !== borderRadius ? borderRadius : undefined,
    '--unitone--border-width': '' !== borderWidth ? borderWidth : undefined,
    '--unitone--max-height': '' !== maxHeight ? maxHeight : undefined,
    '--unitone--color': '' !== color ? color : undefined,
    '--unitone--top': '' !== top ? top : undefined,
    '--unitone--right': '' !== right ? right : undefined,
    '--unitone--bottom': '' !== bottom ? bottom : undefined,
    '--unitone--left': '' !== left ? left : undefined,
    '--unitone--z-index': '' !== zIndex ? zIndex : undefined,
    '--unitone--backdrop-filter': '' !== backdropFilter ? backdropFilter : undefined,
  };

  return (
    <div
      data-unitone-layout={[
        'decorator',
        '' !== (padding ?? '') ? `-padding:${padding}` : undefined,
        '' !== (paddingTop ?? '') ? `-padding-top:${paddingTop}` : undefined,
        '' !== (paddingRight ?? '') ? `-padding-right:${paddingRight}` : undefined,
        '' !== (paddingBottom ?? '') ? `-padding-bottom:${paddingBottom}` : undefined,
        '' !== (paddingLeft ?? '') ? `-padding-left:${paddingLeft}` : undefined,
        shadow ? '-shadow' : undefined,
        '' !== (position ?? '') ? `-position:${position}` : undefined,
        '' !== (overflow ?? '') ? `-overflow:${overflow}` : undefined,
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
