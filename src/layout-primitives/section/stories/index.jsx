import React from 'react';
import readme from '../README.md';

import { Section } from '../Section';
import { Center } from '../../center/Center';
import { Container } from '../../container/Container';
import { Stack } from '../../stack/Stack';

export default {
  title: 'Layout Primitives/Section',
  component: Section,
  parameters: {
    notes: { readme },
  },
  argTypes: {
    backgroundColor: {
      control: { type: 'color' },
      description: '`--background-color`',
      table: { defaultValue: { summary: 'transparent' } },
      type: { name: 'string', required: false },
    },
    color: {
      control: { type: 'color' },
      description: '`--color`',
      table: { defaultValue: { summary: 'initial' } },
      type: { name: 'string', required: false },
    },
    padding: {
      control: { type: 'inline-radio' },
      description: '`--padding`',
      options: [1, 2, 3, 4, 5, 6, 7],
      table: { defaultValue: { summary: 'var(--s4)' } },
      type: { name: 'number', required: false },
    },
  },
  args: {
    backgroundColor: 'transarent',
    color: 'initial',
    padding: 4,
  },
};

export const Default = (args) => {
  return (
    <Section {...args}>
      <Container>
        <Stack gap={2}>
          <Center>
            <h2 style={{ '--font-size': 2 }}>Lorem ipsum dolor sit amet</h2>
          </Center>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cill
          </p>
        </Stack>
      </Container>
    </Section>
  );
};
