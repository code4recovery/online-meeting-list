import { useEffect, useState } from 'react';
import { Box, CSSReset, ChakraProvider, Grid } from '@chakra-ui/react';
import { Outlet, useLoaderData, useSearchParams } from 'react-router-dom';

import { Filter } from './components';
import { AppState, State, filter, i18n, languages } from './helpers';

export const App = () => {
  const [state, setState] = useState(useLoaderData() as State);
  const [query] = useSearchParams();

  // set html langauge attributes
  useEffect(() => {
    document.documentElement.lang = state.language;
    document.documentElement.dir = languages[state.language].rtl
      ? 'rtl'
      : 'ltr';
  }, [state.language]);

  // listen to query string, set state
  useEffect(() => {
    const tags = Object.keys(state.filters)
      .filter(filter => query.has(filter))
      .map(filter => query.getAll(filter))
      .flat();

    const searchWords =
      query
        .get('search')
        ?.toLocaleLowerCase()
        .split(' ')
        .map(e => e.trim())
        .filter(e => e) || [];

    // get currently-checked tags
    setState(state => ({
      ...state,
      searchWords,
      tags,
      filteredMeetings: filter(
        state.meetings,
        searchWords,
        state.timezone,
        tags,
        languages[state.language].strings
      )
    }));
  }, [query, state.filters]);

  return (
    <i18n.Provider
      value={{
        language: state.language,
        rtl: languages[state.language].rtl,
        strings: languages[state.language].strings
      }}
    >
      <AppState.Provider value={{ state, setState }}>
        <ChakraProvider>
          <CSSReset />
          <Box
            as="main"
            maxW={1240}
            minH="100%"
            w="100%"
            mx="auto"
            p={{ base: 3, md: 6 }}
          >
            <Grid
              as="section"
              gap={{ base: 3, md: 6 }}
              templateColumns={{
                md: 'auto 300px'
              }}
            >
              <Box as="section" order={{ base: 1, md: 2 }}>
                <Filter />
              </Box>
              <Box order={{ base: 2, md: 1 }}>
                <Outlet />
              </Box>
            </Grid>
          </Box>
        </ChakraProvider>
      </AppState.Provider>
    </i18n.Provider>
  );
};
