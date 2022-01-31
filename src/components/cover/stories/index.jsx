import React from 'react';

import { Cover, Center, Bottom } from '../Cover';
import { Box } from '../../box/Box';
import { Stack } from '../../stack/Stack';

export default {
  title: 'Components/Cover',
  component: Cover,
  argTypes: {
    gap: {
      options: [-2, -1, 0, 1, 2, 3, 4],
      control: { type: 'inline-radio' },
    },
  },
  args: {
    gap: 2,
    noPadding: false,
    minHeight: '100vh',
  },
};

export const Default = (args) => {
  return (
    <Box backgroundColor="#000" color="#fff" padding="0">
      <Cover {...args}>
        <p>Lorem ipsum</p>
        <Center>
          <Stack>
            <h1 style={{ '--font-size': 6 }}>Lorem ipsum dolor sit amet</h1>
            <p>
              consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
              magna aliqua.
            </p>
          </Stack>
        </Center>
        <p>sed do</p>
      </Cover>
    </Box>
  );
};

export const ExampleNoHeader = (args) => {
  return (
    <Box backgroundColor="#000" color="#fff" padding="0">
      <Cover {...args}>
        <Center>
          <Stack>
            <h1 style={{ '--font-size': 6 }}>Lorem ipsum dolor sit amet</h1>
            <p>
              consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
              magna aliqua.
            </p>
          </Stack>
        </Center>
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
        <Center>
          <Stack>
            <h1 style={{ '--font-size': 6 }}>Lorem ipsum dolor sit amet</h1>
            <p>
              consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
              magna aliqua.
            </p>
          </Stack>
        </Center>
      </Cover>
    </Box>
  );
};
ExampleNoFooter.storyName = 'Example : No footer';
ExampleNoFooter.args = {
  minHeight: '80vh',
};

export const ExampleBottom = (args) => {
  return (
    <Box backgroundColor="#000" color="#fff" padding="0">
      <Cover {...args}>
        <p>Lorem ipsum</p>
        <Bottom>
          <Stack>
            <h1 style={{ '--font-size': 6 }}>Lorem ipsum dolor sit amet</h1>
            <p>
              consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
              magna aliqua.
            </p>
          </Stack>
        </Bottom>
      </Cover>
    </Box>
  );
};
ExampleBottom.storyName = 'Example : Bottom';
ExampleBottom.args = {
  minHeight: '80vh',
};
