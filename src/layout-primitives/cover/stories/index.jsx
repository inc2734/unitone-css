import React from 'react';
import readme from '../README.md';

import { Cover, CoverContent } from '../Cover';
import { Decorator } from '../../decorator/Decorator';
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
      description: 'Gap. Set by CSS var `--gap` or `data-layout` attribute `-gap:x`.',
      options: [-2, -1, 0, 1, 2, 3, 4, 5, 6, 7],
      table: { defaultValue: { summary: 'var(--s1)' } },
      type: { name: 'number', required: false },
    },
    minHeight: {
      control: { type: 'text' },
      description: 'Min height. Set by CSS var `--min-height`.',
      table: { defaultValue: { summary: '100vh' } },
      type: { name: 'string', required: false },
    },
    noPadding: {
      control: { type: 'inline-radio' },
      description: 'Remove padding.',
      options: [false, true],
      table: { defaultValue: { summary: 'false' } },
      type: { name: 'boolean', required: false },
    },
    justifyContent: {
      control: { type: 'inline-radio' },
      description:
        'Alignment of the row direction. Set by CSS var `--justify-content` or `data-layout` attribute `-justify-content:x`.',
      options: ['start', 'center', 'end', 'space-between'],
      table: { defaultValue: { summary: 'start' } },
      type: { name: 'string', required: false },
    },
  },
  args: {
    gap: 1,
    minHeight: '100vh',
    noPadding: false,
    justifyContent: 'center',
  },
};

export const Default = (args) => {
  return (
    <Decorator backgroundColor="#000" color="#fff">
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
    </Decorator>
  );
};

export const ExampleNoHeader = (args) => {
  return (
    <Decorator backgroundColor="#000" color="#fff">
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
    </Decorator>
  );
};
ExampleNoHeader.storyName = 'Example : No header';
ExampleNoHeader.args = {
  minHeight: '80vh',
};

export const ExampleNoFooter = (args) => {
  return (
    <Decorator backgroundColor="#000" color="#fff">
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
    </Decorator>
  );
};
ExampleNoFooter.storyName = 'Example : No footer';
ExampleNoFooter.args = {
  minHeight: '80vh',
};

export const ExampleFooter = (args) => {
  return (
    <Decorator backgroundColor="#000" color="#fff">
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
    </Decorator>
  );
};
ExampleFooter.storyName = 'Example : Footer';
ExampleFooter.args = {
  minHeight: '80vh',
};
