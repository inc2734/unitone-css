import React from 'react';
import readme from '../README.md';

import { WithSidebar } from '../';

export default {
  title: 'Layout Primitives/WithSidebar',
  component: WithSidebar,
  parameters: {
    notes: { readme },
  },
  argTypes: {
    alignItems: {
      control: { type: 'inline-radio' },
      description: '`--unitone--align-items`',
      description:
        'Alignment of the row direction. Set by CSS var `--unitone--align-items` or `data-unitone-layout` attribute `-align-items:x`.',
      options: [undefined, 'start', 'center', 'end'],
      table: { defaultValue: { summary: undefined } },
      type: { name: 'string', required: false },
    },
    contentMinWidth: {
      control: { type: 'text' },
      description: 'Min width of the content. Set by CSS var `--unitone--content-min-width`.',
      table: { defaultValue: { summary: '50%' } },
      type: { name: 'string', required: false },
    },
    gap: {
      control: { type: 'inline-radio' },
      description:
        'Gap. Set by CSS var `--unitone--gap` or `data-unitone-layout` attribute `-gap:x`.',
      options: [-2, -1, 0, 1, 2, 3, 4, 5, 6, 7],
      table: { defaultValue: { summary: 'var(--unitone--global--gap)' } },
      type: { name: 'number', required: false },
    },
    revert: {
      control: { type: 'inline-radio' },
      description:
        'The way child elements are displayed is reversed. Set by `data-unitone-layout` attribute `-revert`.',
      options: [false, true],
      table: { defaultValue: { summary: 'false' } },
      type: { name: 'boolean', required: false },
    },
    sidebar: {
      control: { type: 'inline-radio' },
      description:
        'Which sidebar should be treated as a sidebar, right or left? Set by `data-unitone-layout` attribute `-sidebar:x`.',
      options: ['left', 'right'],
      table: { defaultValue: { summary: 'right' } },
      type: { name: 'string', required: false },
    },
    sidebarWidth: {
      control: { type: 'text' },
      description: 'Sidebar width. Set by CSS var `--unitone--sidebar-width`.',
      table: { defaultValue: { summary: 'initial' } },
      type: { name: 'string', required: false },
    },
  },
  args: {
    alignItems: undefined,
    contentMinWidth: '50%',
    gap: 2,
    revert: false,
    sidebar: 'right',
    sidebarWidth: 'initial',
  },
};

export const Default = (args) => {
  return (
    <WithSidebar {...args}>
      <p>Lorem ipsum dolor sit amet</p>
      <ul>
        <li>Lorem</li>
        <li>ipsum</li>
        <li>dolor</li>
      </ul>
    </WithSidebar>
  );
};

export const Revert = (args) => {
  return (
    <WithSidebar {...args}>
      <p>Lorem ipsum dolor sit amet</p>
      <ul>
        <li>Lorem</li>
        <li>ipsum</li>
        <li>dolor</li>
      </ul>
    </WithSidebar>
  );
};
Revert.storyName = 'Example : Revert';
Revert.args = {
  revert: true,
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
  gap: -2,
};

export const MediaText = (args) => {
  return (
    <WithSidebar {...args}>
      <img src="https://placehold.jp/400x300.jpg" alt="" />
      <p>Lorem ipsum dolor sit amet</p>
    </WithSidebar>
  );
};
MediaText.storyName = 'Example : Media and text';
MediaText.args = {
  sidebar: 'left',
  sidebarWidth: '300px',
};
