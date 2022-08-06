import { useContext } from 'react';
import { Alert, Box, Stack } from '@chakra-ui/react';

import { ButtonPrimary } from './ButtonPrimary';
import { i18n, State } from '../helpers';

export type NoResultsProps = {
  state: State;
  toggleTag: (filter: string, value: string, checked: boolean) => void;
  clearSearch: () => void;
};

export function NoResults({ state, toggleTag, clearSearch }: NoResultsProps) {
  const { strings } = useContext(i18n);

  //get currrently active filters
  const filters = Object.keys(state.filters)
    .map(filter =>
      state.filters[filter]
        .filter(({ checked }) => checked)
        .map(tag => [filter, tag.tag])
    )
    .flat();
  return (
    <Alert flexDirection="column" py={60} rounded="md" w="full">
      <Stack spacing={5} align="center">
        <Box>{strings.no_results}</Box>
        {state.search && (
          <ButtonPrimary
            icon="small-close"
            onClick={() => clearSearch()}
            text={strings.clear_search}
            title={strings.clear_search}
          />
        )}
        {filters.map(([filter, tag], index) => (
          <Box key={index}>
            <ButtonPrimary
              key={index}
              icon="small-close"
              onClick={() => toggleTag(filter, tag, false)}
              text={tag}
              title={tag}
            />
          </Box>
        ))}
        {}
      </Stack>
    </Alert>
  );
}
