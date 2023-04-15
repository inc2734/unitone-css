import React from 'react';
import readme from '../README.md';

import { Text } from '../Text';

export default {
  title: 'Layout Primitives/Text',
  component: Text,
  parameters: {
    notes: { readme },
  },
  argTypes: {
    center: {
      control: { type: 'inline-radio' },
      description: 'Centering child items. Set by `data-unitone-layout` attribute `-center`.',
      options: [false, true],
      table: { defaultValue: { summary: false } },
      type: { name: 'boolean', required: false },
    },
    column: {
      control: { type: 'inline-radio' },
      description: 'Centering child items. Set by `data-unitone-layout` attribute `-center`.',
      options: [false, true],
      table: { defaultValue: { summary: false } },
      type: { name: 'boolean', required: false },
    },
    gap: {
      control: { type: 'inline-radio' },
      description:
        'Gap. Set by CSS var `--unitone--gap` or `data-unitone-layout` attribute `-gap:x`.',
      options: [-2, -1, 0, 1, 2, 3, 4, 5, 6, 7],
      table: { defaultValue: { summary: 'var(--unitone--global--text-gap)' } },
      type: { name: 'number', required: false },
    },
    maxWidth: {
      control: { type: 'text' },
      description: 'Max width. Set by CSS var `--unitone--max-width`.',
      table: { defaultValue: { summary: 'var(--unitone--measure)' } },
      type: { name: 'string', required: false },
    },
  },
  args: {
    center: false,
    column: false,
    gap: 1,
    maxWidth: 'var(--unitone--measure)',
  },
};

const Content = (props) => {
  const headingText =
    'ja' === props.lang
      ? 'あともゴーシュ子たり何に向いていまし'
      : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit';

  const bodyText =
    'ja' === props.lang
      ? 'あともゴーシュ子たり何に向いていまし。夜中は次がしばらくと落ちて狸から舞台のようで来でおかげをしからちょろちょろゴーシュを合わせていです。どうかまげて子をこどもに出でしです。それりんに狸がこってボック'
      : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cill';

  return (
    <>
      <h1>{headingText}</h1>
      <p>{bodyText}</p>
      <p style={{ '--unitone--font-size': 2 }}>{bodyText}</p>
      <p>{bodyText}</p>
      <ul>
        <li>{bodyText}</li>
        <li>{bodyText}</li>
      </ul>

      <h2>{headingText}</h2>
      <h3>{headingText}</h3>
      <h4>{headingText}</h4>
      <h5>{headingText}</h5>
      <h6>{headingText}</h6>
      <p>{bodyText}</p>

      <h2>{headingText}</h2>
      <p>{bodyText}</p>
      <p>{bodyText}</p>

      <h3>{headingText}</h3>
      <p>{bodyText}</p>
      <p>{bodyText}</p>

      <h4>{headingText}</h4>
      <p>{bodyText}</p>
      <p>{bodyText}</p>

      <h5>{headingText}</h5>
      <p>{bodyText}</p>
      <p>{bodyText}</p>

      <h6>{headingText}</h6>
      <p>{bodyText}</p>
      <p>{bodyText}</p>
    </>
  );
};

export const Default = (args) => {
  return (
    <Text {...args}>
      <Content />
    </Text>
  );
};

export const ExampleCenter = (args) => {
  return (
    <Text {...args}>
      <Content />
    </Text>
  );
};
ExampleCenter.args = {
  center: true,
};
ExampleCenter.storyName = 'Example : Center';

export const ExampleJa = (args) => {
  return (
    <Text {...args} style={{ '--unitone--half-leading': 0.4 }}>
      <Content lang="ja" />
    </Text>
  );
};
ExampleJa.storyName = 'Example : Ja';
