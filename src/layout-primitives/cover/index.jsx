import React from 'react';

export const Cover = ({
  gap,
  minHeight,
  justifyContent,
  padding,
  paddingTop,
  paddingRight,
  paddingBottom,
  paddingLeft,
  noPadding,
  style,
  ...props
}) => {
  style = {
    ...style,
    '--unitone--min-height': '' !== minHeight ? minHeight : undefined,
  };

  return (
    <div
      data-unitone-layout={[
        'cover',
        noPadding ? '-no-padding' : undefined,
        '' !== (gap ?? '') ? `-gap:${gap}` : undefined,
        '' !== (padding ?? '') ? `-padding:${padding}` : undefined,
        '' !== (paddingTop ?? '') ? `-padding-top:${paddingTop}` : undefined,
        '' !== (paddingRight ?? '') ? `-padding-right:${paddingRight}` : undefined,
        '' !== (paddingBottom ?? '') ? `-padding-bottom:${paddingBottom}` : undefined,
        '' !== (paddingLeft ?? '') ? `-padding-left:${paddingLeft}` : undefined,
      ]
        .filter(Boolean)
        .join(' ')}
      style={style}
    >
      {props.children}
    </div>
  );
};

export const CoverContent = ({
  valign,
  position,
  top,
  right,
  bottom,
  left,
  zIndex,
  tagName = 'div',
  style,
  ...props
}) => {
  const Tag = tagName;

  style = {
    ...style,
    '--unitone--top': '' !== top ? top : undefined,
    '--unitone--right': '' !== right ? right : undefined,
    '--unitone--bottom': '' !== bottom ? bottom : undefined,
    '--unitone--left': '' !== left ? left : undefined,
    '--unitone--z-index': '' !== zIndex ? zIndex : undefined,
  };

  return (
    <Tag
      data-unitone-layout={[
        'cover__content',
        '' !== (valign ?? '') ? `-valign:${valign}` : undefined,
        '' !== (position ?? '') ? `-position:${position}` : undefined,
      ]
        .filter(Boolean)
        .join(' ')}
      style={style}
      {...props}
    >
      {props.children}
    </Tag>
  );
};
