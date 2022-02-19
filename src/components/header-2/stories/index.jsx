import React from 'react';

import { Header2 } from '../Header-2';

export default {
  title: 'Components/Header-2',
  component: Header2,
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
  <Header2
    src="https://placehold.jp/1280x480.jpg"
    title="Lorem ipsum dolor"
    backgroundColor={props.backgroundColor}
    color={props.color}
  >
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit</p>
  </Header2>
);
