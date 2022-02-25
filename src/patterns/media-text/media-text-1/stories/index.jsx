import React from 'react';

import { MediaText1 } from '../MediaText1';

export default {
  title: 'Patterns/MediaText/MediaText-1',
  component: MediaText1,
  argTypes: {
    color: {
      control: { type: 'color' },
      table: { defaultValue: { summary: 'initial' } },
      type: { name: 'string', required: false },
    },
  },
  args: {
    color: 'initial',
  },
};

export const Default = (props) => (
  <MediaText1
    src="https://placehold.jp/1024x1280.jpg"
    title="Lorem ipsum dolor sit amet, consectetur adipisicing elit"
    backgroundColor={props.backgroundColor}
    color={props.color}
  >
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
      labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
      laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
      voluptate velit esse cill
    </p>
  </MediaText1>
);
