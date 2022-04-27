import React from 'react';

import { Decorator } from '../../../layout-primitives/decorator/Decorator';
import { Container } from '../../../layout-primitives/container/Container';
import { Cover, CoverContent } from '../../../layout-primitives/cover/Cover';
import { Stack } from '../../../layout-primitives/stack/Stack';
import { Text } from '../../../layout-primitives/text/Text';
import { WithSidebar } from '../../../layout-primitives/with-sidebar/WithSidebar';

export const MediaText1 = (props) => (
  <Decorator color={props.color}>
    <WithSidebar
      gap={2}
      contentMinWidth="min(100%, var(--measure) / 2)"
      sidebar="left"
      sidebarWidth="50%"
      alignItems="center"
      revert
    >
      <Cover noPadding minHeight="0">
        <CoverContent>
          <Container gutters={0} maxWidth="var(--measure)">
            <Stack gap={2}>
              {!!props.title && (
                <Stack style={{ '--font-size': 4 }}>
                  <h2>{props.title}</h2>
                </Stack>
              )}
              <Text center>{props.children}</Text>
            </Stack>
          </Container>
        </CoverContent>
      </Cover>
      {!!props.src && (
        <div>
          <img src={props.src} alt="" />
        </div>
      )}
    </WithSidebar>
  </Decorator>
);
