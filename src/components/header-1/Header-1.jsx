import React from 'react';

import { Box } from '../../layout-primitives/box/Box';
import { Layers } from '../../layout-primitives/layers/Layers';
import { Cover, CoverContent } from '../../layout-primitives/cover/Cover';
import { Center } from '../../layout-primitives/center/Center';
import { Stack } from '../../layout-primitives/stack/Stack';

export const Header1 = (props) => (
  <Box backgroundColor={props.backgroundColor} color={props.color} padding={0}>
    <Layers>
      {!!props.src && <img src={props.src} alt="" />}
      <Cover>
        <CoverContent>
          <Stack>
            {!!props.title && (
              <Center maxWidth="var(--measure)" withText style={{ '--font-size': 6 }}>
                <h2>{props.title}</h2>
              </Center>
            )}
            <Center>{props.children}</Center>
          </Stack>
        </CoverContent>
      </Cover>
    </Layers>
  </Box>
);
