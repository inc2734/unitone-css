import React from 'react';

export const Texture = ({
  texture,
  textureColor,
  textureGap,
  textureSize,
  textureTop,
  textureRight,
  textureBottom,
  textureLeft,
  textureBorderRadius,
  textureBorderTopLeftRadius,
  textureBorderTopRightRadius,
  textureBorderBottomLeftRadius,
  textureBorderBottomRightRadius,
  style,
  ...props
}) => {
  style = {
    ...style,
    '--unitone--texture-color': '' !== textureColor ? textureColor : undefined,
    '--unitone--texture-gap': '' !== textureGap ? textureGap : undefined,
    '--unitone--texture-size': '' !== textureSize ? textureSize : undefined,
    '--unitone--texture-top': '' !== textureTop ? textureTop : undefined,
    '--unitone--texture-right': '' !== textureRight ? textureRight : undefined,
    '--unitone--texture-bottom': '' !== textureBottom ? textureBottom : undefined,
    '--unitone--texture-left': '' !== textureLeft ? textureLeft : undefined,
    '--unitone--texture-border-radius':
      '' !== textureBorderRadius ? textureBorderRadius : undefined,
    '--unitone--texture-border-top-left-radius':
      '' !== textureBorderTopLeftRadius ? textureBorderTopLeftRadius : undefined,
    '--unitone--texture-border-top-right-radius':
      '' !== textureBorderTopRightRadius ? textureBorderTopRightRadius : undefined,
    '--unitone--texture-border-bottom-left-radius':
      '' !== textureBorderBottomLeftRadius ? textureBorderBottomLeftRadius : undefined,
    '--unitone--texture-border-bottom-right-radius':
      '' !== textureBorderBottomRightRadius ? textureBorderBottomRightRadius : undefined,
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
