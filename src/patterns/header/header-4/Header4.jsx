import React from 'react';

import { Box } from '../../../layout-primitives/box/Box';
import { Container } from '../../../layout-primitives/container/Container';
import { Cover, CoverContent } from '../../../layout-primitives/cover/Cover';
import { Layers } from '../../../layout-primitives/layers/Layers';
import { Stack } from '../../../layout-primitives/stack/Stack';
import { Text } from '../../../layout-primitives/text/Text';

export const Header4 = (props) => (
  <Box backgroundColor={props.backgroundColor} color={props.color} padding={0}>
    <Layers cover>
      {!!props.src && <img src={props.src} alt="" />}
      <Cover gap={2}>
        <CoverContent></CoverContent>
        <Container align="start" gutters={0} maxWidth="var(--measure)">
          <Stack gap={2}>
            {!!props.title && <h2 style={{ '--font-size': 4 }}>{props.title}</h2>}
            {!!props.children && <Text>{props.children}</Text>}
          </Stack>
        </Container>
      </Cover>
    </Layers>
  </Box>
);
