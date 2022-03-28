import React from 'react';

import { Box } from '../../../layout-primitives/box/Box';
import { Container } from '../../../layout-primitives/container/Container';
import { Cover, CoverContent } from '../../../layout-primitives/cover/Cover';
import { Stack } from '../../../layout-primitives/stack/Stack';
import { WithSidebar } from '../../../layout-primitives/with-sidebar/WithSidebar';

export const MediaText2 = (props) => (
  <Box color={props.color} padding={0}>
    <WithSidebar
      gap={2}
      contentMinWidth="min(100%, var(--measure) / 2)"
      sidebar="right"
      sidebarWidth="50%"
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
  </Box>
);
