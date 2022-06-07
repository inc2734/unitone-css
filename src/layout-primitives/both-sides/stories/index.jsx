import React from 'react';
import readme from '../README.md';

import { BothSides } from '../BothSides';

export default {
  title: 'Layout Primitives/BothSides',
  component: BothSides,
  parameters: {
    notes: { readme },
  },
  argTypes: {
    gap: {
      control: { type: 'inline-radio' },
      description: 'Gap. Set by CSS var `--unitone--gap` or `data-layout` attribute `-gap:x`.',
      options: [-2, -1, 0, 1, 2, 3, 4, 5, 6, 7],
      table: { defaultValue: { summary: 'var(--unitone--s1)' } },
      type: { name: 'number', required: false },
    },
    alignItems: {
      control: { type: 'inline-radio' },
      description: '`--unitone--align-items`',
      description:
        'Alignment of the row direction. Set by CSS var `--unitone--align-items` or `data-layout` attribute `-align-items:x`.',
      options: ['start', 'center', 'end'],
      table: { defaultValue: { summary: 'start' } },
      type: { name: 'string', required: false },
    },
  },
  args: {
    gap: 1,
    alignItems: 'start',
  },
};

const content =
  'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.';

export const Default = (args) => {
  return (
    <BothSides {...args}>
      <p>{content}</p>
      <ul>
        <li>Lorem</li>
        <li>ipsum</li>
        <li>dolor</li>
      </ul>
    </BothSides>
  );
};
