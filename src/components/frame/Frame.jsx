import React from 'react';
import PropTypes from 'prop-types';

export const Frame = ({ ratio, style, ...props }) => {
  style = {
    ...style,
    '--frame--ratio': !!ratio ? ratio : undefined,
  };

  return (
    <div data-layout="frame" style={style}>
      {props.children}
    </div>
  );
};

Frame.propTypes = {
  ratio: PropTypes.string,
};
