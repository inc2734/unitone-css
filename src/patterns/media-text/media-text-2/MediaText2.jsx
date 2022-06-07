import React from 'react';

import { Decorator } from '../../../layout-primitives/decorator/Decorator';
import { Container } from '../../../layout-primitives/container/Container';
import { Cover, CoverContent } from '../../../layout-primitives/cover/Cover';
import { Stack } from '../../../layout-primitives/stack/Stack';
import { WithSidebar } from '../../../layout-primitives/with-sidebar/WithSidebar';

export const MediaText2 = (props) => (
  <Decorator color={props.color}>
    <WithSidebar
      gap={2}
      contentMinWidth="min(100%, var(--unitone--measure) / 2)"
      sidebar="right"
      sidebarWidth="50%"
      alignItems="center"
    >
      <Cover noPadding minHeight="0">
        <CoverContent>
          <Container gutters={0} maxWidth="var(--unitone--measure)">
            <Stack gap={2}>
              {!!props.title && (
                <Stack style={{ '--unitone--font-size': 4 }}>
                  <h2>{props.title}</h2>
                </Stack>
              )}
              <Stack>{props.children}</Stack>
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
