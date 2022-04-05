import React from 'react';

export const Cover = ({ gap, minHeight, noPadding, style, ...props }) => {
  style = {
    ...style,
    '--min-height': !!minHeight ? minHeight : undefined,
  };

  return (
    <div
      data-layout={[
        'cover',
        noPadding ? '-no-padding' : undefined,
        'undefined' !== typeof gap ? `-gap:${gap}` : undefined,
      ]
        .filter(Boolean)
        .join(' ')}
      style={style}
    >
      {props.children}
    </div>
  );
};

export const CoverContent = ({ tagName = 'div', ...props }) => {
  const Tag = tagName;

  return <Tag data-layout="cover__content">{props.children}</Tag>;
};