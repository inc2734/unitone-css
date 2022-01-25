import React from 'react';
import PropTypes from 'prop-types';

export const Frame = ({ ratioWidth, ratioHeight, style, ...props }) => {
  style = {
    ...style,
    '--frame--ratio-width': !!ratioWidth ? ratioWidth : undefined,
    '--frame--ratio-height': !!ratioHeight ? ratioHeight : undefined,
  };

  return (
    <div data-layout="frame" style={style}>
      {props.children}
    </div>
  );
};

Frame.propTypes = {
  ratioWidth: PropTypes.number,
  ratioHeight: PropTypes.number,
};
