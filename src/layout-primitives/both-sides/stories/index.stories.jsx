import React from 'react';
import readme from '../README.md';

import { BothSides } from '../';

const meta = {
  title: 'Layout Primitives/BothSides',
  component: BothSides,
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
    alignItems: {
      control: { type: 'inline-radio' },
      description: '`--unitone--align-items`',
      description:
        'Alignment of the row direction. Set by CSS var `--unitone--align-items` or `data-unitone-layout` attribute `-align-items:x`.',
      options: ['Default', 'start', 'center', 'end'],
      table: { defaultValue: { summary: 'start' } },
      type: { name: 'string', required: false },
    },
  },
  args: {
    gap: 2,
    alignItems: 'start',
  },
};
export default meta;

export const Default = (args) => {
  return (
    <BothSides {...args}>
      <p>Lorem ipsum dolor sit amet</p>
      <ul>
        <li>Lorem</li>
        <li>ipsum</li>
        <li>dolor</li>
      </ul>
    </BothSides>
  );
};
