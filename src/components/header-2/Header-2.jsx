import React from 'react';

import { Box } from '../../layout-primitives/box/Box';
import { Center } from '../../layout-primitives/center/Center';
import { Container } from '../../layout-primitives/container/Container';
import { Section } from '../../layout-primitives/section/Section';
import { Stack } from '../../layout-primitives/stack/Stack';

export const Header2 = (props) => (
  <Box backgroundColor={props.backgroundColor} color={props.color} padding={0}>
    <Section style={{ paddingBottom: 0 }}>
      <Container>
        <Stack gap={4}>
          <Stack gap={3}>
            {!!props.title && (
              <Center maxWidth="var(--measure)" withText style={{ '--font-size': 6 }}>
                <h2>{props.title}</h2>
              </Center>
            )}
            <Center>{props.children}</Center>
          </Stack>
          {!!props.src && (
            <Center>
              <img src={props.src} alt="" style={{ margin: 0 }} />
            </Center>
          )}
        </Stack>
      </Container>
    </Section>
  </Box>
);
