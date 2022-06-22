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
      description:
        'Gap. Set by CSS var `--unitone--gap` or `data-unitone-layout` attribute `-gap:x`.',
      options: [-2, -1, 0, 1, 2, 3, 4, 5, 6, 7],
      table: { defaultValue: { summary: 'var(--unitone--s1)' } },
      type: { name: 'number', required: false },
    },
    minHeight: {
      control: { type: 'text' },
      description: 'Min height. Set by CSS var `--unitone--min-height`.',
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
  },
  args: {
    gap: 1,
    minHeight: '100vh',
    noPadding: false,
  },
};

export const Default = (args) => {
  return (
    <Decorator backgroundColor="#000" color="#fff">
      <Cover {...args}>
        <p>Lorem ipsum</p>
        <CoverContent>
          <Stack>
            <h1 style={{ '--unitone--font-size': 6 }}>Lorem ipsum dolor sit amet</h1>
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

export const ExampleHeader = (args) => {
  return (
    <Decorator backgroundColor="#000" color="#fff">
      <Cover {...args}>
        <CoverContent position="top">
          <Stack>
            <h1 style={{ '--unitone--font-size': 6 }}>Lorem ipsum dolor sit amet</h1>
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
ExampleHeader.storyName = 'Example : Header';
ExampleHeader.args = {
  minHeight: '80vh',
};

export const ExampleFooter = (args) => {
  return (
    <Decorator backgroundColor="#000" color="#fff">
      <Cover {...args}>
        <CoverContent position="bottom">
          <Stack>
            <h1 style={{ '--unitone--font-size': 6 }}>Lorem ipsum dolor sit amet</h1>
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
ExampleFooter.storyName = 'Example : Footer';
ExampleFooter.args = {
  minHeight: '80vh',
};

export const ExampleHeaderFooter = (args) => {
  return (
    <Decorator backgroundColor="#000" color="#fff">
      <Cover {...args}>
        <CoverContent position="top">
          <p>Lorem ipsum</p>
        </CoverContent>

        <CoverContent position="bottom">
          <p>Lorem ipsum</p>
        </CoverContent>
      </Cover>
    </Decorator>
  );
};
ExampleHeaderFooter.storyName = 'Example : Header Footer';
ExampleHeaderFooter.args = {
  minHeight: '80vh',
};

export const ExampleHeaderCenter = (args) => {
  return (
    <Decorator backgroundColor="#000" color="#fff">
      <Cover {...args}>
        <CoverContent position="top">
          <p>Lorem ipsum</p>
        </CoverContent>

        <CoverContent position="center">
          <Stack>
            <h1 style={{ '--unitone--font-size': 6 }}>Lorem ipsum dolor sit amet</h1>
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
ExampleHeaderCenter.storyName = 'Example : Header Center';
ExampleHeaderCenter.args = {
  minHeight: '80vh',
};

export const ExampleCenterFooter = (args) => {
  return (
    <Decorator backgroundColor="#000" color="#fff">
      <Cover {...args}>
        <CoverContent position="center">
          <Stack>
            <h1 style={{ '--unitone--font-size': 6 }}>Lorem ipsum dolor sit amet</h1>
            <p>
              consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
              magna aliqua.
            </p>
          </Stack>
        </CoverContent>

        <CoverContent position="bottom">
          <p>Lorem ipsum</p>
        </CoverContent>
      </Cover>
    </Decorator>
  );
};
ExampleCenterFooter.storyName = 'Example : Center Footer';
ExampleCenterFooter.args = {
  minHeight: '80vh',
};
