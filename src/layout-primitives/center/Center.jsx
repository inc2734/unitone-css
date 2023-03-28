import React from 'react';

export const Center = ({ intrinsic, withText, maxWidth, style, ...props }) => {
  style = {
    ...style,
    '--unitone--max-width': !!maxWidth ? maxWidth : undefined,
  };

  return (
    <div
      data-unitone-layout={[
        'center',
        true === intrinsic ? `-intrinsic` : undefined,
        true === withText ? `-with-text` : undefined
      ]
        .filter(Boolean)
        .join(' ')}
      style={style}
    >
      {props.children}
    </div>
  );
};
