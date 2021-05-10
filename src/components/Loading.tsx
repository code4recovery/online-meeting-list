import React from 'react';
import { Box, Spinner } from '@chakra-ui/react';

export function Loading() {
  return (
    <Box alignItems="center" d="flex" height="100%" justifyContent="center">
      <Spinner size="xl" />
    </Box>
  );
}
