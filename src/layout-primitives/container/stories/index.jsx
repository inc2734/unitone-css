import React from 'react';
import readme from '../README.md';

import { Container } from '../Container';
import { Text } from '../../text/Text';

export default {
  title: 'Layout Primitives/Container',
  component: Container,
  parameters: {
    notes: { readme },
  },
  argTypes: {
    center: {
      table: { disable: true },
    },
    gutters: {
      control: { type: 'inline-radio' },
      description: '`--padding`',
      options: [0, 1, 2, 3, 4, 5, 6, 7],
      table: { defaultValue: { summary: 'var(--s1)' } },
      type: { name: 'number', required: false },
    },
    maxWidth: {
      control: { type: 'text' },
      description: '`--max-width`',
      table: { defaultValue: { summary: 'min(1280px, 100%)' } },
      type: { name: 'string', required: false },
    },
  },
  args: {
    center: false,
    gutters: 1,
    maxWidth: 'min(1280px, 100%)',
  },
};

export const Default = (args) => {
  return (
    <Container {...args}>
      <Text>
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
