import React, { useState } from "react";
import { Box, CSSReset, Grid, Heading, ThemeProvider } from "@chakra-ui/core";
import moment from "moment-timezone";
import InfiniteScroll from "react-infinite-scroller";

import { Filter, Loading, Meeting } from "./components";
import {
  endpointUrl,
  filterData,
  loadStateFromResult,
  meetingsPerPage,
  State,
  setQuery
} from "./helpers";

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
    timezone: moment.tz.guess()
  });

  if (state.loading) {
    //on first render, get data
    fetch(endpointUrl("1tYV4wBZkY_3hp0tresN6iZBCwOyqkK-dz4UAWQPI1Vs"))
      .then(result => result.json())
      .then(result => {
        setState(loadStateFromResult(result));
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

  const filteredMeetings = filterData(state, tags);

  return (
    <ThemeProvider>
      <CSSReset />
      {state.loading ? (
        <Loading />
      ) : (
        <Box as="main" minHeight="100%" p={{ xs: 3, md: 6 }}>
          <Heading as="h1" className="sr-only">
            Online Meeting Directory
          </Heading>
          <Grid
            as="section"
            gap={{ xs: 3, md: 6 }}
            templateColumns={{ md: "auto 300px" }}
          >
            <Box as="section" order={{ xs: 1, md: 2 }}>
              <Filter
                filters={state.filters}
                setSearch={(search: string[]) => {
                  setState({ ...state, search });
                }}
                setTimezone={(timezone: string) => {
                  setState({ ...state, timezone });
                }}
                toggleTag={(
                  filter: string,
                  value: string,
                  checked: boolean
                ) => {
                  //loop through and add the tag
                  state.filters[filter].forEach(tag => {
                    if (tag.tag === value) {
                      tag.checked = checked;
                    } else if (["days", "formats"].includes(filter)) {
                      //if we're setting a tag or format, uncheck the others
                      tag.checked = false;
                    }
                  });

                  //this will cause a re-render; the actual filtering is done in filterData
                  setState({ ...state });
                }}
                timezone={state.timezone}
              />
            </Box>
            <Box order={{ xs: 2, md: 1 }} overflow="hidden">
              <InfiniteScroll
                loadMore={() => {
                  const limit = state.limit + meetingsPerPage;
                  setState({ ...state, limit });
                }}
                hasMore={filteredMeetings.length > state.limit}
              >
                {filteredMeetings
                  .slice(0, state.limit)
                  .map((meeting: Meeting, index: number) => (
                    <Meeting
                      key={index}
                      meeting={meeting}
                      search={state.search}
                      tags={tags}
                    />
                  ))}
              </InfiniteScroll>
            </Box>
          </Grid>
        </Box>
      )}
    </ThemeProvider>
  );
}
