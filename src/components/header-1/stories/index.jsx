import React from 'react';

import { Header1 } from '../Header-1';

export default {
  title: 'Components/Header-1',
  component: Header1,
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
  <Header1
    src="https://placehold.jp/1280x1024.jpg"
    title="Lorem ipsum dolor"
    backgroundColor={props.backgroundColor}
    color={props.color}
  >
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit</p>
  </Header1>
);
