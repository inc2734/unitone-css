import React from 'react';
import readme from '../README.md';

import { Cluster } from '../Cluster';

export default {
  title: 'Layout Primitives/Cluster',
  component: Cluster,
  parameters: {
    notes: { readme },
  },
  argTypes: {
    alignItems: {
      control: { type: 'inline-radio' },
      description: '`--align-items`',
      description:
        'Alignment of the row direction. Set by CSS var `--align-items` or `data-layout` attribute `-align-items:x`.',
      options: ['start', 'center', 'end'],
      table: { defaultValue: { summary: 'flex-start' } },
      type: { name: 'string', required: false },
    },
    gap: {
      control: { type: 'inline-radio' },
      description: 'Gap. Set by CSS var `--gap` or `data-layout` attribute `-gap:x`.',
      options: [-2, -1, 0, 1, 2, 3, 4, 5, 6, 7],
      table: { defaultValue: { summary: 'var(--s1)' } },
      type: { name: 'number', required: false },
    },
    justifyContent: {
      control: { type: 'inline-radio' },
      description:
        'Alignment of the column direction. Set by CSS var `--justify-content` or `data-layout` attribute `-justify-content:x`.',
      options: ['start', 'center', 'end', 'space-between'],
      table: { defaultValue: { summary: 'flex-start' } },
      type: { name: 'string', required: false },
    },
    tagName: {
      table: { disable: true },
    },
  },
  args: {
    alignItems: 'start',
    gap: 1,
    justifyContent: 'start',
  },
};

export const Default = (args) => {
  return (
    <Cluster tagName="ul" {...args}>
      <li>Lorem ipsum</li>
      <li>dolor sit</li>
      <li>amet consectetur</li>
      <li>adipisicing elit</li>
      <li>sed do</li>
    </Cluster>
  );
};

export const ExampleHeader = (args) => {
  return (
    <Cluster gap={args.gap} justifyContent="space-between" alignItems="center">
      <div>LOGO</div>
      <Cluster tagName="ul" gap={args.gap}>
        <li>Lorem ipsum</li>
        <li>dolor sit</li>
        <li>amet consectetur</li>
        <li>adipisicing elit</li>
        <li>sed do</li>
      </Cluster>
    </Cluster>
  );
};
ExampleHeader.storyName = 'Example : Header';
ExampleHeader.argTypes = {
  justifyContent: { table: { disable: true } },
  alignItems: { table: { disable: true } },
};
