import React from 'react';
import readme from '../README.md';

import { WithSidebar } from '../WithSidebar';

export default {
  title: 'Components/WithSidebar',
  component: WithSidebar,
  parameters: {
    notes: { readme },
  },
  argTypes: {
    contentMinWidth: {
      control: { type: 'text' },
      description: '`--with-sidebar--content-min-width`',
      table: { defaultValue: { summary: '50%' } },
      type: { name: 'string', required: false },
    },
    gap: {
      control: { type: 'inline-radio' },
      description: '`--with-sidebar--gap`',
      options: [-2, -1, 0, 1, 2, 3, 4],
      table: { defaultValue: { summary: 'var(--s2)' } },
      type: { name: 'number', required: false },
    },
    sidebarPosition: {
      table: { disable: true },
    },
    sidebarWidth: {
      control: { type: 'text' },
      description: '`--with-sidebar--sidebar-width`',
      table: { defaultValue: { summary: 'initial' } },
      type: { name: 'string', required: false },
    },
  },
  args: {
    contentMinWidth: '50%',
    gap: 2,
    sidebarPosition: 'right',
    sidebarWidth: 'initial',
  },
};

const content =
  'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cill';

export const Default = (args) => {
  return (
    <WithSidebar {...args}>
      <p>{content}</p>
      <ul>
        <li>Lorem</li>
        <li>ipsum</li>
        <li>dolor</li>
      </ul>
    </WithSidebar>
  );
};

export const Input = (args) => {
  return (
    <WithSidebar {...args}>
      <input type="text" />
      <button>Button</button>
    </WithSidebar>
  );
};
Input.storyName = 'Example : Input';
Input.args = {
  gap: 1,
};

export const MediaText = (args) => {
  return (
    <WithSidebar {...args}>
      <img src="https://placehold.jp/400x300.jpg" alt="" />
      <p>{content}</p>
    </WithSidebar>
  );
};
MediaText.storyName = 'Example : Media and text';
MediaText.args = {
  sidebarPosition: 'left',
  sidebarWidth: '300px',
};
