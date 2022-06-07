import React from 'react';

import { Decorator } from '../../../layout-primitives/decorator/Decorator';
import { Center } from '../../../layout-primitives/center/Center';
import { Container } from '../../../layout-primitives/container/Container';
import { Gutters } from '../../../layout-primitives/gutters/Gutters';
import { Stack } from '../../../layout-primitives/stack/Stack';
import { Text } from '../../../layout-primitives/text/Text';

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
