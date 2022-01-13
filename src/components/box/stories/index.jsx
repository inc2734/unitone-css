import React from 'react';

import { Box } from '../Box';

export default {
  title: 'Components/Box',
  component: Box,
  argTypes: {
    padding: {
      options: [-2, -1, 0, 1, 2, 3, 4],
      control: { type: 'select' },
    },
  },
  args: {
    padding: 1,
    borderWidth: '0',
    borderRadius: '0',
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
    <Box padding="0" borderWidth={args.borderWidth} borderColor={args.backgroundColor}>
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
