import React from 'react';

import { Text } from '../Text';

export default {
  title: 'Components/Text',
  component: Text,
  argTypes: {
    lang: {
      table: {
        disable: true,
      },
    },
  },
};

const Template = (args) => {
  const headingText = 'ja' === args.lang
    ? 'あともゴーシュ子たり何に向いていまし'
    : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit';

  const bodyText = 'ja' === args.lang
    ? 'あともゴーシュ子たり何に向いていまし。夜中は次がしばらくと落ちて狸から舞台のようで来でおかげをしからちょろちょろゴーシュを合わせていです。どうかまげて子をこどもに出でしです。それりんに狸がこってボック'
    : 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cill';

  const style = {};
  if ( 'ja' === args.lang ) {
    style['--half-leading'] = '0.4';
  }

  return (
    <div style={ style }>
      <Text { ...args } style={ style }>
        <h1>{ headingText }</h1>
        <p>{ bodyText }</p>
        <p style={ { '--font-size': 2 } }>{ bodyText }</p>
        <p>{ bodyText }</p>
        <ul>
          <li>{ bodyText }</li>
          <li>{ bodyText }</li>
        </ul>

        <h2>{ headingText }</h2>
        <h3>{ headingText }</h3>
        <h4>{ headingText }</h4>
        <h5>{ headingText }</h5>
        <h6>{ headingText }</h6>
        <p>{ bodyText }</p>

        <h2>{ headingText }</h2>
        <p>{ bodyText }</p>
        <p>{ bodyText }</p>

        <h3>{ headingText }</h3>
        <p>{ bodyText }</p>
        <p>{ bodyText }</p>

        <h4>{ headingText }</h4>
        <p>{ bodyText }</p>
        <p>{ bodyText }</p>

        <h5>{ headingText }</h5>
        <p>{ bodyText }</p>
        <p>{ bodyText }</p>

        <h6>{ headingText }</h6>
        <p>{ bodyText }</p>
        <p>{ bodyText }</p>
      </Text>
    </div>
  );
};

export const Default = Template.bind({});

export const Ja = Template.bind({});
Ja.args = {
  lang: 'ja',
};
