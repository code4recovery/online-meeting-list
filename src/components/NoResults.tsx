import React from 'react';
import { Alert, Box, Stack } from '@chakra-ui/core';

import { ButtonPrimary } from './ButtonPrimary';
import { State } from '../helpers/data';

type NoResults = {
  state: State;
  toggleTag: (filter: string, value: string, checked: boolean) => void;
};

export function NoResults({ state, toggleTag }: NoResults) {
  //get currrently active filters
  const filters = Object.keys(state.filters)
    .map(filter =>
      state.filters[filter]
        .filter(tag => tag.checked)
        .map(tag => [filter, tag.tag])
    )
    .flat();
  return (
    <Alert flexDirection="column" py={60} rounded="md">
      <Stack spacing={5} align="center">
        <Box>No results match the selected filters:</Box>
        {filters.map(([filter, tag], index) => (
          <Box>
            <ButtonPrimary
              key={index}
              icon="small-close"
              onClick={() => {
                toggleTag(filter, tag, false);
              }}
              text={tag}
            />
          </Box>
        ))}
      </Stack>
    </Alert>
  );
}
