import React from 'react';
import PropTypes from 'prop-types';

export const Text = ({ center, maxWidth, style, ...props }) => {
  style = {
    ...style,
    '--text--max-width': !!maxWidth ? maxWidth : undefined,
  };

  return (
    <div
      data-layout={['text', true === center ? 'text--center' : undefined].filter(Boolean).join(' ')}
      style={style}
    >
      {props.children}
    </div>
  );
};

Text.propTypes = {
  center: PropTypes.bool,
  maxWidth: PropTypes.string,
};
