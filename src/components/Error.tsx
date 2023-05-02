import { Box, CSSReset, ChakraProvider, Stack } from '@chakra-ui/react';
import { useAsyncError, useRouteError } from 'react-router-dom';
import { Icon } from './Icon';

export function Error() {
  const routeError = useRouteError();
  const asyncError = useAsyncError();
  return (
    <ChakraProvider>
      <CSSReset />
      <Box
        alignItems="center"
        bg="gray.50"
        display="flex"
        h="full"
        justifyContent="center"
        w="full"
      >
        <Stack alignItems="center" color="red.600">
          <Icon name="error" size={50} />
          <p>{routeError?.toString() || asyncError?.toString()}</p>
        </Stack>
      </Box>
    </ChakraProvider>
  );
}
