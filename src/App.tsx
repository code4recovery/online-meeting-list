import { Suspense, useEffect, useState } from 'react';
import { Box, Grid } from '@chakra-ui/react';
import { Await, Outlet, useLoaderData } from 'react-router-dom';

import { Error, Filter, Loading } from './components';
import { Data, DataType, filter, i18n, Input, InputType } from './helpers';
import * as languages from './languages';

export const App = () => {
  const { load, ...data } = useLoaderData() as InputType & {
    load: Promise<DataType>;
  };
  const [input, setInput] = useState(data);

  // set html language attributes
  useEffect(() => {
    console.log('settin language attributes');
    document.documentElement.lang = input.language;
    document.documentElement.dir = languages[input.language].rtl
      ? 'rtl'
      : 'ltr';
  }, [input.language]);

  // update query string
  useEffect(() => {
    console.log('applyin query string');
    const url = new URL(window.location.href);
    url.searchParams.delete('tags');
    url.searchParams.delete('search');
    input.tags.forEach(tag => {
      url.searchParams.append('tags', tag);
    });
    if (input.searchWords.length) {
      url.searchParams.append('search', input.searchWords.join(' '));
    }
    window.history.pushState(null, '', url.toString());
  }, [input.tags, input.searchWords]);

  return (
    <i18n.Provider
      value={{
        language: input.language,
        rtl: languages[input.language].rtl,
        strings: languages[input.language].strings
      }}
    >
      <Input.Provider value={{ input, setInput }}>
        <Box
          as="main"
          display="flex"
          h="full"
          maxW={1240}
          mx="auto"
          p={{ base: 3, md: 6 }}
          w="full"
        >
          <Suspense fallback={<Loading />}>
            <Await resolve={load} errorElement={<Error />}>
              {load => (
                <Data.Provider
                  value={{
                    ...load,
                    filteredMeetings: filter(load.meetings, input)
                  }}
                >
                  <Grid
                    as="section"
                    gap={{ base: 3, md: 6 }}
                    templateColumns={{
                      md: 'auto 300px'
                    }}
                    w="full"
                  >
                    <Box as="section" order={{ base: 1, md: 2 }}>
                      <Filter />
                    </Box>
                    <Box order={{ base: 2, md: 1 }}>
                      <Outlet />
                    </Box>
                  </Grid>
                </Data.Provider>
              )}
            </Await>
          </Suspense>
        </Box>
      </Input.Provider>
    </i18n.Provider>
  );
};
