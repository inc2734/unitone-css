import React from 'react';

import { Decorator } from '../../../layout-primitives/decorator/Decorator';
import { Container } from '../../../layout-primitives/container/Container';
import { Cover, CoverContent } from '../../../layout-primitives/cover/Cover';
import { Layers } from '../../../layout-primitives/layers/Layers';
import { Stack } from '../../../layout-primitives/stack/Stack';
import { Text } from '../../../layout-primitives/text/Text';

export const Header4 = (props) => (
  <Decorator backgroundColor={props.backgroundColor} color={props.color}>
    <Layers cover>
      {!!props.src && <img src={props.src} alt="" />}
      <Cover>
        <CoverContent></CoverContent>
        <Container align="start" gutters={0} maxWidth="var(--unitone--measure)">
          <Stack gap={2}>
            {!!props.title && <h2 style={{ '--unitone--font-size': 4 }}>{props.title}</h2>}
            {!!props.children && <Text>{props.children}</Text>}
          </Stack>
        </Container>
      </Cover>
    </Layers>
  </Decorator>
);
