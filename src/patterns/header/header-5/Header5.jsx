import React from 'react';

import { Box } from '../../../layout-primitives/box/Box';
import { Container } from '../../../layout-primitives/container/Container';
import { Cover, CoverContent } from '../../../layout-primitives/cover/Cover';
import { Layers } from '../../../layout-primitives/layers/Layers';
import { Stack } from '../../../layout-primitives/stack/Stack';
import { Text } from '../../../layout-primitives/text/Text';

export const Header5 = (props) => (
  <Box backgroundColor={props.backgroundColor} color={props.color} padding={0}>
    <Layers cover>
      {!!props.src && (
        <img
          src={props.src}
          alt=""
          style={{ width: 'calc(100% - var(--percentage5)', left: 'auto' }}
        />
      )}
      <Cover>
        <CoverContent>
          <Container align="start" text>
            <Stack gap={2}>
              {!!props.title && (
                <Stack style={{ '--font-size': 5 }}>
                  <h2>{props.title}</h2>
                </Stack>
              )}
              {!!props.children && <Text>{props.children}</Text>}
            </Stack>
          </Container>
        </CoverContent>
      </Cover>
    </Layers>
  </Box>
);
