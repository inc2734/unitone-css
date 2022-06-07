import React from 'react';

export const Center = ({ withText, style, ...props }) => {
  style = {
    ...style,
  };

  return (
    <div
      data-unitone-layout={['center', true === withText ? `-with-text` : undefined]
        .filter(Boolean)
        .join(' ')}
      style={style}
    >
      {props.children}
    </div>
  );
};
