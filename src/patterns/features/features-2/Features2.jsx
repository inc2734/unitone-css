import React from 'react';

import { Box } from '../../../layout-primitives/box/Box';
import { Container } from '../../../layout-primitives/container/Container';
import { Frame } from '../../../layout-primitives/frame/Frame';
import { Layers } from '../../../layout-primitives/layers/Layers';
import { ResponsiveGrid } from '../../../layout-primitives/responsive-grid/ResponsiveGrid';
import { Section } from '../../../layout-primitives/section/Section';

export const Feature2 = ({ items = [], ...props }) => (
  <Box backgroundColor={props.backgroundColor} color={props.color} padding={0}>
    <Section>
      <Container>
        {0 < items.length && (
          <ResponsiveGrid columnMinWidth={props.columnMinWidth} gap={props.gap}>
            {items.map((item, index) => (
              <Layers key={index}>
                <Frame ratio="3/4">{!!item.src && <img src={item.src} alt="" />}</Frame>
                {!!item.content && (
                  <div style={{ '--font-size': -1, '--align-self': 'end' }}>
                    <Box padding={1}>
                      <p>{item.content}</p>
                    </Box>
                  </div>
                )}
              </Layers>
            ))}
          </ResponsiveGrid>
        )}
      </Container>
    </Section>
  </Box>
);
