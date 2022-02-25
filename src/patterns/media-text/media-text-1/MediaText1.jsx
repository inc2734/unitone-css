import React from 'react';

import { Box } from '../../../layout-primitives/box/Box';
import { Container } from '../../../layout-primitives/container/Container';
import { Cover, CoverContent } from '../../../layout-primitives/cover/Cover';
import { Stack } from '../../../layout-primitives/stack/Stack';
import { Text } from '../../../layout-primitives/text/Text';
import { WithSidebar } from '../../../layout-primitives/with-sidebar/WithSidebar';

export const MediaText1 = (props) => (
  <Box color={props.color} padding={0}>
    <WithSidebar
      gap={2}
      contentMinWidth="min(100%, var(--measure) / 2)"
      sidebar="left"
      sidebarWidth="50%"
      revert
    >
      <Cover noPadding minHeight="0">
        <CoverContent>
          <Container gutters={0} text>
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
  </Box>
);
