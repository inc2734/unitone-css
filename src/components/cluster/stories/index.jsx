import React from 'react';

import { Cluster } from '../Cluster';

export default {
  title: 'Components/Cluster',
  component: Cluster,
  argTypes: {
    gap: {
      options: [-2, -1, 0, 1, 2, 3, 4],
      control: { type: 'inline-radio' },
    },
    justify: {
      options: ['start', 'center', 'end', 'space-between'],
      control: { type: 'inline-radio' },
    },
    align: {
      options: ['start', 'center', 'end'],
      control: { type: 'inline-radio' },
    },
  },
  args: {
    gap: 1,
    justify: 'start',
    align: 'start',
  },
};

export const Default = (args) => {
  return (
    <Cluster {...args}>
      <p>Lorem ipsum</p>
      <p>dolor sit</p>
      <p>amet consectetur</p>
      <p>adipisicing elit</p>
      <p>sed do</p>
    </Cluster>
  );
};

export const ExampleHeader = (args) => {
  return (
    <Cluster gap={args.gap} justify="space-between" align="center">
      <div>LOGO</div>
      <Cluster gap={args.gap}>
        <p>Lorem ipsum</p>
        <p>dolor sit</p>
        <p>amet consectetur</p>
        <p>adipisicing elit</p>
        <p>sed do</p>
      </Cluster>
    </Cluster>
  );
};
ExampleHeader.storyName = 'Example : Header';
ExampleHeader.argTypes = {
  justify: { table: { disable: true } },
  align: { table: { disable: true } },
};
