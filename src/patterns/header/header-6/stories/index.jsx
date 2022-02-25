import React from 'react';

import { Header6 } from '../Header6';

export default {
  title: 'Patterns/Header/Header-6',
  component: Header6,
  argTypes: {
    backgroundColor: {
      control: { type: 'color' },
      table: { defaultValue: { summary: '#000' } },
      type: { name: 'string', required: false },
    },
    borderColor: {
      control: { type: 'color' },
      table: { defaultValue: { summary: '#fff' } },
      type: { name: 'string', required: false },
    },
    color: {
      control: { type: 'color' },
      table: { defaultValue: { summary: '#fff' } },
      type: { name: 'string', required: false },
    },
    padding: {
      control: { type: 'inline-radio' },
      options: [-2, -1, 1, 2, 3],
      table: { defaultValue: { summary: 'var(--s1)' } },
      type: { name: 'number', required: false },
    },
  },
  args: {
    backgroundColor: '#000',
    borderColor: '#fff',
    color: '#fff',
    padding: 1,
  },
  parameters: {
    layout: 'fullscreen',
    viewMode: 'preview',
  },
};

export const Default = (props) => (
  <Header6
    src="https://placehold.jp/1280x1024.jpg"
    title="Lorem ipsum dolor"
    backgroundColor={props.backgroundColor}
    borderColor={props.borderColor}
    color={props.color}
    padding={props.padding}
  >
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit Lorem ipsum dolor sit amet,
      consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
      aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
      ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cill
    </p>
  </Header6>
);
