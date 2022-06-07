import React from 'react';

export const Cover = ({ gap, minHeight, justifyContent, noPadding, style, ...props }) => {
  style = {
    ...style,
    '--unitone--min-height': !!minHeight ? minHeight : undefined,
  };

  return (
    <div
      data-unitone-layout={[
        'cover',
        noPadding ? '-no-padding' : undefined,
        'undefined' !== typeof gap ? `-gap:${gap}` : undefined,
        'undefined' !== typeof justifyContent ? `-justify-content:${justifyContent}` : undefined,
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

  return <Tag data-unitone-layout="cover__content">{props.children}</Tag>;
};
