import React from 'react';

import {
  Decorator,
  Center,
  Container,
  Cover,
  CoverContent,
  Layers,
  Stack,
  Text,
} from '@inc2734/unitone-css';

export const Header1 = (props) => (
  <Decorator backgroundColor={props.backgroundColor} color={props.color}>
    <Layers cover>
      {!!props.src && <img src={props.src} alt="" />}
      <Cover>
        <CoverContent>
          <Container gutters={0} maxWidth="var(--unitone--measure)">
            <Stack gap={2}>
              {!!props.title && (
                <Center>
                  <h2 style={{ '--unitone--font-size': 5 }}>{props.title}</h2>
                </Center>
              )}
              {!!props.children && <Text center>{props.children}</Text>}
            </Stack>
          </Container>
        </CoverContent>
      </Cover>
    </Layers>
  </Decorator>
);
