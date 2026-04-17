import React from 'react';

export const Stack = ({
  gap,
  negative,
  revert,
  divider,
  dividerWidth,
  dividerStyle,
  dividerColor,
  tagName = 'div',
  style,
  ...props
}) => {
  const Tag = tagName;

  style = {
    ...style,
    '--unitone--divider-width': '' !== dividerWidth ? dividerWidth : undefined,
    '--unitone--divider-style': '' !== dividerStyle ? dividerStyle : undefined,
    '--unitone--divider-color': '' !== dividerColor ? dividerColor : undefined,
  };

  return (
    <Tag
      data-unitone-layout={[
        'stack',
        revert ? '-revert' : undefined,
        '' !== (divider ?? '') ? `-divider:${divider}` : undefined,
        '' !== (gap ?? '') ? `-gap:${gap}` : undefined,
        negative ? '-negative' : undefined,
      ]
        .filter(Boolean)
        .join(' ')}
      style={style}
      {...props}
    >
      {props.children}
    </Tag>
  );
};
