import React from 'react';

import { MediaText2 } from '../MediaText2';

export default {
  title: 'Patterns/MediaText/MediaText-2',
  component: MediaText2,
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
  <MediaText2
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
  </MediaText2>
);
