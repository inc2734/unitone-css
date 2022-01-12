import React from 'react';

import { Container } from '../Container';
import { Text } from '../../text/Text';

export default {
  title: 'Components/Container',
  component: Container,
};

export const Default = (args) => {
  return (
    <Container { ...args }>
      <Text>
        <h2>Lorem ipsum dolor sit amet, consectetur adipisicing elit</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cill</p>

        <h3>Lorem ipsum dolor sit amet, consectetur adipisicing elit</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cill</p>
      </Text>
    </Container>
  );
};
