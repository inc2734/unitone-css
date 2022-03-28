import React from 'react';

import { Box } from '../../../layout-primitives/box/Box';
import { Center } from '../../../layout-primitives/center/Center';
import { Container } from '../../../layout-primitives/container/Container';
import { Section } from '../../../layout-primitives/section/Section';
import { Stack } from '../../../layout-primitives/stack/Stack';
import { Text } from '../../../layout-primitives/text/Text';

export const Header3 = (props) => (
  <Box backgroundColor={props.backgroundColor} color={props.color} padding={0}>
    <Section>
      <Container>
        <Stack gap={2}>
          <Container align="start" gutters={0} maxWidth="var(--measure)">
            <Stack gap={2}>
              {!!props.title && <h2 style={{ '--font-size': 3 }}>{props.title}</h2>}
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
    </Section>
  </Box>
);
