import React from 'react';
import PropTypes from 'prop-types';

export const Box = ({
  padding,
  backgroundColor,
  color,
  borderColor,
  borderWidth,
  borderRadius,
  style,
  ...props
}) => {
  style = {
    ...style,
    '--box--background-color': backgroundColor,
    '--box--color': color,
    '--box--border-color': borderColor,
    '--box--border-width': borderWidth,
    '--box--border-radius': borderRadius,
  };

  return (
    <div
      data-layout={['box', 'undefined' !== typeof padding ? `box--padding:${padding}` : undefined]
        .filter(Boolean)
        .join(' ')}
      style={style}
    >
      {props.children}
    </div>
  );
};

Box.propTypes = {
  padding: PropTypes.number,
  backgroundColor: PropTypes.string,
  color: PropTypes.string,
  borderColor: PropTypes.string,
  borderWidth: PropTypes.string,
  borderRadius: PropTypes.string,
};
