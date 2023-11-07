import React from 'react';
import readme from '../README.md';

import { Container } from '../';
import { Text } from '../../text';

export default {
  title: 'Layout Primitives/Container',
  component: Container,
  parameters: {
    notes: { readme },
  },
  argTypes: {
    align: {
      control: { type: 'inline-radio' },
      description: 'Alignment of the container. Set by `data-unitone-layout` attribute `-align:x`.',
      options: ['start', 'center', 'end'],
      table: { defaultValue: { summary: '' } },
      type: { name: 'string', required: false },
    },
    gutters: {
      control: { type: 'inline-radio' },
      description:
        'Gutters. Set by CSS var `--unitone--gutters` or `data-unitone-layout` attribute `-gutters:x`.',
      options: [undefined, 0, 1, 2, 3, 4, 5, 6, 7, 'root'],
      table: { defaultValue: { summary: 'var(--unitone--global--gutters)' } },
      type: { name: 'number', required: false },
    },
    maxWidth: {
      control: { type: 'text' },
      description: 'Max width. Set by CSS var `--unitone--max-width`.',
      table: { defaultValue: { summary: '1280px' } },
      type: { name: 'string', required: false },
    },
  },
  args: {
    align: undefined,
    gutters: undefined,
    maxWidth: '1280px',
  },
};

export const Default = (args) => {
  return (
    <Container {...args}>
      <Text maxWidth="inherit">
        <h2>Lorem ipsum dolor sit amet, consectetur adipisicing elit</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cill
        </p>

        <h3>Lorem ipsum dolor sit amet, consectetur adipisicing elit</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cill
        </p>
      </Text>
    </Container>
  );
};
