import React from 'react';

import { Switcher } from '../Switcher';
import { Box } from '../../box/Box';

export default {
  title: 'Components/Switcher',
  component: Switcher,
  argTypes: {
    gap: {
      options: [-2, -1, 0, 1, 2, 3, 4],
      control: { type: 'inline-radio' },
    },
    limit: {
      options: [3, 4, 5],
      control: { type: 'inline-radio' },
    },
  },
  args: {
    gap: 2,
    threshold: 'var(--measure)',
    limit: 4,
  },
};

export const Default = (args) => {
  return (
    <Switcher {...args}>
      <Box backgroundColor="#decc00">Lorem ipsum</Box>
      <Box backgroundColor="#bfb6a8">dolor sit</Box>
      <Box backgroundColor="#edede6">amet consectetur</Box>
    </Switcher>
  );
};

export const CustomizeItemSize = (args) => {
  return (
    <Switcher {...args}>
      <Box backgroundColor="#decc00">Lorem ipsum</Box>
      <Box backgroundColor="#bfb6a8" style={{ '--switcher--item-size': 2 }}>
        dolor sit
      </Box>
      <Box backgroundColor="#edede6">amet consectetur</Box>
    </Switcher>
  );
};
CustomizeItemSize.storyName = 'Example : Customize item size';
