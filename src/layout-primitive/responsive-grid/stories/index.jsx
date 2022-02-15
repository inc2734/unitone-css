import React from 'react';
import readme from '../README.md';

import { ResponsiveGrid } from '../ResponsiveGrid';
import { Stack } from '../../stack/Stack';

export default {
  title: 'Layout Primitive/ResponsiveGrid',
  component: ResponsiveGrid,
  parameters: {
    notes: { readme },
  },
  argTypes: {
    columnMinWidth: {
      control: { type: 'text' },
      description: '`--column-min-width`',
      table: { defaultValue: { summary: '250px' } },
      type: { name: 'string', required: false },
    },
    gap: {
      control: { type: 'inline-radio' },
      description: '`--gap`',
      options: [-2, -1, 0, 1, 2, 3, 4],
      table: { defaultValue: { summary: 'var(--s2)' } },
      type: { name: 'number', required: false },
    },
  },
  args: {
    columnMinWidth: '250px',
    gap: 2,
  },
};

const content = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit';

export const Default = (args) => {
  return (
    <ResponsiveGrid {...args}>
      <Stack>
        <img src="https://placehold.jp/400x300.jpg" alt="" />
        <p>{content}</p>
      </Stack>
      <Stack>
        <img src="https://placehold.jp/400x300.jpg" alt="" />
        <p>{content}</p>
      </Stack>
      <Stack>
        <img src="https://placehold.jp/400x300.jpg" alt="" />
        <p>{content}</p>
      </Stack>
      <Stack>
        <img src="https://placehold.jp/400x300.jpg" alt="" />
        <p>{content}</p>
      </Stack>
      <Stack>
        <img src="https://placehold.jp/400x300.jpg" alt="" />
        <p>{content}</p>
      </Stack>
      <Stack>
        <img src="https://placehold.jp/400x300.jpg" alt="" />
        <p>{content}</p>
      </Stack>
    </ResponsiveGrid>
  );
};
