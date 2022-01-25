import React from 'react';

import { Frame } from '../Frame';

export default {
  title: 'Components/Frame',
  component: Frame,
  args: {
    ratioWidth: 16,
    ratioHeight: 9,
  },
};

export const Default = (args) => {
  return (
    <Frame {...args}>
      <img src="https://placehold.jp/400x300.jpg" alt="" />
    </Frame>
  );
};
