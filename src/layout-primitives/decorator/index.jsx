import React from 'react';

export const Decorator = ({
  backgroundColor,
  borderColor,
  borderRadius,
  borderWidth,
  maxHeight,
  color,
  padding,
  shadow,
  position,
  top,
  right,
  bottom,
  left,
  zIndex,
  overflow,
  backdropFilterBlur,
  backdropFilterBrightness,
  backdropFilterContrast,
  backdropFilterGrayscale,
  backdropFilterHueRotate,
  backdropFilterInvert,
  backdropFilterSepia,
  backdropFilterSatuation,
  style,
  ...props
}) => {
  style = {
    ...style,
    '--unitone--background-color': '' !== backgroundColor ? backgroundColor : undefined,
    '--unitone--border-color': '' !== borderColor ? borderColor : undefined,
    '--unitone--border-radius': '' !== borderRadius ? borderRadius : undefined,
    '--unitone--border-width': '' !== borderWidth ? borderWidth : undefined,
    '--unitone--max-height': '' !== maxHeight ? maxHeight : undefined,
    '--unitone--color': '' !== color ? color : undefined,
    '--unitone--top': '' !== top ? top : undefined,
    '--unitone--right': '' !== right ? right : undefined,
    '--unitone--bottom': '' !== bottom ? bottom : undefined,
    '--unitone--left': '' !== left ? left : undefined,
    '--unitone--z-index': '' !== zIndex ? zIndex : undefined,
    '--unitone--backdrop-filter-blur': '' !== backdropFilterBlur ? backdropFilterBlur : undefined,
    '--unitone--backdrop-filter-brightness':
      '' !== backdropFilterBrightness ? backdropFilterBrightness : undefined,
    '--unitone--backdrop-filter-contrast':
      '' !== backdropFilterContrast ? backdropFilterContrast : undefined,
    '--unitone--backdrop-filter-grayscale':
      '' !== backdropFilterGrayscale ? backdropFilterGrayscale : undefined,
    '--unitone--backdrop-filter-hue-rotate':
      '' !== backdropFilterHueRotate ? backdropFilterHueRotate : undefined,
    '--unitone--backdrop-filter-invert':
      '' !== backdropFilterInvert ? backdropFilterInvert : undefined,
    '--unitone--backdrop-filter-sepia':
      '' !== backdropFilterSepia ? backdropFilterSepia : undefined,
    '--unitone--backdrop-filter-saturate':
      '' !== backdropFilterSatuation ? backdropFilterSatuation : undefined,
  };

  return (
    <div
      data-unitone-layout={[
        'decorator',
        '' !== (padding ?? '') ? `-padding:${padding}` : undefined,
        shadow ? '-shadow' : undefined,
        '' !== (position ?? '') ? `-position:${position}` : undefined,
        '' !== (overflow ?? '') ? `-overflow:${overflow}` : undefined,
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
