import React from 'react';
import readme from '../README.md';

import { VerticalWriting } from '../VerticalWriting';

export default {
  title: 'Layout Primitives/VerticalWriting',
  component: VerticalWriting,
  parameters: {
    notes: { readme },
  },
  argTypes: {
    gap: {
      control: { type: 'inline-radio' },
      description:
        'Gap. Set by CSS var `--unitone--gap` or `data-unitone-layout` attribute `-gap:x`.',
      options: [-2, -1, 0, 1, 2, 3, 4, 5, 6, 7],
      table: { defaultValue: { summary: 'var(--unitone--global--text-gap)' } },
      type: { name: 'number', required: false },
    },
    maxHeight: {
      control: { type: 'text' },
      description: 'Max height of each columns. Set by CSS var `--unitone--max-height`.',
      table: { defaultValue: { summary: 'calc(9 * var(--unitone--measure) / 16)' } },
      type: { name: 'string', required: false },
    },
    textOrientation: {
      control: { type: 'inline-radio' },
      description:
        'Text orientation. Set by `data-unitone-layout` attribute `-text-orientation:x`.',
      options: ['mixed', 'upright', 'sideways'],
      table: { defaultValue: { summary: '' } },
      type: { name: 'string', required: false },
    },
  },
  args: {
    gap: 1,
    maxHeight: 'calc(9 * var(--unitone--measure) / 16)',
    textOrientation: 'mixed',
  },
};

const Content = (props) => {
  const headingText = 'あともゴーシュ子たり何に向いていまし';

  const bodyText =
    'あともゴーシュ子たり何に向いていまし。夜中は次がしばらくと落ちて狸から舞台のようで来でおかげをしからちょろちょろゴーシュを合わせていです。どうかまげて子をこどもに出でしです。それりんに狸がこってボック';

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
    <VerticalWriting {...args}>
      <Content />
    </VerticalWriting>
  );
};
