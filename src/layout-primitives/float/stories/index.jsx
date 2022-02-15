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
      control: { type: 'text' },
      description: '`--gap`',
      table: { defaultValue: { summary: 'var(--s2)' } },
      type: { name: 'string', required: false },
    },
    minMeasure: {
      control: { type: 'text' },
      description: '`--min-measure`',
      table: { defaultValue: { summary: 'calc(var(--measure) / 2)' } },
      type: { name: 'string', required: false },
    },
    minWidth: {
      control: { type: 'text' },
      description: '`--min-width`',
      table: { defaultValue: { summary: 'calc(var(--measure) / 2)' } },
      type: { name: 'string', required: false },
    },
    position: {
      table: { disable: true },
    },
  },
  args: {
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
