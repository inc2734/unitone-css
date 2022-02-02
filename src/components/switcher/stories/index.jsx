import React from 'react';
import readme from '../README.md';

import { Switcher } from '../Switcher';
import { Box } from '../../box/Box';

export default {
  title: 'Components/Switcher',
  component: Switcher,
  parameters: {
    notes: { readme },
  },
  argTypes: {
    gap: {
      control: { type: 'inline-radio' },
      description: '`--switcher--gap`',
      options: [-2, -1, 0, 1, 2, 3, 4],
      table: { defaultValue: { summary: 'var(--s2)' } },
      type: { name: 'number', required: false },
    },
    limit: {
      control: { type: 'inline-radio' },
      options: [3, 4, 5],
      type: { name: 'number', required: false },
    },
    threshold: {
      control: { type: 'inline-radio' },
      description: '`--switcher--threshold`',
      table: { defaultValue: { summary: 'var(--measure)' } },
      type: { name: 'string', required: false },
    },
  },
  args: {
    gap: 2,
    threshold: 'var(--measure)',
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
      <Box backgroundColor="#bfb6a8" style={{ '--switcher__item--grow': 2 }}>
        dolor sit
      </Box>
      <Box backgroundColor="#edede6">amet consectetur</Box>
    </Switcher>
  );
};
CustomizeItemSize.storyName = 'Example : Customize item size';
