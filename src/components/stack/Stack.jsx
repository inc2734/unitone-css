import React from 'react';
import PropTypes from 'prop-types';

export const Stack = ({ gap, center, maxWidth, style, ...props }) => {
  style = {
    ...style,
    '--stack--max-width': !!maxWidth ? maxWidth : undefined,
  };

  return (
    <div
      data-layout={[
        'stack',
        'undefined' !== typeof gap ? `stack--gap:${gap}` : undefined,
        true === center ? 'stack--center' : undefined,
      ]
        .filter(Boolean)
        .join(' ')}
      style={style}
    >
      {props.children}
    </div>
  );
};

Stack.propTypes = {
  gap: PropTypes.number,
  center: PropTypes.bool,
  maxWidth: PropTypes.string,
};
