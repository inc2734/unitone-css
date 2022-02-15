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
        noPadding ? 'cover--no-padding' : undefined,
        'undefined' !== typeof gap ? `cover--gap:${gap}` : undefined,
      ]
        .filter(Boolean)
        .join(' ')}
      style={style}
    >
      {props.children}
    </div>
  );
};

export const Center = ({ tagName = 'div', ...props }) => {
  const Tag = tagName;

  return <Tag data-layout="cover__center">{props.children}</Tag>;
};

export const Bottom = ({ tagName = 'div', ...props }) => {
  const Tag = tagName;

  return <Tag data-layout="cover__bottom">{props.children}</Tag>;
};
