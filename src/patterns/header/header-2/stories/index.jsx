import React from 'react';

import { Header2 } from '../Header2';

export default {
  title: 'Patterns/Header/Header-2',
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
  parameters: {
    layout: 'fullscreen',
    viewMode: 'preview',
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
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
      laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
      voluptate velit esse cill
    </p>
  </Header2>
);
