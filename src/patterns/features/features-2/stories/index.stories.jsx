import React from 'react';

import { Feature2 } from '../Features2';

export default {
  title: 'Patterns/Features/Features-2',
  component: Feature2,
  argTypes: {
    backgroundColor: {
      control: { type: 'color' },
      table: { defaultValue: { summary: 'transparent' } },
      type: { name: 'string', required: false },
    },
    columnMinWidth: {
      control: { type: 'text' },
      description: '`--unitone--column-min-width`',
      table: { defaultValue: { summary: '250px' } },
      type: { name: 'string', required: false },
    },
    color: {
      control: { type: 'color' },
      table: { defaultValue: { summary: '#fff' } },
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
    color: '#fff',
    gap: 0,
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export const Default = (props) => (
  <Feature2
    backgroundColor={props.backgroundColor}
    columnMinWidth={props.columnMinWidth}
    color={props.color}
    gap={props.gap}
    items={[
      {
        title: 'Lorem',
        src: 'https://placehold.jp/600x800.jpg',
        content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
      },
      {
        title: 'ipsum',
        src: 'https://placehold.jp/600x800.jpg',
        content: 'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
      },
      {
        title: 'dolor',
        src: 'https://placehold.jp/600x800.jpg',
        content: 'Ut enim ad minim veniam',
      },
    ]}
  />
);
