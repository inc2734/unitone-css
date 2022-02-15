import React from 'react';
import readme from '../README.md';

import { Box } from '../Box';

export default {
  title: 'Layout Primitive/Box',
  component: Box,
  parameters: {
    notes: { readme },
  },
  argTypes: {
    backgroundColor: {
      control: { type: 'color' },
      description: '`--background-color`',
      table: { defaultValue: { summary: 'transparent' } },
      type: { name: 'string', required: false },
    },
    borderColor: {
      control: { type: 'color' },
      description: '`--border-color`',
      table: { defaultValue: { summary: 'transparent' } },
      type: { name: 'string', required: false },
    },
    borderRadius: {
      control: { type: 'text' },
      description: '`--border-radius`',
      table: { defaultValue: { summary: '0' } },
      type: { name: 'string', required: false },
    },
    borderWidth: {
      control: { type: 'text' },
      description: '`--border-width`',
      table: { defaultValue: { summary: '0' } },
      type: { name: 'string', required: false },
    },
    color: {
      control: { type: 'color' },
      description: '`--color`',
      table: { defaultValue: { summary: 'initial' } },
      type: { name: 'string', required: false },
    },
    padding: {
      control: { type: 'inline-radio' },
      description: '`--padding`',
      options: [-2, -1, 0, 1, 2, 3, 4],
      table: { defaultValue: { summary: 'var(--s2)' } },
      type: { name: 'number', required: false },
    },
  },
  args: {
    backgroundColor: 'transarent',
    borderColor: 'transparent',
    borderRadius: '0px',
    borderWidth: '0px',
    color: 'initial',
    padding: 2,
  },
};

const content =
  'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cill';

export const Default = (args) => {
  return (
    <Box {...args}>
      <p>{content}</p>
    </Box>
  );
};

export const ExampleCombobox = (args) => {
  return (
    <Box padding={0} borderWidth={args.borderWidth} borderColor={args.backgroundColor}>
      <Box padding={args.padding} backgroundColor={args.backgroundColor} color="var(--color-white)">
        Combo Box
      </Box>
      <Box padding={args.padding}>
        <p>{content}</p>
      </Box>
    </Box>
  );
};
ExampleCombobox.storyName = 'Example : Combobox';
ExampleCombobox.argTypes = {
  color: { table: { disable: true } },
  borderColor: { table: { disable: true } },
};
ExampleCombobox.args = {
  padding: 1,
  backgroundColor: '#000',
  borderWidth: '1px',
};
