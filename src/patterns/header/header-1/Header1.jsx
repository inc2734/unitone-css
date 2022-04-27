import React from 'react';

import { Decorator } from '../../../layout-primitives/decorator/Decorator';
import { Center } from '../../../layout-primitives/center/Center';
import { Container } from '../../../layout-primitives/container/Container';
import { Cover, CoverContent } from '../../../layout-primitives/cover/Cover';
import { Layers } from '../../../layout-primitives/layers/Layers';
import { Stack } from '../../../layout-primitives/stack/Stack';
import { Text } from '../../../layout-primitives/text/Text';

export const Header1 = (props) => (
  <Decorator backgroundColor={props.backgroundColor} color={props.color}>
    <Layers cover>
      {!!props.src && <img src={props.src} alt="" />}
      <Cover>
        <CoverContent>
          <Container gutters={0} maxWidth="var(--measure)">
            <Stack gap={2}>
              {!!props.title && (
                <Center>
                  <h2 style={{ '--font-size': 5 }}>{props.title}</h2>
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
