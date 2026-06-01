import React from 'react';

export const Divider = ({ dividerColor, type, dividerSize, direction, style, ...props }) => {
  style = {
    ...style,
    '--unitone--divider-color': '' !== dividerColor ? dividerColor : undefined,
    '--unitone--divider-size': '' !== dividerSize ? dividerSize : undefined,
  };

  return (
    <div
      data-unitone-layout={[
        'divider',
        '' !== (type ?? '') ? `-type:${type}` : undefined,
        '' !== (direction ?? '') ? `-direction:${direction}` : undefined,
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
