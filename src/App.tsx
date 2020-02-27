import React, { useState } from "react";
import { Box, CSSReset, Grid, Stack, ThemeProvider } from "@chakra-ui/core";
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
    search: "",
    timezone: moment.tz.guess()
  });

  if (state.loading) {
    fetch(endpointUrl("1UwTJNdzpGHKL8Vuig37SBk_pYKlA9xJgjjfOGyAeD_4"))
      .then(result => result.json())
      .then(result => {
        setState(loadStateFromResult(result));
      });
  }

  const filteredMeetings = filterData(state);

  return (
    <ThemeProvider>
      <CSSReset />
      {state.loading ? (
        <Loading />
      ) : (
        <Box bg="gray.50" minHeight="100%" p={{ xs: 3, md: 6 }}>
          <Grid gap={{ xs: 3, md: 6 }} templateColumns={{ md: "auto 300px" }}>
            <Stack
              order={{ xs: 2, md: 1 }}
              shouldWrapChildren={true}
              spacing={{ xs: 3, md: 6 }}
            >
              {filteredMeetings.map((meeting: Meeting, index: number) => (
                <Meeting key={index} meeting={meeting} />
              ))}
            </Stack>
            <Box order={{ xs: 1, md: 2 }}>
              <Filter
                filters={state.filters}
                setSearch={(search: string) => {
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
          </Grid>
        </Box>
      )}
    </ThemeProvider>
  );
}
