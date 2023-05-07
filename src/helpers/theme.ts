import { extendTheme } from '@chakra-ui/react';

const initialColorMode = process.env.REACT_APP_COLOR_MODE ?? 'system';

export const theme = extendTheme({
  config: {
    initialColorMode,
    useSystemColorMode: initialColorMode === 'system'
  }
});
