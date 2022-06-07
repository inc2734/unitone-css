import React from 'react';

import { Decorator } from '../../../layout-primitives/decorator/Decorator';
import { Center } from '../../../layout-primitives/center/Center';
import { Container } from '../../../layout-primitives/container/Container';
import { Cover, CoverContent } from '../../../layout-primitives/cover/Cover';
import { Layers } from '../../../layout-primitives/layers/Layers';
import { Stack } from '../../../layout-primitives/stack/Stack';
import { Text } from '../../../layout-primitives/text/Text';

export const Header6 = (props) => (
  <Decorator backgroundColor={props.backgroundColor} color={props.color}>
    <Layers cover>
      <Decorator padding={props.padding}>
        <Decorator backgroundColor="transparent" borderColor={props.borderColor} borderWidth="1px">
          <Cover minHeight={`calc(100vh - var(--unitone--s${props.padding}) * 2`}>
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
        </Decorator>
      </Decorator>
    </Layers>
  </Decorator>
);
