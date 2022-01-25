import React from 'react';
import PropTypes from 'prop-types';

export const Cover = ({ gap, minHeight, noPadding, style, ...props }) => {
  style = {
    ...style,
    '--cover--min-height': !!minHeight ? minHeight : undefined,
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

Cover.propTypes = {
  gap: PropTypes.number,
  minHeight: PropTypes.string,
};

export const Center = ({ tagName = 'div', ...props }) => {
  const Tag = tagName;

  return <Tag data-layout="cover__center">{props.children}</Tag>;
};

export const Bottom = ({ tagName = 'div', ...props }) => {
  const Tag = tagName;

  return <Tag data-layout="cover__bottom">{props.children}</Tag>;
};
