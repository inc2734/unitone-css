import React from 'react';
import readme from '../README.md';

import { Layers } from '../Layers';
import { Box } from '../../box/Box';

export default {
  title: 'Layout Primitives/Layers',
  component: Layers,
  parameters: {
    notes: { readme },
  },
};

export const Default = (args) => {
  return (
    <Layers {...args}>
      <img src="https://placehold.jp/600x400.jpg" alt="" />
      <Box style={{ '--align-self': 'end' }}>Lorem ipsum dolor sit amet</Box>
    </Layers>
  );
};
