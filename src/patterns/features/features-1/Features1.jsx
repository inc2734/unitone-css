import React from 'react';

import { Decorator } from '../../../layout-primitives/decorator/Decorator';
import { Center } from '../../../layout-primitives/center/Center';
import { Container } from '../../../layout-primitives/container/Container';
import { ResponsiveGrid } from '../../../layout-primitives/responsive-grid/ResponsiveGrid';
import { Gutters } from '../../../layout-primitives/gutters/Gutters';
import { Stack } from '../../../layout-primitives/stack/Stack';
import { Text } from '../../../layout-primitives/text/Text';

export const Feature1 = ({ items = [], ...props }) => (
  <Decorator backgroundColor={props.backgroundColor} color={props.color}>
    <Gutters>
      <Container>
        <Stack gap={props.gap}>
          {!!props.title && (
            <Center>
              <h2 style={{ '--unitone--font-size': 3 }}>{props.title}</h2>
            </Center>
          )}
          {0 < items.length && (
            <ResponsiveGrid columnMinWidth={props.columnMinWidth} gap={props.gap}>
              {items.map((item, index) => (
                <Stack key={index} gap={-1}>
                  {(!!item.src || !!item.title) && (
                    <Stack gap={-2}>
                      {!!item.src && (
                        <Center>
                          <img src={item.src} alt="" />
                        </Center>
                      )}
                      {!!item.title && (
                        <Center>
                          <h3 style={{ '--unitone--font-size': 1 }}>{item.title}</h3>
                        </Center>
                      )}
                    </Stack>
                  )}
                  {!!item.content && (
                    <Text style={{ '--unitone--font-size': -1 }}>
                      <p>{item.content}</p>
                    </Text>
                  )}
                </Stack>
              ))}
            </ResponsiveGrid>
          )}
        </Stack>
      </Container>
    </Gutters>
  </Decorator>
);
