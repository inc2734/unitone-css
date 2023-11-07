import React from 'react';

import { Decorator, Center, Container, Gutters, Stack, Text } from '@inc2734/unitone-css';

export const Header2 = (props) => (
  <Decorator backgroundColor={props.backgroundColor} color={props.color}>
    <Gutters style={{ paddingBottom: 0 }}>
      <Stack gap={2}>
        <Container>
          <Stack gap={2}>
            {!!props.title && (
              <Center>
                <h2 style={{ '--unitone--font-size': 5 }}>{props.title}</h2>
              </Center>
            )}
            {!!props.children && <Text center>{props.children}</Text>}
          </Stack>
        </Container>

        {!!props.src && (
          <Center>
            <img src={props.src} alt="" style={{ marginBottom: 0 }} />
          </Center>
        )}
      </Stack>
    </Gutters>
  </Decorator>
);
