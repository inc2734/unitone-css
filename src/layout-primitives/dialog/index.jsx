import React from 'react';

export const Dialog = ({ tagName = 'div', style, ...props }) => {
  const Tag = tagName;

  style = {
    ...style,
  };

  return (
    <Tag data-unitone-layout="dialog" style={style} {...props}>
      {props.children}
    </Tag>
  );
};

export const DialogTrigger = ({ tagName = 'div', style, ...props }) => {
  const Tag = tagName;

  style = {
    ...style,
  };

  return (
    <Tag data-unitone-layout="dialog-trigger" style={style} {...props}>
      {props.children}
    </Tag>
  );
};

export const DialogContent = ({ closedBy = 'any', style, ...props }) => {
  style = {
    ...style,
  };

  return (
    <dialog data-unitone-layout="dialog-content" closedby={closedBy} style={style} {...props}>
      {props.children}
    </dialog>
  );
};
