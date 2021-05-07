import React, { useState } from 'react';
import { Box, CSSReset, Grid, ThemeProvider, theme } from '@chakra-ui/core';
import InfiniteScroll from 'react-infinite-scroller';

import { Filter } from './components/Filter';
import { Loading } from './components/Loading';
import { Meeting } from './components/Meeting';
import { NoResults } from './components/NoResults';
import { dataUrl, meetingsPerPage } from './helpers/config';
import { load } from './helpers/data';
import { Meeting as MeetingType, State } from './helpers/types';
import { getLanguage, Language } from './helpers/i18n';
import { filter } from './helpers/filter';
import { setQuery } from './helpers/query';

export default function App() {
  const [state, setState] = useState<State>({
    filters: {
      Days: [],
      Times: [],
      Formats: [],
      Types: []
    },
    limit: meetingsPerPage,
    loading: true,
    meetings: [],
    search: [],
    timezone: '',
    language: getLanguage()
  });

  //function to remove a tag
  const toggleTag = (filter: string, value: string, checked: boolean): void => {
    //loop through and add the tag
    state.filters[filter].forEach(tag => {
      if (tag.tag === value) {
        tag.checked = checked;
      } else if (['days', 'formats'].includes(filter)) {
        //if we're setting a tag or format, uncheck the others
        tag.checked = false;
      }
    });
    //this will cause a re-render; the actual filtering is done in filterData
    setState({ ...state });
  };

  if (state.loading) {
    //on first render, get data
    fetch(dataUrl)
      .then(result => result.json())
      .then(result => {
        setState(load(result));
      });
  } else {
    //on subsequent renders, set query string
    setQuery(state);
  }

  //get currently-checked tags
  const tags: string[] = Object.keys(state.filters)
    .map(filter => {
      return state.filters[filter]
        .filter(value => value.checked)
        .map(value => value.tag);
    })
    .flat();

  const filteredMeetings = filter(state, tags);

  const customTheme = {
    ...theme,
    icons: {
      ...theme.icons,
      video: {
        path: (
          <path
            fill="currentColor"
            d="M16 16c0 1.104-.896 2-2 2h-12c-1.104 0-2-.896-2-2v-8c0-1.104.896-2 2-2h12c1.104 0 2 .896 2 2v8zm8-10l-6 4.223v3.554l6 4.223v-12z"
          />
        )
      }
    }
  };

  return (
    <ThemeProvider theme={customTheme}>
      <CSSReset />
      {state.loading ? (
        <Loading />
      ) : (
        <Box
          as="main"
          maxW={1240}
          minH="100%"
          w="100%"
          mx="auto"
          p={{ xs: 3, md: 6 }}
        >
          <Grid
            as="section"
            gap={{ xs: 3, md: 6 }}
            templateColumns={{ md: 'auto 300px' }}
          >
            <Box as="section" order={{ xs: 1, md: 2 }}>
              <Filter
                setSearch={(search: string[]) => {
                  setState({ ...state, search });
                }}
                setTimezone={(timezone: string) => {
                  setState({ ...state, timezone });
                }}
                setLanguage={(language: Language) => {
                  setState({ ...state, language });
                }}
                state={state}
                toggleTag={toggleTag}
              />
            </Box>
            <Box order={{ xs: 2, md: 1 }} overflow="hidden">
              {!filteredMeetings.length && (
                <NoResults state={state} toggleTag={toggleTag} />
              )}
              {!!filteredMeetings.length && (
                <InfiniteScroll
                  loadMore={() => {
                    const limit = state.limit + meetingsPerPage;
                    setState({ ...state, limit });
                  }}
                  hasMore={filteredMeetings.length > state.limit}
                >
                  {filteredMeetings
                    .slice(0, state.limit)
                    .map((meeting: MeetingType, index: number) => (
                      <Meeting
                        key={index}
                        meeting={meeting}
                        search={state.search}
                        tags={tags}
                        language={state.language}
                      />
                    ))}
                </InfiniteScroll>
              )}
            </Box>
          </Grid>
        </Box>
      )}
    </ThemeProvider>
  );
}
