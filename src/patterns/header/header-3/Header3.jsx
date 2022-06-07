import React from 'react';

import { Decorator } from '../../../layout-primitives/decorator/Decorator';
import { Center } from '../../../layout-primitives/center/Center';
import { Container } from '../../../layout-primitives/container/Container';
import { Gutters } from '../../../layout-primitives/gutters/Gutters';
import { Stack } from '../../../layout-primitives/stack/Stack';
import { Text } from '../../../layout-primitives/text/Text';

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
