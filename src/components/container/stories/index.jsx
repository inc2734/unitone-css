import React from 'react';

import { Container } from '../Container';

export default {
  title: 'Components/Container',
  component: Container,
};

const Template = (args) => <Container { ...args }>
  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cill</p>
</Container>;

export const Default = Template.bind({});
Default.args = {
  padding: '0',
};
