import React from 'react';
import readme from '../README.md';

import { Frame } from '../Frame';

export default {
  title: 'Layout Primitives/Frame',
  component: Frame,
  parameters: {
    notes: { readme },
  },
  argTypes: {
    ratio: {
      control: { type: 'text' },
      description: 'Aspect ratio. Set by CSS var `--ratio`.',
      table: { defaultValue: { summary: '16/9' } },
      type: { name: 'string', required: false },
    },
  },
  args: {
    ratio: '16/9',
  },
};

export const Default = (args) => {
  return (
    <Frame {...args}>
      <img src="https://placehold.jp/400x300.jpg" alt="" />
    </Frame>
  );
};
