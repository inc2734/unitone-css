import React from 'react';
import PropTypes from 'prop-types';

export const ResponsiveGrid = ({ gap, columnMinWidth, style, ...props }) => {
  style = {
    ...style,
    '--responsive-grid--column-min-width': !!columnMinWidth ? columnMinWidth : undefined,
  };

  return (
    <div
      data-layout={[
        'responsive-grid',
        'undefined' !== typeof gap ? `responsive-grid--gap:${gap}` : undefined,
      ]
        .filter(Boolean)
        .join(' ')}
      style={style}
    >
      {props.children}
    </div>
  );
};

ResponsiveGrid.propTypes = {
  gap: PropTypes.number,
  columnMinWidth: PropTypes.string,
};
