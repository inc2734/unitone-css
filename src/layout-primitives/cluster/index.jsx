import React from 'react';

export const Cluster = ({
  alignItems,
  divider,
  gap,
  columnGap,
  rowGap,
  justifyContent,
  tagName = 'div',
  style,
  ...props
}) => {
  const Tag = tagName;

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
