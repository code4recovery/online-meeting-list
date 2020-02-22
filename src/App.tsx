import React, { useState } from "react";

import { Box, CSSReset, Grid, Spinner, ThemeProvider } from "@chakra-ui/core";
import * as moment from "moment-timezone";

import { Filter, MeetingList } from "./components";
import { jsonUrl, parseData } from "./helpers";
import { Meeting } from "./types";

type State = {
  loading: boolean;
  meetings: Meeting[];
  formats: string[];
  timezone: string;
  types: string[];
};

export default function App() {
  const [state, setState] = useState<State>({
    formats: [],
    loading: true,
    meetings: [],
    timezone: moment.tz.guess(),
    types: []
  });

  if (state.loading) {
    fetch(jsonUrl("1UwTJNdzpGHKL8Vuig37SBk_pYKlA9xJgjjfOGyAeD_4"))
      .then(result => {
        return result.json();
      })
      .then(result => {
        const { meetings, formats, types } = parseData(result);
        setState({
          loading: false,
          meetings: meetings,
          formats: formats,
          timezone: moment.tz.guess(),
          types: types
        });
      });
  }

  return (
    <ThemeProvider>
      <CSSReset />
      {state.loading ? (
        <Box height="100%" d="flex" alignItems="center" justifyContent="center">
          <Spinner size="xl" />
        </Box>
      ) : (
        <Box p={6}>
          <Grid templateColumns="auto 300px" gap={6}>
            <MeetingList meetings={state.meetings} />
            <Filter
              timezone={state.timezone}
              formats={state.formats}
              types={state.types}
            />
          </Grid>
        </Box>
      )}
    </ThemeProvider>
  );
}
