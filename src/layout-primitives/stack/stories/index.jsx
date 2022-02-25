import React from 'react';
import readme from '../README.md';

import { Stack } from '../Stack';
import { Box } from '../../box/Box';
import { Cluster } from '../../cluster/Cluster';

export default {
  title: 'Layout Primitives/Stack',
  component: Stack,
  parameters: {
    notes: { readme },
  },
  argTypes: {
    gap: {
      control: { type: 'inline-radio' },
      description: '`--gap`',
      options: [-2, -1, 0, 1, 2, 3, 4, 5, 6, 7],
      table: { defaultValue: { summary: 'var(--s1)' } },
      type: { name: 'number', required: false },
    },
  },
  args: {
    gap: 1,
  },
};

const content =
  'Lorem Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cill';

export const Default = (args) => {
  return (
    <Stack {...args}>
      <p style={{ '--font-size': -2 }}>{content}</p>
      <p style={{ '--font-size': -1 }}>{content}</p>
      <p>{content}</p>
      <p style={{ '--font-size': 1 }}>{content}</p>
      <p style={{ '--font-size': 2 }}>{content}</p>
      <p style={{ '--font-size': 3 }}>{content}</p>
      <p style={{ '--font-size': 4 }}>{content}</p>
      <p style={{ '--font-size': 5 }}>{content}</p>
      <p style={{ '--font-size': 6 }}>{content}</p>
      <p style={{ '--font-size': 7 }}>{content}</p>
    </Stack>
  );
};

export const ExampleCard = (args) => {
  return (
    <div style={{ maxWidth: '480px' }}>
      <Box backgroundColor={args.backgroundColor} color={args.color} padding="2" borderRadius="4px">
        <Stack gap={args.gap}>
          <Box padding="0">
            <Cluster>
              <img
                src="https://ja.gravatar.com/userimage/18715762/ad5c138cf1d8f3ce1bda5218f26b9b4e.jpeg"
                alt=""
                style={{ width: '48px', height: '48px' }}
              />
              <Stack gap="-2">
                <div>
                  <b>Takashi Kitajima</b>
                </div>
                <div style={{ '--font-size': -1 }}>Takashi Kitajima</div>
              </Stack>
            </Cluster>
          </Box>
          <div>
            <Stack style={{ '--font-size': -1 }}>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                irure dolor in reprehenderit in voluptate velit esse cill
              </p>
            </Stack>
          </div>
        </Stack>
      </Box>
    </div>
  );
};
ExampleCard.args = {
  color: '#f0f2f6',
  backgroundColor: '#1e293a',
};
ExampleCard.storyName = 'Example : Card';
ExampleCard.argTypes = {
  center: { table: { disable: true } },
};
