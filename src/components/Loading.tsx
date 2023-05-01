import { Box, Spinner } from '@chakra-ui/react';

export function Loading() {
  return (
    <Box
      alignItems="center"
      display="flex"
      flexGrow={1}
      justifyContent="center"
    >
      <Spinner size="xl" />
    </Box>
  );
}
