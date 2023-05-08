import {
  Box,
  CSSReset,
  ChakraProvider,
  Stack,
  useColorModeValue
} from '@chakra-ui/react';
import { useAsyncError, useRouteError } from 'react-router-dom';
import { Icon } from './Icon';

export function Error({ message }: { message?: string }) {
  const routeError = useRouteError();
  const asyncError = useAsyncError();

  const errorMessage = message
    ? message
    : routeError
    ? `${routeError}`
    : asyncError
    ? `${asyncError}`
    : 'Unknown error';
  return (
    <ChakraProvider>
      <CSSReset />
      <Box
        alignItems="center"
        bg={useColorModeValue('gray.50', 'gray.700')}
        display="flex"
        h="full"
        justifyContent="center"
        w="full"
        py={20}
      >
        <Stack
          alignItems="center"
          color={useColorModeValue('red.600', undefined)}
        >
          <Icon name="error" size={50} />
          <p>{errorMessage}</p>
        </Stack>
      </Box>
    </ChakraProvider>
  );
}
