import React from 'react';
import PropTypes from 'prop-types';

export const Cluster = ({ gap, justify, align, style, ...props }) => {
  return (
    <div
      data-layout={[
        'cluster',
        'undefined' !== typeof gap ? `cluster--gap:${gap}` : undefined,
        !!justify ? `cluster--justify:${justify}` : undefined,
        !!align ? `cluster--align:${align}` : undefined,
      ]
        .join(' ')
        .trim()}
      style={style}
    >
      {props.children}
    </div>
  );
};

Cluster.propTypes = {
  gap: PropTypes.number,
  justify: PropTypes.string,
  align: PropTypes.string,
};
