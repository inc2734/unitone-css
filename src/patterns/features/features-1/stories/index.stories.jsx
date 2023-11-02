import React from 'react';

import { Feature1 } from '../Features1';

export default {
  title: 'Patterns/Features/Features-1',
  component: Feature1,
  argTypes: {
    backgroundColor: {
      control: { type: 'color' },
      table: { defaultValue: { summary: 'transparent' } },
      type: { name: 'string', required: false },
    },
    columnMinWidth: {
      control: { type: 'text' },
      description: '`--unitone--column-min-width`',
      table: { defaultValue: { summary: '240px' } },
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
      table: { defaultValue: { summary: 2 } },
      type: { name: 'number', required: false },
    },
  },
  args: {
    backgroundColor: 'transparent',
    columnMinWidth: '240px',
    color: 'initial',
    gap: 2,
  },
  parameters: {
    layout: 'fullscreen',
  },
};

export const Default = (props) => (
  <Feature1
    backgroundColor={props.backgroundColor}
    columnMinWidth={props.columnMinWidth}
    color={props.color}
    gap={props.gap}
    title="Lorem ipsum dolor sit amet"
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
