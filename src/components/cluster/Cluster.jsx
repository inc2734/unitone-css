import React from 'react';
import PropTypes from 'prop-types';

export const Cluster = ({
  gap,
  justify,
  align,
  ...props
}) => {
  return (
    <div
      data-layout={ [
        'cluster',
        !! gap ? `cluster--gap:${ gap }` : undefined,
        !! justify ? `cluster--justify:${ justify }` : undefined,
        !! align ? `cluster--align:${ align }` : undefined,
      ].join( ' ' ).trim() }
    >
      { props.children }
    </div>
  );
};

Cluster.propTypes = {
  gap: PropTypes.number,
  justify: PropTypes.string,
  align: PropTypes.string,
};
