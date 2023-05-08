import { Box, Spinner } from '@chakra-ui/react';

export function Loading() {
  return (
    <Box
      alignItems="center"
      display="flex"
      flexGrow={1}
      h="full"
      justifyContent="center"
    >
      <Spinner size="xl" />
    </Box>
  );
}
