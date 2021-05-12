import React, { useState } from 'react';
import { Box, CSSReset, Grid, ChakraProvider } from '@chakra-ui/react';
import InfiniteScroll from 'react-infinite-scroller';

import { Filter } from './components/Filter';
import { Loading } from './components/Loading';
import { Meeting } from './components/Meeting';
import { NoResults } from './components/NoResults';
import {
  Meeting as MeetingType,
  State,
  dataUrl,
  filter,
  getLanguage,
  i18n,
  isLanguageCode,
  languages,
  load,
  meetingsPerPage,
  setQuery
} from './helpers';

export default function App() {
  //check out query string
  const query = new URLSearchParams(window.location.search);
  const queryLang = query.get('lang');
  const language = isLanguageCode(queryLang) ? queryLang : getLanguage();
  const direction = languages[language].rtl ? 'rtl' : 'ltr';

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
    language: language,
    languages: []
  });

  //set html attributes
  document.documentElement.lang = language;
  document.documentElement.dir = direction;

  //function to remove a tag
  const toggleTag = (filter: string, value: string, checked: boolean): void => {
    //loop through and add the tag
    state.filters[filter].forEach(tag => {
      if (tag.tag === value) {
        tag.checked = checked;
      } else if (['days', 'formats', 'language'].includes(filter)) {
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
      .then(result => setState(load(result, query, state.language, t)));
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

  const t = (string?: string, value?: string): string => {
    if (!string) return '';
    const key = string.replaceAll(' ', '_').toLowerCase();
    const translations = languages[state.language].strings;
    const translation =
      translations.hasOwnProperty(key) &&
      typeof translations[key as keyof typeof translations] === 'string'
        ? translations[key as keyof typeof translations]
        : string;
    return value ? translation.replaceAll('{{value}}', value) : translation;
  };

  const [filteredMeetings, currentDays] = filter(state, tags, t);

  return (
    <i18n.Provider
      value={{
        language: state.language,
        rtl: languages[state.language].rtl,
        t: t
      }}
    >
      <ChakraProvider>
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
                <Filter
                  setSearch={(search: string[]) => {
                    setState({ ...state, search });
                  }}
                  setTimezone={(timezone: string) => {
                    setState({ ...state, timezone });
                  }}
                  state={state}
                  currentDays={currentDays}
                  toggleTag={toggleTag}
                />
              </Box>
              <Box order={{ base: 2, md: 1 }} overflow="hidden">
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
                        />
                      ))}
                  </InfiniteScroll>
                )}
              </Box>
            </Grid>
          </Box>
        )}
      </ChakraProvider>
    </i18n.Provider>
  );
}
