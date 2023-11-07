import React from 'react';
import readme from '../README.md';

import { Layers } from '../';
import { Decorator } from '../../decorator';

export default {
  title: 'Layout Primitives/Layers',
  component: Layers,
  parameters: {
    notes: { readme },
  },
  argTypes: {
    cover: {
      control: { type: 'inline-radio' },
      description:
        "Background image/video is sized to maintain its aspect ratio while filling the element's entire content box. If the object's aspect ratio does not match the aspect ratio of its box, then the object will be clipped to fit.",
      options: [false, true],
      table: { defaultValue: { summary: false } },
      type: { name: 'boolean', required: false },
    },
    fill: {
      control: { type: 'inline-radio' },
      description: 'The background image/video is enlarged according to the amount of content.',
      options: [false, true],
      table: { defaultValue: { summary: false } },
      type: { name: 'boolean', required: false },
    },
    blur: {
      control: { type: 'inline-radio' },
      description: 'Blur the background image/video.',
      options: [false, true],
      table: { defaultValue: { summary: false } },
      type: { name: 'boolean', required: false },
    },
    portrait: {
      control: { type: 'inline-radio' },
      description: 'In portrait mode, swaps the height and width of the grid.',
      options: [false, true],
      table: { defaultValue: { summary: false } },
      type: { name: 'boolean', required: false },
    },
    gap: {
      control: { type: 'inline-radio' },
      description:
        'Gap. Set by CSS var `--unitone--gap` or `data-unitone-layout` attribute `-gap:x`.',
      options: [-2, -1, 0, 1, 2, 3, 4, 5, 6, 7],
      table: { defaultValue: { summary: 'min(3.33333%,var(--unitone--grid-gap))' } },
      type: { name: 'number', required: false },
    },
    minHeight: {
      control: { type: 'text' },
      description: 'Min height. Set by CSS var `--unitone--min-height`.',
      table: { defaultValue: { summary: '0' } },
      type: { name: 'string', required: false },
    },
    columns: {
      control: { type: 'text' },
      description: 'Number of columns. Set by CSS var `--unitone--columns`.',
      table: { defaultValue: { summary: 'var(--unitone--grid-columns)' } },
      type: { name: 'number', required: false },
    },
    rows: {
      control: { type: 'text' },
      description: 'Number of rows. Set by CSS var `--unitone--columns`.',
      table: { defaultValue: { summary: 'var(--unitone--grid-rows)' } },
      type: { name: 'number', required: false },
    },
  },
  args: {
    cover: false,
    fill: false,
    blur: false,
    portrait: true,
    gap: 'min(3.33333%,var(--unitone--grid-gap))',
    minHeight: '0',
    columns: 'var(--unitone--grid-columns)',
    rows: 'var(--unitone--grid-rows)',
  },
};

export const Default = (args) => {
  return (
    <Layers {...args}>
      <img src="https://placehold.jp/600x400.jpg" alt="" />
      <Decorator style={{ '--unitone--align-self': 'end' }} padding={1} position="relative">
        Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
        nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
        irure dolor in reprehenderit in voluptate velit esse cillLorem ipsum dolor sit amet,
        consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
        aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
        ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
        ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
        voluptate velit esse cillLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
        nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
        irure dolor in reprehenderit in voluptate velit esse cill
      </Decorator>
    </Layers>
  );
};

export const ExamplePicture = (args) => {
  return (
    <Layers {...args}>
      <picture>
        <img src="https://placehold.jp/600x400.jpg" alt="" />
      </picture>
      <Decorator style={{ '--unitone--align-self': 'end' }} padding={1} position="relative">
        Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
        nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
        irure dolor in reprehenderit in voluptate velit esse cillLorem ipsum dolor sit amet,
        consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
        aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
        ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
        ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
        voluptate velit esse cillLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
        nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
        irure dolor in reprehenderit in voluptate velit esse cill
      </Decorator>
    </Layers>
  );
};
ExamplePicture.storyName = 'Example : picture';

export const ExampleFigure = (args) => {
  return (
    <Layers {...args}>
      <figure>
        <img src="https://placehold.jp/600x400.jpg" alt="" />
      </figure>
      <Decorator style={{ '--unitone--align-self': 'end' }} padding={1} position="relative">
        Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
        nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
        irure dolor in reprehenderit in voluptate velit esse cillLorem ipsum dolor sit amet,
        consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
        aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
        ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
        ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
        voluptate velit esse cillLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
        nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
        irure dolor in reprehenderit in voluptate velit esse cill
      </Decorator>
    </Layers>
  );
};
ExampleFigure.storyName = 'Example : figure';

export const ExampleFigurePicture = (args) => {
  return (
    <Layers {...args}>
      <figure>
        <picture>
          <img src="https://placehold.jp/600x400.jpg" alt="" />
        </picture>
      </figure>
      <Decorator style={{ '--unitone--align-self': 'end' }} padding={1} position="relative">
        Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
        nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
        irure dolor in reprehenderit in voluptate velit esse cillLorem ipsum dolor sit amet,
        consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
        aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
        ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt
        ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
        voluptate velit esse cillLorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis
        nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
        irure dolor in reprehenderit in voluptate velit esse cill
      </Decorator>
    </Layers>
  );
};
ExampleFigurePicture.storyName = 'Example : figure > picture';
