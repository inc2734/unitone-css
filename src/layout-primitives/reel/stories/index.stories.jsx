import React from 'react';
import readme from '../README.md';

import { Reel } from '../';
import { Decorator } from '../../decorator';
import { Stack } from '../../stack';

export default {
  title: 'Layout Primitives/Reel',
  component: Reel,
  parameters: {
    notes: { readme },
  },
  argTypes: {
    gap: {
      control: { type: 'inline-radio' },
      description:
        'Gap. Set by CSS var `--unitone--gap` or `data-unitone-layout` attribute `-gap:x`.',
      options: [-2, -1, 0, 1, 2, 3, 4, 5, 6, 7],
      table: { defaultValue: { summary: 'var(--unitone--global--gap)' } },
      type: { name: 'number', required: false },
    },
    height: {
      control: { type: 'text' },
      description: 'Height. Set by CSS var `--unitone--height`.',
      table: { defaultValue: { summary: 'auto' } },
      type: { name: 'string', required: false },
    },
    itemWidth: {
      control: { type: 'text' },
      description: 'Each items width. Set by CSS var `--unitone--item-width`.',
      table: { defaultValue: { summary: 'calc(var(--unitone--measure) / 2)' } },
      type: { name: 'string', required: false },
    },
    noBar: {
      control: { type: 'inline-radio' },
      description: 'Remove scrollbar.',
      options: [false, true],
      table: { defaultValue: { summary: 'false' } },
      type: { name: 'boolean', required: false },
    },
  },
  args: {
    gap: 2,
    height: 'auto',
    itemWidth: 'calc(var(--unitone--measure) / 2)',
    noBar: false,
  },
};

export const Default = (args) => {
  return (
    <Reel {...args}>
      <Decorator backgroundColor="#eee" padding={1}>
        <Stack>
          <img src="https://placehold.jp/400x300.jpg" alt="" />
          <p>Lorem ipsum dolor sit amet</p>
        </Stack>
      </Decorator>
      <Decorator backgroundColor="#eee" padding={1}>
        <Stack>
          <img src="https://placehold.jp/400x300.jpg" alt="" />
          <p>consectetur adipisicing elit</p>
        </Stack>
      </Decorator>
      <Decorator backgroundColor="#eee" padding={1}>
        <Stack>
          <img src="https://placehold.jp/400x300.jpg" alt="" />
          <p>sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
        </Stack>
      </Decorator>
      <Decorator backgroundColor="#eee" padding={1}>
        <Stack>
          <img src="https://placehold.jp/400x300.jpg" alt="" />
          <p>Ut enim ad minim veniam</p>
        </Stack>
      </Decorator>
    </Reel>
  );
};
