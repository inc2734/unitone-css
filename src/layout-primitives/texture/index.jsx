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
  textureBandTopSize,
  textureBandBottomSize,
  textureShapeTopLeftY,
  textureShapeBottomLeftY,
  textureShapeTopRightY,
  textureShapeBottomRightY,
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
    '--unitone--texture-band-top-size': '' !== textureBandTopSize ? textureBandTopSize : undefined,
    '--unitone--texture-band-bottom-size':
      '' !== textureBandBottomSize ? textureBandBottomSize : undefined,
    '--unitone--texture-shape-top-left-y':
      '' !== textureShapeTopLeftY ? textureShapeTopLeftY : undefined,
    '--unitone--texture-shape-bottom-left-y':
      '' !== textureShapeBottomLeftY ? textureShapeBottomLeftY : undefined,
    '--unitone--texture-shape-top-right-y':
      '' !== textureShapeTopRightY ? textureShapeTopRightY : undefined,
    '--unitone--texture-shape-bottom-right-y':
      '' !== textureShapeBottomRightY ? textureShapeBottomRightY : undefined,
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
