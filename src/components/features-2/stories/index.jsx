import React from 'react';

import { Feature2, Feature2Item } from '../Features-2';

export default {
  title: 'Components/Features-2',
  component: Feature2,
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
      options: [0, 1, 2, 3, 4],
      table: { defaultValue: { summary: 0 } },
      type: { name: 'number', required: false },
    },
  },
  args: {
    backgroundColor: 'transparent',
    columnMinWidth: '250px',
    color: 'initial',
    gap: 0,
  },
};

export const Default = (props) => (
  <Feature2
    backgroundColor={props.backgroundColor}
    columnMinWidth={props.columnMinWidth}
    color={props.color}
    gap={props.gap}
  >
    <Feature2Item title="Lorem" src="https://placehold.jp/600x800.jpg">
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit</p>
    </Feature2Item>
    <Feature2Item title="ipsum" src="https://placehold.jp/600x800.jpg">
      <p>sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
    </Feature2Item>
    <Feature2Item title="dolor" src="https://placehold.jp/600x800.jpg">
      <p>Ut enim ad minim veniam</p>
    </Feature2Item>
  </Feature2>
);
