import React from 'react';
import readme from '../README.md';

import { Position } from '../Position';
import { Box } from '../../box/Box';
import { Stack } from '../../stack/Stack';

export default {
  title: 'Layout Primitives/Position',
  component: Position,
  parameters: {
    notes: { readme },
  },
  argTypes: {
    position: {
      control: { type: 'inline-radio' },
      description: 'The position value.',
      options: ['static', 'relative', 'absolute', 'sticky', 'fixed'],
      table: { defaultValue: { summary: 'left' } },
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
    <Stack>
      <Box backgroundColor="#000" color="#fff">
        {content}
      </Box>
      <Position {...args}>{content}</Position>
      <Box backgroundColor="#000" color="#fff">
        {content}
      </Box>
    </Stack>
  );
};
