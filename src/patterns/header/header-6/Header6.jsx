import React from 'react';

import { Box } from '../../../layout-primitives/box/Box';
import { Center } from '../../../layout-primitives/center/Center';
import { Container } from '../../../layout-primitives/container/Container';
import { Cover, CoverContent } from '../../../layout-primitives/cover/Cover';
import { Layers } from '../../../layout-primitives/layers/Layers';
import { Stack } from '../../../layout-primitives/stack/Stack';
import { Text } from '../../../layout-primitives/text/Text';

export const Header6 = (props) => (
  <Box backgroundColor={props.backgroundColor} color={props.color} padding={0}>
    <Layers cover>
      <Box padding={props.padding}>
        <Box
          backgroundColor="transparent"
          borderColor={props.borderColor}
          borderWidth="1px"
          padding={0}
        >
          <Cover minHeight={`calc(100vh - var(--s${props.padding}) * 2`}>
            <CoverContent>
              <Container gutters={0} text>
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
        </Box>
      </Box>
    </Layers>
  </Box>
);
