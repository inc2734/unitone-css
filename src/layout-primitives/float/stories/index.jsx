import React from 'react';
import readme from '../README.md';

import { Float } from '../Float';

export default {
  title: 'Layout Primitives/Float',
  component: Float,
  parameters: {
    notes: { readme },
  },
  argTypes: {
    gap: {
      control: { type: 'inline-radio' },
      description: 'Gap between items. Set by CSS var `--gap` or `data-layout` attribute `-gap:x`.',
      options: [-2, -1, 0, 1, 2, 3, 4, 5, 6, 7],
      table: { defaultValue: { summary: 'var(--s1)' } },
      type: { name: 'number', required: false },
    },
    minMeasure: {
      control: { type: 'text' },
      description:
        'Min size of the item following the floating item. Set by CSS var `--min-measure`.',
      table: { defaultValue: { summary: 'calc(var(--measure) / 2)' } },
      type: { name: 'string', required: false },
    },
    minWidth: {
      control: { type: 'text' },
      description: 'Min size of the floating item. Set by CSS var `--min-width`.',
      table: { defaultValue: { summary: 'calc(var(--measure) / 2)' } },
      type: { name: 'string', required: false },
    },
    position: {
      control: { type: 'inline-radio' },
      description:
        'The floating item position. Set by `data-layout` attribute `-right` or `-left`.',
      options: ['left', 'right'],
      table: { defaultValue: { summary: 'left' } },
      type: { name: 'string', required: false },
    },
  },
  args: {
    gap: 1,
    minMeasure: 'calc(var(--measure) / 2)',
    minWidth: 'calc(var(--measure) / 2)',
    position: 'left',
  },
};

const content =
  'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cill';

export const Default = (args) => {
  return (
    <>
      <Float {...args}>
        <img src="https://placehold.jp/400x300.jpg" alt="" />
      </Float>
      <p>{content}</p>
    </>
  );
};

export const ExampleRight = (args) => {
  return (
    <>
      <Float {...args}>
        <img src="https://placehold.jp/400x300.jpg" alt="" />
      </Float>
      <p>{content}</p>
    </>
  );
};
ExampleRight.storyName = 'Example : Right';
ExampleRight.args = {
  position: 'right',
};
