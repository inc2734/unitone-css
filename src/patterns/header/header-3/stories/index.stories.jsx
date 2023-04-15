import React from 'react';

import { Header3 } from '../Header3';

export default {
  title: 'Patterns/Header/Header-3',
  component: Header3,
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
  },
};

export const Default = (props) => (
  <Header3
    src="https://placehold.jp/1280x1024.jpg"
    title="Lorem ipsum dolor sit amet, consectetur adipisicing elit"
    backgroundColor={props.backgroundColor}
    color={props.color}
  >
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
      laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
      voluptate velit esse cill
    </p>
  </Header3>
);
