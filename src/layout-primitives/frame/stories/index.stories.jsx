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
      description: 'Aspect ratio. Set by CSS var `--unitone--ratio`.',
      table: { defaultValue: { summary: '16/9' } },
      type: { name: 'string', required: false },
    },
    switchRatio: {
      control: { type: 'inline-radio' },
      description: 'When the orientation switches, the `--unitone--ratio` also switches.',
      options: [false, true],
      table: { defaultValue: { summary: false } },
      type: { name: 'boolean', required: false },
    },
  },
  args: {
    ratio: '16/9',
    switchRatio: false,
  },
};

export const Default = (args) => {
  return (
    <Frame {...args}>
      <img src="https://placehold.jp/400x300.jpg" alt="" />
    </Frame>
  );
};

export const Switch = (args) => {
  return (
    <Frame {...args}>
      <img src="https://placehold.jp/400x300.jpg" alt="" />
    </Frame>
  );
};
Switch.args = {
  switchRatio: true,
};
