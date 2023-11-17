import React from 'react';

export const VerticalWriting = ({
  textOrientation,
  gap,
  maxHeight,
  switchWritingMode,
  style,
  ...props
}) => {
  style = {
    ...style,
    '--unitone--max-height': !!maxHeight ? maxHeight : undefined,
  };

  return (
    <div>
      <div
        data-unitone-layout={[
          'vertical-writing',
          'undefined' !== typeof textOrientation ? `-text-orientation:${textOrientation}` : undefined,
          'undefined' !== typeof gap ? `-gap:${gap}` : undefined,
          true === switchWritingMode ? `-switch` : undefined,
        ]
          .filter(Boolean)
          .join(' ')}
        style={style}
        {...props}
      >
        {props.children}
      </div>
    </div>
  );
};
