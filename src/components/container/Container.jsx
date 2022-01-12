import React from 'react';

export const Container = ({
  maxWidth,
  ...props
}) => {
  const style = {
    '--container--max-width': !! maxWidth ? maxWidth : undefined,
  };

  return (
    <div
      data-layout="container"
      style={ style }
    >
      { props.children }
    </div>
  );
};
