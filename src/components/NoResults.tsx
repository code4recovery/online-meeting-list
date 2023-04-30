import { Alert, Box, Stack } from '@chakra-ui/react';

import { Button } from './Button';
import { useI18n, useAppState } from '../helpers';

export function NoResults() {
  const { state, setState } = useAppState();
  const { strings } = useI18n();

  return (
    <Alert flexDirection="column" py={60} rounded="md" w="full">
      <Stack spacing={5} align="center">
        <Box>{strings.no_results}</Box>
        {!!state.searchWords.length && (
          <Button
            icon="small-close"
            onClick={() => setState({ ...state, searchWords: [] })}
            text={strings.clear_search}
            title={strings.clear_search}
          />
        )}
        {state.tags.map(value => (
          <Button
            key={value}
            icon="small-close"
            onClick={() =>
              setState({
                ...state,
                tags: state.tags.filter(tag => tag !== value)
              })
            }
            text={value}
            title={value}
          />
        ))}
        {}
      </Stack>
    </Alert>
  );
}
