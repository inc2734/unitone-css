import React from 'react';
import PropTypes from 'prop-types';

export const Box = ({
  padding,
  backgroundColor,
  color,
  borderColor,
  borderWidth,
  ...props
}) => {
  const style = {
    '--box--background-color': backgroundColor,
    '--box--color': color,
    '--box--border-color': borderColor,
    '--box--border-width': borderWidth,
  };

  return (
    <div
      data-layout={ [
        'box',
        !! padding ? `box--padding:${ padding }` : undefined,
      ].join( ' ' ).trim() }
      style={ style }
    >
      { props.children }
    </div>
  );
};

Box.propTypes = {
  padding: PropTypes.number,
  backgroundColor: PropTypes.string,
  color: PropTypes.string,
  borderColor: PropTypes.string,
  borderWidth: PropTypes.string,
};
