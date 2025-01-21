import React from 'react';

export const VerticalWriting = ({
  textOrientation,
  gap,
  maxHeight,
  switchWritingMode,
  threshold,
  style,
  ...props
}) => {
  style = {
    ...style,
    '--unitone--max-height': '' !== maxHeight ? maxHeight : undefined,
    '--unitone--threshold': '' !== threshold ? threshold : undefined,
  };

  return (
    <div>
      <div
        data-unitone-layout={[
          'vertical-writing',
          '' !== (textOrientation ?? '') ? `-text-orientation:${textOrientation}` : undefined,
          '' !== (gap ?? '') ? `-gap:${gap}` : undefined,
          switchWritingMode ? '-switch' : undefined,
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
