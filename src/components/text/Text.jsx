import React from 'react';
import PropTypes from 'prop-types';

export const Text = ({
  ...props
}) => {
  return (
    <div
      data-layout="text"
    >
      { props.children }
    </div>
  );
};
