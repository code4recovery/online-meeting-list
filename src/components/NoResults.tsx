import React, { useContext } from 'react';
import { Alert, Box, Stack } from '@chakra-ui/react';

import { ButtonPrimary } from './ButtonPrimary';
import { i18n, State } from '../helpers';

export type NoResultsProps = {
  state: State;
  toggleTag: (filter: string, value: string, checked: boolean) => void;
};

export function NoResults({ state, toggleTag }: NoResultsProps) {
  const { t } = useContext(i18n);

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
        <Box>{t('no_results')}</Box>
        {filters.map(([filter, tag], index) => (
          <Box key={index}>
            <ButtonPrimary
              key={index}
              icon="small-close"
              onClick={() => {
                toggleTag(filter, tag, false);
              }}
              text={tag}
              title={tag}
            />
          </Box>
        ))}
      </Stack>
    </Alert>
  );
}
