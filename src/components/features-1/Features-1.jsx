import React from 'react';

import { Center } from '../../layout-primitives/center/Center';
import { Container } from '../../layout-primitives/container/Container';
import { ResponsiveGrid } from '../../layout-primitives/responsive-grid/ResponsiveGrid';
import { Section } from '../../layout-primitives/section/Section';
import { Stack } from '../../layout-primitives/stack/Stack';

export const Wrapper = (props) => (
  <Section backgroundColor={props.backgroundColor} color={props.color} padding={3 > props.gap && 3}>
    <Container gutters={props.gap}>
      <Stack gap={props.gap}>
        {!!props.title && (
          <Center>
            <h2 style={{ '--font-size': 2 }}>{props.title}</h2>
          </Center>
        )}
        {!!props.children && (
          <ResponsiveGrid columnMinWidth={props.columnMinWidth} gap={props.gap}>
            {props.children}
          </ResponsiveGrid>
        )}
      </Stack>
    </Container>
  </Section>
);

export const Item = (props) => (
  <Stack>
    {(!!props.src || !!props.title) && (
      <Stack gap={-1}>
        {!!props.src && (
          <Center>
            <img src={props.src} alt="" />
          </Center>
        )}
        {!!props.title && (
          <Center>
            <h3 style={{ '--font-size': 1 }}>{props.title}</h3>
          </Center>
        )}
      </Stack>
    )}
    {!!props.children && <div style={{ '--font-size': -1 }}>{props.children}</div>}
  </Stack>
);
