import React from 'react';

import { Cluster } from '../Cluster';

export default {
  title: 'Components/Cluster',
  component: Cluster,
  argTypes: {
    gap: {
      options: [ -1, 0, 1, 2, 3, 4, 5, 6, 7, 8 ],
      control: { type: 'select' },
    },
    justify: {
      options: [ 'start', 'center', 'end' ],
      control: { type: 'select' },
    },
    align: {
      options: [ 'start', 'center', 'end' ],
      control: { type: 'select' },
    },
  },
  args: {
    gap: 0,
    justify: 'start',
    align: 'start',
  }
};

const Template = (args) => <Cluster { ...args }>
  <p>Lorem ipsum</p>
  <p>dolor sit</p>
  <p>amet consectetur</p>
  <p>adipisicing elit</p>
  <p>sed do</p>
</Cluster>;

export const Default = Template.bind({});

// const Template = (args) => (
//   <div data-layout="cluster" style={ { '--cluster--justify': 'space-between', '--cluster--align': 'center' } }>
//     <div>ロゴ</div>

//     <div data-layout="cluster">
//       <p>Lorem ipsum</p>
//       <p>dolor sit</p>
//       <p>amet consectetur</p>
//       <p>adipisicing elit</p>
//       <p>sed do</p>
//     </div>
//   </div>
// );

// export const Default = Template.bind({});
