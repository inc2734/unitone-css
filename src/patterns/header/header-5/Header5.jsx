import React from 'react';

import { Decorator } from '../../../layout-primitives/decorator/Decorator';
import { Container } from '../../../layout-primitives/container/Container';
import { Cover, CoverContent } from '../../../layout-primitives/cover/Cover';
import { Layers } from '../../../layout-primitives/layers/Layers';
import { Stack } from '../../../layout-primitives/stack/Stack';
import { Text } from '../../../layout-primitives/text/Text';

export const Header5 = (props) => (
  <Decorator backgroundColor={props.backgroundColor} color={props.color}>
    <Layers cover>
      {!!props.src && (
        <img src={props.src} alt="" style={{ width: 'var(--unitone--pg10)', left: 'auto' }} />
      )}
      <Cover>
        <CoverContent>
          <Container align="start" gutters={0} maxWidth="var(--unitone--measure)">
            <Stack gap={2}>
              {!!props.title && (
                <Stack style={{ '--unitone--font-size': 5 }}>
                  <h2>{props.title}</h2>
                </Stack>
              )}
              {!!props.children && <Text>{props.children}</Text>}
            </Stack>
          </Container>
        </CoverContent>
      </Cover>
    </Layers>
  </Decorator>
);
