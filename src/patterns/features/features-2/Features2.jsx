import React from 'react';

import { Decorator } from '../../../layout-primitives/decorator/Decorator';
import { Container } from '../../../layout-primitives/container/Container';
import { Frame } from '../../../layout-primitives/frame/Frame';
import { Layers } from '../../../layout-primitives/layers/Layers';
import { ResponsiveGrid } from '../../../layout-primitives/responsive-grid/ResponsiveGrid';
import { Gutters } from '../../../layout-primitives/gutters/Gutters';

export const Feature2 = ({ items = [], ...props }) => (
  <Decorator backgroundColor={props.backgroundColor} color={props.color}>
    <Gutters>
      <Container>
        {0 < items.length && (
          <ResponsiveGrid columnMinWidth={props.columnMinWidth} gap={props.gap}>
            {items.map((item, index) => (
              <Layers key={index}>
                <Frame ratio="3/4">{!!item.src && <img src={item.src} alt="" />}</Frame>
                {!!item.content && (
                  <div style={{ '--unitone--font-size': -1, '--unitone--align-self': 'end' }}>
                    <Decorator padding={1}>
                      <p>{item.content}</p>
                    </Decorator>
                  </div>
                )}
              </Layers>
            ))}
          </ResponsiveGrid>
        )}
      </Container>
    </Gutters>
  </Decorator>
);
