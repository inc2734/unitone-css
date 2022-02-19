import React from 'react';

import { Feature1, Feature1Item } from '../Features-1';

export default {
  title: 'Components/Features-1',
  component: Feature1,
  argTypes: {
    backgroundColor: {
      control: { type: 'color' },
      table: { defaultValue: { summary: 'transparent' } },
      type: { name: 'string', required: false },
    },
    columnMinWidth: {
      control: { type: 'text' },
      description: '`--column-min-width`',
      table: { defaultValue: { summary: '250px' } },
      type: { name: 'string', required: false },
    },
    color: {
      control: { type: 'color' },
      table: { defaultValue: { summary: 'initial' } },
      type: { name: 'string', required: false },
    },
    gap: {
      control: { type: 'inline-radio' },
      options: [1, 2, 3, 4],
      table: { defaultValue: { summary: 3 } },
      type: { name: 'number', required: false },
    },
  },
  args: {
    backgroundColor: 'transparent',
    columnMinWidth: '250px',
    color: 'initial',
    gap: 3,
  },
};

export const Default = (props) => (
  <Feature1
    backgroundColor={props.backgroundColor}
    columnMinWidth={props.columnMinWidth}
    color={props.color}
    gap={props.gap}
    title="Lorem ipsum dolor sit amet"
  >
    <Feature1Item title="Lorem" src="https://placehold.jp/600x800.jpg">
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit</p>
    </Feature1Item>
    <Feature1Item title="ipsum" src="https://placehold.jp/600x800.jpg">
      <p>sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
    </Feature1Item>
    <Feature1Item title="dolor" src="https://placehold.jp/600x800.jpg">
      <p>Ut enim ad minim veniam</p>
    </Feature1Item>
  </Feature1>
);
