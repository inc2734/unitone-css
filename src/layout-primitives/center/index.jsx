import React from 'react';

export const Center = ({ intrinsic, withText, gutters, maxWidth, style, ...props }) => {
  style = {
    ...style,
    '--unitone--max-width': '' !== maxWidth ? maxWidth : undefined,
  };

  return (
    <div
      data-unitone-layout={[
        'center',
        true === withText ? `-with-text` : undefined,
        '' !== (gutters ?? '') ? `-gutters:${gutters}` : undefined,
      ]
        .filter(Boolean)
        .join(' ')}
      style={style}
      {...props}
    >
      {props.children}
    </div>
  );
};
