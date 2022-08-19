import React from 'react';
import readme from '../README.md';

import { Stack } from '../Stack';
import { Decorator } from '../../decorator/Decorator';
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
      description:
        'Gap. Set by CSS var `--unitone--gap` or `data-unitone-layout` attribute `-gap:x`.',
      options: [-2, -1, 0, 1, 2, 3, 4, 5, 6, 7],
      table: { defaultValue: { summary: 'var(--unitone--s1)' } },
      type: { name: 'number', required: false },
    },
    negative: {
      control: { type: 'inline-radio' },
      description: 'Using negative gap. Set by `data-unitone-layout` attribute `-negative`.',
      options: [false, true],
      table: { defaultValue: { summary: false } },
      type: { name: 'boolean', required: false },
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
    gap: 1,
    negative: false,
    divider: undefined,
  },
};

const contentEn =
  'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cill';
const contentJa =
  'あともゴーシュ子たり何に向いていまし。夜中は次がしばらくと落ちて狸から舞台のようで来でおかげをしからちょろちょろゴーシュを合わせていです。どうかまげて子をこどもに出でしです。それりんに狸がこってボック';

const Content = (props) => {
  const content = 'ja' === props.lang ? contentJa : contentEn;

  return (
    <>
      <p style={{ '--unitone--font-size': -2 }}>{content}</p>
      <p style={{ '--unitone--font-size': -1 }}>{content}</p>
      <p>{content}</p>
      <p style={{ '--unitone--font-size': 1 }}>{content}</p>
      <p style={{ '--unitone--font-size': 2 }}>{content}</p>
      <p style={{ '--unitone--font-size': 3 }}>{content}</p>
      <p style={{ '--unitone--font-size': 4 }}>{content}</p>
      <p style={{ '--unitone--font-size': 5 }}>{content}</p>
      <p style={{ '--unitone--font-size': 6 }}>{content}</p>
      <p style={{ '--unitone--font-size': 7 }}>{content}</p>
    </>
  );
};

export const Default = (args) => {
  return (
    <Stack {...args}>
      <Content />
    </Stack>
  );
};

export const ExampleJa = (args) => {
  return (
    <Stack {...args}>
      <Content lang="ja" />
    </Stack>
  );
};
ExampleJa.storyName = 'Example : Ja';

export const ExampleCard = (args) => {
  return (
    <div style={{ maxWidth: '480px' }}>
      <Decorator
        backgroundColor={args.backgroundColor}
        color={args.color}
        padding="1"
        borderRadius="4px"
      >
        <Stack gap={args.gap}>
          <Decorator>
            <Cluster>
              <img
                src="https://ja.gravatar.com/userimage/18715762/ad5c138cf1d8f3ce1bda5218f26b9b4e.jpeg"
                alt=""
                style={{ width: '48px', height: '48px' }}
              />
              <Stack gap="0">
                <div>
                  <b>Takashi Kitajima</b>
                </div>
                <div style={{ '--unitone--font-size': -1 }}>Takashi Kitajima</div>
              </Stack>
            </Cluster>
          </Decorator>
          <div>
            <Stack style={{ '--unitone--font-size': -1 }}>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                irure dolor in reprehenderit in voluptate velit esse cill
              </p>
            </Stack>
          </div>
        </Stack>
      </Decorator>
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

export const ExampleStripe = (args) => {
  return (
    <Stack {...args}>
      <div>
        <p>{contentEn}</p>
      </div>
      <div>
        <p>{contentEn}</p>
      </div>
      <div>
        <p>{contentEn}</p>
      </div>
    </Stack>
  );
};
ExampleStripe.args = {
  divider: 'stripe',
};
ExampleStripe.storyName = 'Example : Stripe';

export const ExampleUnderline = (args) => {
  return (
    <Stack {...args}>
      <div>
        <p>{contentEn}</p>
      </div>
      <div>
        <p>{contentEn}</p>
      </div>
      <div>
        <p>{contentEn}</p>
      </div>
    </Stack>
  );
};
ExampleUnderline.args = {
  divider: 'underline',
};
ExampleUnderline.storyName = 'Example : Underline';

export const ExampleBordered = (args) => {
  return (
    <Stack {...args}>
      <div>
        <p>{contentEn}</p>
      </div>
      <div>
        <p>{contentEn}</p>
      </div>
      <div>
        <p>{contentEn}</p>
      </div>
    </Stack>
  );
};
ExampleBordered.args = {
  divider: 'bordered',
};
ExampleBordered.storyName = 'Example : Bordered';
