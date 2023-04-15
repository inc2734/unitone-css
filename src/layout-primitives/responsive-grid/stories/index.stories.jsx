import React from 'react';
import readme from '../README.md';

import { ResponsiveGrid } from '../ResponsiveGrid';
import { Stack } from '../../stack/Stack';

export default {
  title: 'Layout Primitives/ResponsiveGrid',
  component: ResponsiveGrid,
  parameters: {
    notes: { readme },
  },
  argTypes: {
    columnMinWidth: {
      control: { type: 'text' },
      description: 'Min width of each columns. Set by CSS var `--unitone--column-min-width`.',
      table: { defaultValue: { summary: '250px' } },
      type: { name: 'string', required: false },
    },
    gap: {
      control: { type: 'inline-radio' },
      description: 'Gap. Set by CSS var `--unitone--gap`.',
      options: [-2, -1, 0, 1, 2, 3, 4, 5, 6, 7],
      table: { defaultValue: { summary: 'var(--unitone--global--gap)' } },
      type: { name: 'number', required: false },
    },
    autoRepeat: {
      control: { type: 'inline-radio' },
      description: 'The auto-repeat. Set by CSS var `--unitone--auto-repeat`.',
      options: ['auto-fill', 'auto-fit'],
      table: { defaultValue: { summary: 'auto-fill' } },
      type: { name: 'string', required: false },
    },
  },
  args: {
    columnMinWidth: '250px',
    gap: 2,
    autoRepeat: 'auto-fill',
  },
};

const content = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit';

export const Default = (args) => {
  return (
    <ResponsiveGrid {...args}>
      <Stack gap={-2}>
        <img src="https://placehold.jp/400x300.jpg" alt="" />
        <p>{content}</p>
      </Stack>
      <Stack gap={-2}>
        <img src="https://placehold.jp/400x300.jpg" alt="" />
        <p>{content}</p>
      </Stack>
      <Stack gap={-2}>
        <img src="https://placehold.jp/400x300.jpg" alt="" />
        <p>{content}</p>
      </Stack>
      <Stack gap={-2}>
        <img src="https://placehold.jp/400x300.jpg" alt="" />
        <p>{content}</p>
      </Stack>
      <Stack gap={-2}>
        <img src="https://placehold.jp/400x300.jpg" alt="" />
        <p>{content}</p>
      </Stack>
      <Stack gap={-2}>
        <img src="https://placehold.jp/400x300.jpg" alt="" />
        <p>{content}</p>
      </Stack>
    </ResponsiveGrid>
  );
};
