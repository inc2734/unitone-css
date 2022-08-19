import React from 'react';
import readme from '../README.md';

import { Decorator } from '../Decorator';
import { Stack } from '../../stack/Stack';

export default {
  title: 'Layout Primitives/Decorator',
  component: Decorator,
  parameters: {
    notes: { readme },
  },
  argTypes: {
    backgroundColor: {
      control: { type: 'color' },
      description: 'Background color. Set by CSS var `--unitone--background-color`.',
      table: { defaultValue: { summary: 'transparent' } },
      type: { name: 'string', required: false },
    },
    borderColor: {
      control: { type: 'color' },
      description: 'Border color. Set by CSS var `--unitone--border-color`.',
      table: { defaultValue: { summary: 'transparent' } },
      type: { name: 'string', required: false },
    },
    borderRadius: {
      control: { type: 'text' },
      description: 'Border radius. Set by CSS var `--unitone--border-radius`.',
      table: { defaultValue: { summary: '0' } },
      type: { name: 'string', required: false },
    },
    borderWidth: {
      control: { type: 'text' },
      description: 'Border width. Set by CSS var `--unitone--border-width`.',
      table: { defaultValue: { summary: '0' } },
      type: { name: 'string', required: false },
    },
    color: {
      control: { type: 'color' },
      description: 'Text color. Set by CSS var `--unitone--color`.',
      table: { defaultValue: { summary: 'inherit' } },
      type: { name: 'string', required: false },
    },
    padding: {
      control: { type: 'inline-radio' },
      description:
        'Padding. Set by CSS var `--unitone--padding` or `data-unitone-layout` attribute `-padding:x`.',
      options: [-2, -1, 0, 1, 2, 3, 4, 5, 6, 7],
      table: { defaultValue: { summary: 'var(--unitone--s0)' } },
      type: { name: 'number', required: false },
    },
    shadow: {
      control: { type: 'inline-radio' },
      description: 'With `box-shadow`.',
      options: [false, true],
      table: { defaultValue: { summary: false } },
      type: { name: 'boolean', required: false },
    },
    position: {
      control: { type: 'inline-radio' },
      description: 'The position value.',
      options: ['static', 'relative', 'absolute', 'sticky', 'fixed'],
      table: { defaultValue: { summary: 'static' } },
      type: { name: 'string', required: false },
    },
    top: {
      control: { type: 'text' },
      description: 'Offset top.',
      table: { defaultValue: { summary: 'initial' } },
      type: { name: 'string', required: false },
    },
    right: {
      control: { type: 'text' },
      description: 'Offset right.',
      table: { defaultValue: { summary: 'initial' } },
      type: { name: 'string', required: false },
    },
    bottom: {
      control: { type: 'text' },
      description: 'Offset bottom.',
      table: { defaultValue: { summary: 'initial' } },
      type: { name: 'string', required: false },
    },
    left: {
      control: { type: 'text' },
      description: 'Offset left.',
      table: { defaultValue: { summary: 'initial' } },
      type: { name: 'string', required: false },
    },
    zIndex: {
      control: { type: 'text' },
      description: 'z-index.',
      table: { defaultValue: { summary: 'initial' } },
      type: { name: 'string', required: false },
    },
  },
  args: {
    backgroundColor: 'transarent',
    borderColor: 'transparent',
    borderRadius: '0px',
    borderWidth: '0px',
    color: 'initial',
    padding: 0,
    shadow: false,
    position: 'static',
    top: 'initial',
    right: 'initial',
    bottom: 'initial',
    left: 'initial',
    zIndex: 'initial',
  },
};

const content =
  'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cill';

export const Default = (args) => {
  return (
    <Decorator {...args}>
      <p>{content}</p>
    </Decorator>
  );
};

export const ExampleShadow = (args) => {
  return (
    <Decorator {...args}>
      <p>{content}</p>
    </Decorator>
  );
};
ExampleShadow.storyName = 'Example : Shadow';
ExampleShadow.argTypes = {
  shadow: { table: { disable: true } },
};
ExampleShadow.args = {
  padding: 1,
  shadow: true,
};

export const ExampleCombobox = (args) => {
  return (
    <Decorator borderWidth={args.borderWidth} borderColor={args.backgroundColor}>
      <Decorator
        padding={args.padding}
        backgroundColor={args.backgroundColor}
        color="var(--unitone--color--white)"
      >
        Combo Box
      </Decorator>
      <Decorator padding={args.padding}>
        <p>{content}</p>
      </Decorator>
    </Decorator>
  );
};
ExampleCombobox.storyName = 'Example : Combobox';
ExampleCombobox.argTypes = {
  color: { table: { disable: true } },
  borderColor: { table: { disable: true } },
};
ExampleCombobox.args = {
  padding: -1,
  backgroundColor: '#000',
  borderWidth: '1px',
};

export const ExamplePosition = (args) => {
  return (
    <Decorator position="relative">
      <Stack>
        <Decorator backgroundColor="#000" color="#fff" padding={1}>
          {content}
        </Decorator>
        <Decorator {...args}>{content}</Decorator>
        <Decorator backgroundColor="#000" color="#fff" padding={1}>
          {content}
        </Decorator>
      </Stack>
    </Decorator>
  );
};
ExamplePosition.storyName = 'Example : Position';
ExamplePosition.args = {
  padding: -1,
  borderWidth: '1px',
  backgroundColor: 'rgba(255, 0, 0, .7)',
  position: 'absolute',
  top: '100px',
};
