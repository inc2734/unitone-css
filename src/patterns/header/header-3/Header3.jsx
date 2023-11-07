import React from 'react';

import { Decorator, Center, Container, Gutters, Stack, Text } from '@inc2734/unitone-css';

export const Header3 = (props) => (
  <Decorator backgroundColor={props.backgroundColor} color={props.color}>
    <Gutters>
      <Container>
        <Stack gap={2}>
          <Container align="start" gutters={0} maxWidth="var(--unitone--measure)">
            <Stack gap={2}>
              {!!props.title && <h2 style={{ '--unitone--font-size': 3 }}>{props.title}</h2>}
              {!!props.children && <Text>{props.children}</Text>}
            </Stack>
          </Container>
          {!!props.src && (
            <Center>
              <img src={props.src} alt="" />
            </Center>
          )}
        </Stack>
      </Container>
    </Gutters>
  </Decorator>
);
