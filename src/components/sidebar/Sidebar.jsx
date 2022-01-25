import React from 'react';
import PropTypes from 'prop-types';

export const Sidebar = ({ position, gap, asideWidth, mainMinWidth, style, ...props }) => {
  style = {
    ...style,
    '--sidebar--aside-width': !!asideWidth ? asideWidth : undefined,
    '--sidebar--main-min-width': !!mainMinWidth ? mainMinWidth : undefined,
  };

  return (
    <div
      data-layout={[
        'sidebar',
        'left' === position ? 'sidebar--left' : undefined,
        'undefined' !== typeof gap ? `sidebar--gap:${gap}` : undefined,
      ]
        .filter(Boolean)
        .join(' ')}
      style={style}
    >
      {props.children}
    </div>
  );
};

Sidebar.propTypes = {
  asideWidth: PropTypes.string,
  mainMinWidth: PropTypes.string,
};
