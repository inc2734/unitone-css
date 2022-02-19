import React from 'react';
import readme from '../README.md';

import { Center } from '../Center';
import { Text } from '../../text/Text';

export default {
  title: 'Layout Primitives/Center',
  component: Center,
  parameters: {
    notes: { readme },
  },
  argTypes: {
    maxWidth: {
      control: { type: 'text' },
      description: '`--max-width`',
      table: { defaultValue: { summary: '100%' } },
      type: { name: 'string', required: false },
    },
    withText: {
      control: { type: 'inline-radio' },
      options: [false, true],
      table: { defaultValue: { summary: false } },
      type: { name: 'boolean', required: false },
    },
  },
  args: {
    maxWidth: '100%',
    withText: false,
  },
};

export const Default = (args) => {
  return (
    <Text>
      <h2>Lorem ipsum dolor sit amet, consectetur adipisicing elit</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
        ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
        voluptate velit esse cill
      </p>

      <Center {...args}>Lorem ipsum dolor sit amet, consectetur adipisicing elit</Center>

      <h3>Lorem ipsum dolor sit amet, consectetur adipisicing elit</h3>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
        ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
        voluptate velit esse cill
      </p>
    </Text>
  );
};
