import React from 'react';

import { Box } from '../../layout-primitives/box/Box';
import { Container } from '../../layout-primitives/container/Container';
import { Frame } from '../../layout-primitives/frame/Frame';
import { Layers } from '../../layout-primitives/layers/Layers';
import { ResponsiveGrid } from '../../layout-primitives/responsive-grid/ResponsiveGrid';
import { Section } from '../../layout-primitives/section/Section';

export const Feature2 = (props) => (
  <Section backgroundColor={props.backgroundColor} color={props.color}>
    <Container>
      {!!props.children && (
        <ResponsiveGrid columnMinWidth={props.columnMinWidth} gap={props.gap}>
          {props.children}
        </ResponsiveGrid>
      )}
    </Container>
  </Section>
);

export const Feature2Item = (props) => (
  <Layers>
    <Frame ratio="3 / 4">{!!props.src && <img src={props.src} alt="" />}</Frame>
    {!!props.children && (
      <div style={{ '--font-size': -1, '--align-self': 'end' }}>
        <Box padding={1}>{props.children}</Box>
      </div>
    )}
  </Layers>
);
