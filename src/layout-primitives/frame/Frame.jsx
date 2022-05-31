import React from 'react';

export const Frame = ({ ratio, switchRatio, style, ...props }) => {
  style = {
    ...style,
    '--ratio': !!ratio ? ratio : undefined,
  };

  return (
    <div
      data-layout={['frame', true === switchRatio ? `-switch` : undefined]
        .filter(Boolean)
        .join(' ')}
      style={style}
    >
      {props.children}
    </div>
  );
};
