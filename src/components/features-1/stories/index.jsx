import React from 'react';

import { Wrapper, Item } from '../Features-1';

export default {
  title: 'Components/Features-1',
  component: Wrapper,
  argTypes: {
    backgroundColor: {
      control: { type: 'color' },
      table: { defaultValue: { summary: 'transparent' } },
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
    color: 'initial',
    gap: 3,
  },
};

export const Default = (props) => (
  <Wrapper
    backgroundColor={props.backgroundColor}
    color={props.color}
    gap={props.gap}
    title="Lorem ipsum dolor sit amet"
  >
    <Item title="Lorem" src="https://placehold.jp/600x800.jpg">
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit</p>
    </Item>
    <Item title="ipsum" src="https://placehold.jp/600x800.jpg">
      <p>sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
    </Item>
    <Item title="dolor" src="https://placehold.jp/600x800.jpg">
      <p>Ut enim ad minim veniam</p>
    </Item>
  </Wrapper>
);
