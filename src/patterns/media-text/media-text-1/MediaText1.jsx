import React from 'react';

import {
  Decorator,
  Container,
  Cover,
  CoverContent,
  Stack,
  Text,
  WithSidebar,
} from '@inc2734/unitone-css';

export const MediaText1 = (props) => (
  <Decorator color={props.color}>
    <WithSidebar
      gap={2}
      contentMinWidth="min(100%, var(--unitone--measure) / 2)"
      sidebar="left"
      sidebarWidth="50%"
      alignItems="center"
      revert
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
