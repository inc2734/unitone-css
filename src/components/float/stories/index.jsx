import React from 'react';

import { Float } from '../Float';

export default {
  title: 'Components/Float',
  component: Float,
  argTypes: {
    position: {
      options: ['right', 'left'],
      control: { type: 'inline-radio' },
    },
    gap: {
      options: [-2, -1, 0, 1, 2, 3, 4],
      control: { type: 'inline-radio' },
    },
  },
  args: {
    position: 'left',
    minWidth: 'calc(var(--measure) / 2)',
    gap: 1,
    minMeasure: 'calc(var(--measure) / 2)',
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
