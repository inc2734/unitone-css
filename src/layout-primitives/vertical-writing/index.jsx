'use client';

import React from 'react';
import { useLayoutBehaviors } from '../../use-layout-behaviors';

export const VerticalWriting = React.forwardRef(function VerticalWriting(
  { textOrientation, gap, maxHeight, switchWritingMode, threshold, queryContext, style, ...props },
  forwardedRef,
) {
  const layoutRef = useLayoutBehaviors({ vertical: true }, forwardedRef);
  style = {
    ...style,
    '--unitone--max-height': '' !== maxHeight ? maxHeight : undefined,
    '--unitone--threshold': '' !== threshold ? threshold : undefined,
  };

  return (
    <div data-unitone-layout="vertical-writing-wrapper">
      <div
        data-unitone-layout={[
          'vertical-writing',
          '' !== (textOrientation ?? '') ? `-text-orientation:${textOrientation}` : undefined,
          '' !== (gap ?? '') ? `-gap:${gap}` : undefined,
          switchWritingMode ? '-switch' : undefined,
          'container' === queryContext ? '@container' : undefined,
        ]
          .filter(Boolean)
          .join(' ')}
        style={style}
        {...props}
        ref={layoutRef}
        data-unitone-react-layout=""
      >
        {props.children}
      </div>
    </div>
  );
});
