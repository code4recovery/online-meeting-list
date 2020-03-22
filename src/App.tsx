import React, { useState } from "react";
import {
  Box,
  CSSReset,
  Grid,
  Heading,
  Stack,
  ThemeProvider
} from "@chakra-ui/core";
import moment from "moment-timezone";

import { Filter, Loading, Meeting } from "./components";
import { endpointUrl, filterData, loadStateFromResult, State } from "./helpers";

export default function App() {
  const [state, setState] = useState<State>({
    filters: {
      Days: [],
      Times: [],
      Formats: [],
      Types: []
    },
    loading: true,
    meetings: [],
    search: [],
    timezone: moment.tz.guess()
  });

  if (state.loading) {
    fetch(endpointUrl("1tYV4wBZkY_3hp0tresN6iZBCwOyqkK-dz4UAWQPI1Vs"))
      .then(result => result.json())
      .then(result => {
        setState(loadStateFromResult(result));
      });
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
                  //make sure it's removed
                  state.filters[filter].forEach(tag => {
                    if (tag.tag === value) {
                      tag.checked = checked;
                    }
                  });

                  //this will cause a re-render; the actual filtering is done in filterData
                  setState({ ...state });
                }}
                timezone={state.timezone}
              />
            </Box>
            <Stack
              maxWidth="100%"
              order={{ xs: 2, md: 1 }}
              overflow="hidden"
              shouldWrapChildren={true}
              spacing={{ xs: 3, md: 6 }}
            >
              {filteredMeetings.map((meeting: Meeting, index: number) => (
                <Meeting
                  key={index}
                  meeting={meeting}
                  search={state.search}
                  tags={tags}
                />
              ))}
            </Stack>
          </Grid>
        </Box>
      )}
    </ThemeProvider>
  );
}
