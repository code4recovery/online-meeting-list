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
        <Box p={{ xs: 3, md: 6 }} backgroundColor="gray.50">
          <Grid templateColumns={{ md: "auto 300px" }} gap={{ xs: 3, md: 6 }}>
            <Stack spacing={{ xs: 3, md: 6 }} shouldWrapChildren={true}>
              {filteredMeetings.map((meeting: Meeting, index: number) => (
                <Meeting key={index} meeting={meeting} />
              ))}
            </Stack>
            <Filter
              filters={state.filters}
              setSearch={(search: string) => {
                setState({ ...state, search });
              }}
              toggleTag={(filter: string, value: string, checked: boolean) => {
                //make sure it's removed
                state.filters[filter].forEach(tag => {
                  if (tag.tag === value) {
                    tag.checked = checked;
                  }
                });
                setState({ ...state });
              }}
              timezone={state.timezone}
            />
          </Grid>
        </Box>
      )}
    </ThemeProvider>
  );
}
