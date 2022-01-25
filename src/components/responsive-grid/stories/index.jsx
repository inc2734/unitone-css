import React from 'react';

import { ResponsiveGrid } from '../ResponsiveGrid';
import { Stack } from '../../stack/Stack';

export default {
  title: 'Components/ResponsiveGrid',
  component: ResponsiveGrid,
  argTypes: {
    gap: {
      options: [-2, -1, 0, 1, 2, 3, 4],
      control: { type: 'inline-radio' },
    },
  },
  args: {
    gap: 1,
    columnMinWidth: '250px',
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
