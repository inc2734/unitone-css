import React from 'react';

export const Cover = ({ gap, minHeight, justifyContent, padding, noPadding, style, ...props }) => {
  style = {
    ...style,
    '--unitone--min-height': !!minHeight ? minHeight : undefined,
  };

  return (
    <div
      data-unitone-layout={[
        'cover',
        noPadding ? '-no-padding' : undefined,
        '' !== (gap ?? '') ? `-gap:${gap}` : undefined,
        '' !== (padding ?? '') ? `-padding:${padding}` : undefined,
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
    '--unitone--top': 'undefined' !== typeof top ? top : undefined,
    '--unitone--right': 'undefined' !== typeof right ? right : undefined,
    '--unitone--bottom': 'undefined' !== typeof bottom ? bottom : undefined,
    '--unitone--left': 'undefined' !== typeof left ? left : undefined,
    '--unitone--z-index': 'undefined' !== typeof zIndex ? zIndex : undefined,
  };

  return (
    <Tag
      data-unitone-layout={[
        'cover__content',
        'undefined' !== typeof valign ? `-valign:${valign}` : undefined,
        'undefined' !== typeof position ? `-position:${position}` : undefined,
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
