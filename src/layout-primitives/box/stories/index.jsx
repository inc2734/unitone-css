import React from 'react';
import readme from '../README.md';

import { Box } from '../Box';

export default {
  title: 'Layout Primitives/Box',
  component: Box,
  parameters: {
    notes: { readme },
  },
  argTypes: {
    backgroundColor: {
      control: { type: 'color' },
      description: 'Background color. Set by CSS var `--background-color`.',
      table: { defaultValue: { summary: 'transparent' } },
      type: { name: 'string', required: false },
    },
    borderColor: {
      control: { type: 'color' },
      description: 'Border color. Set by CSS var `--border-color`.',
      table: { defaultValue: { summary: 'transparent' } },
      type: { name: 'string', required: false },
    },
    borderRadius: {
      control: { type: 'text' },
      description: 'Border radius. Set by CSS var `--border-radius`.',
      table: { defaultValue: { summary: '0' } },
      type: { name: 'string', required: false },
    },
    borderWidth: {
      control: { type: 'text' },
      description: 'Border width. Set by CSS var `--border-width`.',
      table: { defaultValue: { summary: '0' } },
      type: { name: 'string', required: false },
    },
    color: {
      control: { type: 'color' },
      description: 'Text color. Set by CSS var `--color`.',
      table: { defaultValue: { summary: 'initial' } },
      type: { name: 'string', required: false },
    },
    padding: {
      control: { type: 'inline-radio' },
      description: 'Padding. Set by CSS var `--padding` or `data-layout` attribute `-padding:x`.',
      options: [-2, -1, 0, 1, 2, 3, 4, 5, 6, 7],
      table: { defaultValue: { summary: 'var(--s1)' } },
      type: { name: 'number', required: false },
    },
  },
  args: {
    backgroundColor: 'transarent',
    borderColor: 'transparent',
    borderRadius: '0px',
    borderWidth: '0px',
    color: 'initial',
    padding: 1,
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
  padding: -1,
  backgroundColor: '#000',
  borderWidth: '1px',
};
