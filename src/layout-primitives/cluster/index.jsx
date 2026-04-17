import React from 'react';

export const Cluster = ({
  alignItems,
  divider,
  dividerWidth,
  dividerStyle,
  dividerColor,
  gap,
  columnGap,
  rowGap,
  justifyContent,
  nowrap,
  tagName = 'div',
  style,
  ...props
}) => {
  const Tag = tagName;

  style = {
    ...style,
    '--unitone--divider-width': '' !== dividerWidth ? dividerWidth : undefined,
    '--unitone--divider-style': '' !== dividerStyle ? dividerStyle : undefined,
    '--unitone--divider-color': '' !== dividerColor ? dividerColor : undefined,
  };

  return (
    <Tag
      data-unitone-layout={[
        'cluster',
        '' !== (divider ?? '') ? `-divider:${divider}` : undefined,
        '' !== (gap ?? '') ? `-gap:${gap}` : undefined,
        '' !== (columnGap ?? '') ? `-column-gap:${columnGap}` : undefined,
        '' !== (rowGap ?? '') ? `-row-gap:${rowGap}` : undefined,
        '' !== (alignItems ?? '') ? `-align-items:${alignItems}` : undefined,
        '' !== (justifyContent ?? '') ? `-justify-content:${justifyContent}` : undefined,
        nowrap ? '-nowrap' : undefined,
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
