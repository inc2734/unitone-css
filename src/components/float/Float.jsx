import React from 'react';
import PropTypes from 'prop-types';

export const Float = ({ position, minWidth, gap, minMeasure, style, ...props }) => {
  style = {
    ...style,
    '--float--min-width': !!minWidth ? minWidth : undefined,
    '--float--min-measure': !!minMeasure ? minMeasure : undefined,
  };

  return (
    <div
      data-layout={['float', !!position ? `float--${position}` : undefined]
        .filter(Boolean)
        .join(' ')}
      style={style}
    >
      {props.children}
    </div>
  );
};

Float.propTypes = {
  position: PropTypes.string,
  minWidth: PropTypes.string,
  gap: PropTypes.number,
  minMeasure: PropTypes.string,
};
