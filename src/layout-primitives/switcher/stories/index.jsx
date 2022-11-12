import React from 'react';
import readme from '../README.md';

import { Switcher } from '../Switcher';
import { Decorator } from '../../decorator/Decorator';

export default {
  title: 'Layout Primitives/Switcher',
  component: Switcher,
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
    threshold: {
      control: { type: 'text' },
      description:
        'If the box size is smaller than this value, it switches to one column. Set by CSS var `--unitone--threshold`.',
      table: { defaultValue: { summary: 'var(--unitone--measure)' } },
      type: { name: 'string', required: false },
    },
  },
  args: {
    gap: 2,
    threshold: 'var(--unitone--measure)',
  },
};

export const Default = (args) => {
  return (
    <Switcher {...args}>
      <Decorator backgroundColor="#decc00" padding={1}>
        Lorem ipsum
      </Decorator>
      <Decorator backgroundColor="#bfb6a8" padding={1}>
        dolor sit
      </Decorator>
      <Decorator backgroundColor="#edede6" padding={1}>
        amet consectetur
      </Decorator>
    </Switcher>
  );
};
