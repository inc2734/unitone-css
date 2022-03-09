import React from 'react';
import readme from '../README.md';

import { Center } from '../Center';
import { Stack } from '../../stack/Stack';

export default {
  title: 'Layout Primitives/Center',
  component: Center,
  parameters: {
    notes: { readme },
  },
  argTypes: {
    withText: {
      control: { type: 'inline-radio' },
      description: 'Centering with text. Set by `data-layout` attribute `-with-text`.',
      options: [false, true],
      table: { defaultValue: { summary: false } },
      type: { name: 'boolean', required: false },
    },
  },
  args: {
    withText: false,
  },
};

export const Default = (args) => {
  return (
    <Stack>
      <Center {...args}>Lorem ipsum dolor sit amet, consectetur adipisicing elit</Center>
      <Center {...args}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
        ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
        voluptate velit esse cill
      </Center>
    </Stack>
  );
};
