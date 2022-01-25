import React from 'react';

import { Sidebar } from '../Sidebar';

export default {
  title: 'Components/Sidebar',
  component: Sidebar,
  argTypes: {
    position: {
      options: ['right', 'left'],
      control: { type: 'inline-radio' },
    },
    gap: {
      options: [-2, -1, 0, 1, 2, 3, 4],
      control: { type: 'inline-radio' },
    },
  },
  args: {
    position: 'right',
    gap: 1,
    asideWidth: 'initial',
    mainMinWidth: '50%',
  },
};

const content =
  'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cill';

export const Default = (args) => {
  return (
    <Sidebar {...args}>
      <p>{content}</p>
      <ul>
        <li>Lorem</li>
        <li>ipsum</li>
        <li>dolor</li>
      </ul>
    </Sidebar>
  );
};

export const Input = (args) => {
  return (
    <Sidebar {...args}>
      <input type="text" />
      <button>Button</button>
    </Sidebar>
  );
};
Input.storyName = 'Example : Input';

export const MediaText = (args) => {
  return (
    <Sidebar {...args}>
      <img src="https://placehold.jp/400x300.jpg" alt="" />
      <p>{content}</p>
    </Sidebar>
  );
};
MediaText.storyName = 'Example : Media and text';
MediaText.args = {
  position: 'left',
  asideWidth: '300px',
};
