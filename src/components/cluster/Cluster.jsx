import React from 'react';

export const Cluster = ({ align, gap, justify, tagName = 'div', style, ...props }) => {
  const Tag = tagName;

  return (
    <Tag
      data-layout={[
        'cluster',
        'undefined' !== typeof gap ? `cluster--gap:${gap}` : undefined,
        !!justify ? `cluster--justify:${justify}` : undefined,
        !!align ? `cluster--align:${align}` : undefined,
      ]
        .filter(Boolean)
        .join(' ')}
      style={style}
    >
      {props.children}
    </Tag>
  );
};
