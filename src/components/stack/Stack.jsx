import React from 'react';
import PropTypes from 'prop-types';

export const Stack = ({
  gap,
  center,
  ...props
}) => {
  return (
    <div
      data-layout={ [
        'stack',
        !! gap ? `stack--gap:${ gap }` : undefined,
        true === center ? 'stack--center' : undefined,
      ].join( ' ' ).trim() }
    >
      { props.children }
    </div>
  );
};

Stack.propTypes = {
  gap: PropTypes.number,
  center: PropTypes.bool,
};
