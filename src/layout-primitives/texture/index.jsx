import React from 'react';

export const Texture = ({ texture, textureColor, textureSize, style, ...props }) => {
  style = {
    ...style,
    '--unitone--texture-color': '' !== textureColor ? textureColor : undefined,
    '--unitone--texture-size': '' !== textureSize ? textureSize : undefined,
  };

  return (
    <div
      data-unitone-layout={['texture', '' !== (texture ?? '') ? `-texture:${texture}` : undefined]
        .filter(Boolean)
        .join(' ')}
      style={style}
      {...props}
    >
      {props.children}
    </div>
  );
};
