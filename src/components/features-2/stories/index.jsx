import React from 'react';

import { Wrapper, Item } from '../Features-2';

export default {
  title: 'Components/Features-2',
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
  },
  args: {
    backgroundColor: 'transparent',
    color: 'initial',
  },
};

export const Default = (props) => (
  <Wrapper backgroundColor={props.backgroundColor} color={props.color}>
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
