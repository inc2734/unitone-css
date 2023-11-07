import React from 'react';
import readme from '../README.md';

import { Cover, CoverContent } from '../';
import { Decorator } from '../../decorator';
import { Stack } from '../../stack';

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
      table: { defaultValue: { summary: 'var(--unitone--global--gap)' } },
      type: { name: 'number', required: false },
    },
    padding: {
      control: { type: 'inline-radio' },
      description:
        'Padding. Set by CSS var `--unitone--padding` or `data-unitone-layout` attribute `-padding:x`.',
      options: [-2, -1, 0, 1, 2, 3, 4, 5, 6, 7],
      table: { defaultValue: { summary: '0var(--unitone--global--gap)' } },
      type: { name: 'number', required: false },
    },
    minHeight: {
      control: { type: 'text' },
      description: 'Min height. Set by CSS var `--unitone--min-height`.',
      table: { defaultValue: { summary: '100vh' } },
      type: { name: 'string', required: false },
    },
  },
  args: {
    gap: 2,
    padding: 2,
    minHeight: '100vh',
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
        <CoverContent valign="top">
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
        <CoverContent valign="bottom">
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
        <CoverContent valign="top">
          <p>Lorem ipsum</p>
        </CoverContent>

        <CoverContent valign="bottom">
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
        <CoverContent valign="top">
          <p>Lorem ipsum</p>
        </CoverContent>

        <CoverContent valign="center">
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
        <CoverContent valign="center">
          <Stack>
            <h1 style={{ '--unitone--font-size': 6 }}>Lorem ipsum dolor sit amet</h1>
            <p>
              consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore
              magna aliqua.
            </p>
          </Stack>
        </CoverContent>

        <CoverContent valign="bottom">
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
