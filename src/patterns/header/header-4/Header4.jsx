import React from 'react';

import {
  Decorator,
  Container,
  Cover,
  CoverContent,
  Layers,
  Stack,
  Text,
} from '@inc2734/unitone-css';

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
