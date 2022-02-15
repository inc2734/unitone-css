import React from 'react';

export const Switcher = ({ gap, limit, threshold, style, ...props }) => {
  style = {
    ...style,
    '--threshold': !!threshold ? threshold : undefined,
  };

  return (
    <div
      data-layout={[
        'switcher',
        'undefined' !== typeof gap ? `switcher--gap:${gap}` : undefined,
        'undefined' !== typeof limit ? `switcher--limit:${limit}` : undefined,
      ]
        .filter(Boolean)
        .join(' ')}
      style={style}
    >
      {props.children}
    </div>
  );
};
