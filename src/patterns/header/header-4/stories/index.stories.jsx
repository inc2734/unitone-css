import React from 'react';

import { Header4 } from '../Header4';

export default {
  title: 'Patterns/Header/Header-4',
  component: Header4,
  argTypes: {
    backgroundColor: {
      control: { type: 'color' },
      table: { defaultValue: { summary: 'transparent' } },
      type: { name: 'string', required: false },
    },
    color: {
      control: { type: 'color' },
      table: { defaultValue: { summary: '#fff' } },
      type: { name: 'string', required: false },
    },
  },
  args: {
    backgroundColor: 'transparent',
    color: '#fff',
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export const Default = (props) => (
  <Header4
    src="https://placehold.jp/1280x1024.jpg"
    title="Lorem ipsum dolor sit amet, consectetur adipisicing elit"
    backgroundColor={props.backgroundColor}
    color={props.color}
  >
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua.
    </p>
  </Header4>
);
