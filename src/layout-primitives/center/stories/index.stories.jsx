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
    intrinsic: {
      control: { type: 'inline-radio' },
      description: 'Intrinsic centering. Set by `data-unitone-layout` attribute `-intrinsic`.',
      options: [false, true],
      table: { defaultValue: { summary: false } },
      type: { name: 'boolean', required: false },
    },
    withText: {
      control: { type: 'inline-radio' },
      description: 'Centering with text. Set by `data-unitone-layout` attribute `-with-text`.',
      options: [false, true],
      table: { defaultValue: { summary: false } },
      type: { name: 'boolean', required: false },
    },
    gutters: {
      control: { type: 'inline-radio' },
      description:
        'Gutters. Set by CSS var `--unitone--gutters` or `data-unitone-layout` attribute `-gutters:x`.',
      options: [undefined, 0, 1, 2, 3, 4, 5, 6, 7, 'root'],
      table: { defaultValue: { summary: 'var(--unitone--global--gutters)' } },
      type: { name: 'number', required: false },
    },
    maxWidth: {
      control: { type: 'text' },
      description: 'Max width. Set by CSS var `--unitone--max-width`.',
      table: { defaultValue: { summary: '1280px' } },
      type: { name: 'string', required: false },
    },
  },
  args: {
    intrinsic: false,
    withText: false,
    gutters: undefined,
    maxWidth: undefined,
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
