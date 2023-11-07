import React from 'react';
import readme from '../README.md';

import { ResponsiveGrid } from '../';
import { Stack } from '../../stack';

export default {
  title: 'Layout Primitives/ResponsiveGrid',
  component: ResponsiveGrid,
  parameters: {
    notes: { readme },
  },
  argTypes: {
    columnMinWidth: {
      control: { type: 'text' },
      description: 'Min width of each columns. Set by CSS var `--unitone--column-min-width`.',
      table: { defaultValue: { summary: '240px' } },
      type: { name: 'string', required: false },
    },
    gap: {
      control: { type: 'inline-radio' },
      description: 'Gap. Set by CSS var `--unitone--gap`.',
      options: [-2, -1, 0, 1, 2, 3, 4, 5, 6, 7],
      table: { defaultValue: { summary: 'var(--unitone--global--gap)' } },
      type: { name: 'number', required: false },
    },
    autoRepeat: {
      control: { type: 'inline-radio' },
      description: 'The auto-repeat. Set by CSS var `--unitone--auto-repeat`.',
      options: ['auto-fill', 'auto-fit'],
      table: { defaultValue: { summary: 'auto-fill' } },
      type: { name: 'string', required: false },
    },
    divider: {
      control: { type: 'inline-radio' },
      description: 'Divider. Set by `data-unitone-layout` attribute `-divider:x`.',
      options: [undefined, 'stripe', 'underline', 'bordered'],
      table: { defaultValue: { summary: false } },
      type: { name: 'boolean', required: false },
    },
  },
  args: {
    columnMinWidth: '240px',
    gap: 2,
    autoRepeat: 'auto-fill',
    divider: undefined,
  },
};

const content = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit';

export const Default = (args) => {
  return (
    <ResponsiveGrid {...args}>
      <div>
        <Stack gap={-2}>
          <img src="https://placehold.jp/400x300.jpg" alt="" />
          <p>{content}</p>
        </Stack>
      </div>
      <div>
        <Stack gap={-2}>
          <img src="https://placehold.jp/400x300.jpg" alt="" />
          <p>{content}</p>
        </Stack>
      </div>
      <div>
        <Stack gap={-2}>
          <img src="https://placehold.jp/400x300.jpg" alt="" />
          <p>{content}</p>
        </Stack>
      </div>
      <div>
        <Stack gap={-2}>
          <img src="https://placehold.jp/400x300.jpg" alt="" />
          <p>{content}</p>
        </Stack>
      </div>
      <div>
        <Stack gap={-2}>
          <img src="https://placehold.jp/400x300.jpg" alt="" />
          <p>{content}</p>
        </Stack>
      </div>
      <div>
        <Stack gap={-2}>
          <img src="https://placehold.jp/400x300.jpg" alt="" />
          <p>{content}</p>
        </Stack>
      </div>
    </ResponsiveGrid>
  );
};

export const ExampleStripe = (args) => {
  return (
    <ResponsiveGrid {...args}>
      <div>
        <Stack gap={-2}>
          <img src="https://placehold.jp/400x300.jpg" alt="" />
          <p>{content}</p>
        </Stack>
      </div>
      <div>
        <Stack gap={-2}>
          <img src="https://placehold.jp/400x300.jpg" alt="" />
          <p>{content}</p>
        </Stack>
      </div>
      <div>
        <Stack gap={-2}>
          <img src="https://placehold.jp/400x300.jpg" alt="" />
          <p>{content}</p>
        </Stack>
      </div>
      <div>
        <Stack gap={-2}>
          <img src="https://placehold.jp/400x300.jpg" alt="" />
          <p>{content}</p>
        </Stack>
      </div>
      <div>
        <Stack gap={-2}>
          <img src="https://placehold.jp/400x300.jpg" alt="" />
          <p>{content}</p>
        </Stack>
      </div>
      <div>
        <Stack gap={-2}>
          <img src="https://placehold.jp/400x300.jpg" alt="" />
          <p>{content}</p>
        </Stack>
      </div>
    </ResponsiveGrid>
  );
};
ExampleStripe.args = {
  divider: 'stripe',
};
ExampleStripe.storyName = 'Example : Stripe';

export const ExampleUnderline = (args) => {
  return (
    <ResponsiveGrid {...args}>
      <div>
        <Stack gap={-2}>
          <img src="https://placehold.jp/400x300.jpg" alt="" />
          <p>{content}</p>
        </Stack>
      </div>
      <div>
        <Stack gap={-2}>
          <img src="https://placehold.jp/400x300.jpg" alt="" />
          <p>{content}</p>
        </Stack>
      </div>
      <div>
        <Stack gap={-2}>
          <img src="https://placehold.jp/400x300.jpg" alt="" />
          <p>{content}</p>
        </Stack>
      </div>
      <div>
        <Stack gap={-2}>
          <img src="https://placehold.jp/400x300.jpg" alt="" />
          <p>{content}</p>
        </Stack>
      </div>
      <div>
        <Stack gap={-2}>
          <img src="https://placehold.jp/400x300.jpg" alt="" />
          <p>{content}</p>
        </Stack>
      </div>
      <div>
        <Stack gap={-2}>
          <img src="https://placehold.jp/400x300.jpg" alt="" />
          <p>{content}</p>
        </Stack>
      </div>
    </ResponsiveGrid>
  );
};
ExampleUnderline.args = {
  divider: 'underline',
};
ExampleUnderline.storyName = 'Example : Underline';

export const ExampleBordered = (args) => {
  return (
    <ResponsiveGrid {...args}>
      <div>
        <Stack gap={-2}>
          <img src="https://placehold.jp/400x300.jpg" alt="" />
          <p>{content}</p>
        </Stack>
      </div>
      <div>
        <Stack gap={-2}>
          <img src="https://placehold.jp/400x300.jpg" alt="" />
          <p>{content}</p>
        </Stack>
      </div>
      <div>
        <Stack gap={-2}>
          <img src="https://placehold.jp/400x300.jpg" alt="" />
          <p>{content}</p>
        </Stack>
      </div>
      <div>
        <Stack gap={-2}>
          <img src="https://placehold.jp/400x300.jpg" alt="" />
          <p>{content}</p>
        </Stack>
      </div>
      <div>
        <Stack gap={-2}>
          <img src="https://placehold.jp/400x300.jpg" alt="" />
          <p>{content}</p>
        </Stack>
      </div>
      <div>
        <Stack gap={-2}>
          <img src="https://placehold.jp/400x300.jpg" alt="" />
          <p>{content}</p>
        </Stack>
      </div>
    </ResponsiveGrid>
  );
};
ExampleBordered.args = {
  divider: 'bordered',
};
ExampleBordered.storyName = 'Example : Bordered';
