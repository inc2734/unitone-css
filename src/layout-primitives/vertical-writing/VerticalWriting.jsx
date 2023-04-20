import React from 'react';

export const VerticalWriting = ({ textOrientation, gap, maxHeight, style, ...props }) => {
  style = {
    ...style,
    '--unitone--max-height': !!maxHeight ? maxHeight : undefined,
  };

  return (
    <div>
      <div
        data-unitone-layout={[
          'vertical-writing',
          'undefined' !== typeof textOrientation ? `-gap:${textOrientation}` : undefined,
          'undefined' !== typeof gap ? `-gap:${gap}` : undefined,
        ]
          .filter(Boolean)
          .join(' ')}
        style={style}
      >
        {props.children}
      </div>
    </div>
  );
};
