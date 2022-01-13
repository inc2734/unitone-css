import React from 'react';
import PropTypes from 'prop-types';

export const Container = ({ maxWidth, style, ...props }) => {
  style = {
    ...style,
    '--container--max-width': !!maxWidth ? maxWidth : undefined,
  };

  return (
    <div data-layout="container" style={style}>
      {props.children}
    </div>
  );
};

Container.propTypes = {
  maxWidth: PropTypes.string,
};
