import React from 'react';
import readme from '../README.md';

import { Cover, CoverContent } from '../Cover';
import { Box } from '../../box/Box';
import { Stack } from '../../stack/Stack';

export default {
  title: 'Layout Primitives/Cover',
  component: Cover,
  parameters: {
    notes: { readme },
  },
  argTypes: {
    gap: {
      control: { type: 'inline-radio' },
      description: '`--gap`',
      options: [-2, -1, 0, 1, 2, 3, 4, 5, 6, 7],
      table: { defaultValue: { summary: 'var(--s2)' } },
      type: { name: 'number', required: false },
    },
    minHeight: {
      control: { type: 'text' },
      description: '`--min-height`',
      table: { defaultValue: { summary: '100vh' } },
      type: { name: 'string', required: false },
    },
    noPadding: {
      control: { type: 'inline-radio' },
      options: [false, true],
      table: { defaultValue: { summary: 'false' } },
      type: { name: 'boolean', required: false },
    },
  },
  args: {
    gap: 2,
    minHeight: '100vh',
    noPadding: false,
  },
};

export const Default = (args) => {
  return (
    <Box backgroundColor="#000" color="#fff" padding="0">
      <Cover {...args}>
        <p>Lorem ipsum</p>
        <CoverContent>
          <Stack>
            <h1 style={{ '--font-size': 6 }}>Lorem ipsum dolor sit amet</h1>
            <p>
              consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
              magna aliqua.
            </p>
          </Stack>
        </CoverContent>
        <p>Lorem ipsum</p>
      </Cover>
    </Box>
  );
};

export const ExampleNoHeader = (args) => {
  return (
    <Box backgroundColor="#000" color="#fff" padding="0">
      <Cover {...args}>
        <CoverContent>
          <Stack>
            <h1 style={{ '--font-size': 6 }}>Lorem ipsum dolor sit amet</h1>
            <p>
              consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
              magna aliqua.
            </p>
          </Stack>
        </CoverContent>
        <p>sed do</p>
      </Cover>
    </Box>
  );
};
ExampleNoHeader.storyName = 'Example : No header';
ExampleNoHeader.args = {
  minHeight: '80vh',
};

export const ExampleNoFooter = (args) => {
  return (
    <Box backgroundColor="#000" color="#fff" padding="0">
      <Cover {...args}>
        <p>Lorem ipsum</p>
        <CoverContent>
          <Stack>
            <h1 style={{ '--font-size': 6 }}>Lorem ipsum dolor sit amet</h1>
            <p>
              consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
              magna aliqua.
            </p>
          </Stack>
        </CoverContent>
      </Cover>
    </Box>
  );
};
ExampleNoFooter.storyName = 'Example : No footer';
ExampleNoFooter.args = {
  minHeight: '80vh',
};

export const ExampleFooter = (args) => {
  return (
    <Box backgroundColor="#000" color="#fff" padding="0">
      <Cover {...args}>
        <CoverContent>
          <p>Lorem ipsum</p>
        </CoverContent>
        <Stack>
          <h1 style={{ '--font-size': 6 }}>Lorem ipsum dolor sit amet</h1>
          <p>
            consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
            aliqua.
          </p>
        </Stack>
      </Cover>
    </Box>
  );
};
ExampleFooter.storyName = 'Example : Footer';
ExampleFooter.args = {
  minHeight: '80vh',
};
