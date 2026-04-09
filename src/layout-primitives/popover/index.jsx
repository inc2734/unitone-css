import React from 'react';

export const Popover = ({ gap, tagName = 'div', style, ...props }) => {
  const Tag = tagName;

  style = {
    ...style,
  };

  return (
    <Tag
      data-unitone-layout={['popover', '' !== (gap ?? '') ? `-gap:${gap}` : undefined]
        .filter(Boolean)
        .join(' ')}
      style={style}
      {...props}
    >
      {props.children}
    </Tag>
  );
};

export const PopoverTrigger = ({ tagName = 'div', style, ...props }) => {
  const Tag = tagName;

  style = {
    ...style,
  };

  return (
    <Tag data-unitone-layout="popover-trigger" style={style} {...props}>
      {props.children}
    </Tag>
  );
};

export const PopoverContent = ({ placement, tagName = 'div', style, ...props }) => {
  const Tag = tagName;

  style = {
    ...style,
  };

  return (
    <Tag
      data-unitone-layout={[
        'popover-content',
        '' !== (placement ?? '') ? `-placement:${placement}` : undefined,
      ]
        .filter(Boolean)
        .join(' ')}
      popover={props.popover || 'auto'}
      style={style}
      {...props}
    >
      {props.children}
    </Tag>
  );
};

export const PopoverDialog = ({ tagName = 'div', style, ...props }) => {
  const Tag = tagName;

  style = {
    ...style,
  };

  return (
    <Tag data-unitone-layout="popover-dialog" style={style} {...props}>
      {props.children}
    </Tag>
  );
};
