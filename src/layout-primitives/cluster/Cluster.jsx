import React from 'react';

export const Cluster = ({ alignItems, gap, justifyContent, tagName = 'div', style, ...props }) => {
  const Tag = tagName;

  return (
    <Tag
      data-layout={[
        'cluster',
        'undefined' !== typeof gap ? `cluster--gap:${gap}` : undefined,
        !!justifyContent ? `cluster--justify-content:${justifyContent}` : undefined,
        !!alignItems ? `cluster--align-items:${alignItems}` : undefined,
      ]
        .filter(Boolean)
        .join(' ')}
      style={style}
    >
      {props.children}
    </Tag>
  );
};
