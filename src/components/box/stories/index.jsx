import React from 'react';

import { Box } from '../Box';

export default {
  title: 'Components/Box',
  component: Box,
  argTypes: {
    padding: {
      options: [ -1, 0, 1, 2, 3, 4, 5, 6, 7, 8 ],
      control: { type: 'select' },
    },
  },
  args: {
    padding: 0,
    borderWidth: '0',
  }
};

const Template = (args) => <Box { ...args }>
  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cill</p>
</Box>;

export const Default = Template.bind({});
