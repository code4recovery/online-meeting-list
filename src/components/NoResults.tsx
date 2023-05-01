import { Alert, Box, Stack } from '@chakra-ui/react';

import { Button } from './Button';
import { useI18n, useInput } from '../helpers';

export function NoResults() {
  const { input, setInput } = useInput();
  const { strings } = useI18n();

  return (
    <Alert flexDirection="column" py={60} rounded="md" w="full">
      <Stack spacing={5} align="center">
        <Box>{strings.no_results}</Box>
        {!!input.searchWords.length && (
          <Button
            icon="small-close"
            onClick={() => setInput({ ...input, searchWords: [] })}
            text={strings.clear_search}
            title={strings.clear_search}
          />
        )}
        {input.tags.map(value => (
          <Button
            key={value}
            icon="small-close"
            onClick={() =>
              setInput({
                ...input,
                tags: input.tags.filter(tag => tag !== value)
              })
            }
            text={value}
            title={value}
          />
        ))}
      </Stack>
    </Alert>
  );
}
