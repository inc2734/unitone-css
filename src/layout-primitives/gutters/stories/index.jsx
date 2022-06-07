import React from 'react';
import readme from '../README.md';

import { Gutters } from '../Gutters';
import { Center } from '../../center/Center';
import { Container } from '../../container/Container';
import { Stack } from '../../stack/Stack';

export default {
  title: 'Layout Primitives/Gutters',
  component: Gutters,
  parameters: {
    notes: { readme },
  },
  argTypes: {
    padding: {
      control: { type: 'inline-radio' },
      description:
        'Top and bottom padding. Set by CSS var `--unitone--padding` or `data-layout` attribute `-padding:x`.',
      options: [1, 2, 3, 4, 5, 6, 7],
      table: { defaultValue: { summary: 'var(--unitone--s4)' } },
      type: { name: 'number', required: false },
    },
  },
  args: {
    padding: 4,
  },
};

export const Default = (args) => {
  return (
    <Gutters {...args}>
      <Container>
        <Stack gap={2}>
          <Center>
            <h2 style={{ '--unitone--font-size': 2 }}>Lorem ipsum dolor sit amet</h2>
          </Center>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cill
          </p>
        </Stack>
      </Container>
    </Gutters>
  );
};
