import React from 'react';
import PropTypes from 'prop-types';

export const Switcher = ({ gap, threshold, limit, style, ...props }) => {
  style = {
    ...style,
    '--stack--threshold': !!threshold ? threshold : undefined,
  };

  return (
    <div
      data-layout={[
        'switcher',
        'undefined' !== typeof gap ? `switcher--gap:${gap}` : undefined,
        'undefined' !== typeof limit ? `switcher--limit:${limit}` : undefined,
      ]
        .filter(Boolean)
        .join(' ')}
      style={style}
    >
      {props.children}
    </div>
  );
};

Switcher.propTypes = {
  gap: PropTypes.number,
  threshold: PropTypes.string,
  limit: PropTypes.number,
};
