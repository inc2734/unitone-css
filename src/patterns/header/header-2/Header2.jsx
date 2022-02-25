import React from 'react';

import { Box } from '../../../layout-primitives/box/Box';
import { Center } from '../../../layout-primitives/center/Center';
import { Container } from '../../../layout-primitives/container/Container';
import { Section } from '../../../layout-primitives/section/Section';
import { Stack } from '../../../layout-primitives/stack/Stack';
import { Text } from '../../../layout-primitives/text/Text';

export const Header2 = (props) => (
  <Box backgroundColor={props.backgroundColor} color={props.color} padding={0}>
    <Section style={{ paddingBottom: 0 }}>
      <Stack gap={2}>
        <Container>
          <Stack gap={2}>
            {!!props.title && (
              <Center>
                <h2 style={{ '--font-size': 5 }}>{props.title}</h2>
              </Center>
            )}
            {!!props.children && <Text center>{props.children}</Text>}
          </Stack>
        </Container>

        {!!props.src && (
          <Center>
            <img src={props.src} alt="" style={{ marginBottom: 0 }} />
          </Center>
        )}
      </Stack>
    </Section>
  </Box>
);
