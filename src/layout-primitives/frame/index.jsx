import React from 'react';

export const Frame = ({ ratio, switchRatio, style, ...props }) => {
  style = {
    ...style,
    '--unitone--ratio': !!ratio ? ratio : undefined,
  };

  return (
    <div
      data-unitone-layout={['frame', true === switchRatio ? `-switch` : undefined]
        .filter(Boolean)
        .join(' ')}
      style={style}
      {...props}
    >
      {props.children}
    </div>
  );
};
