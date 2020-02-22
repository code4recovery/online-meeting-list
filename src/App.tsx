import React, { useState } from "react";

import { ThemeProvider, CSSReset, Box, Grid } from "@chakra-ui/core";
import * as moment from "moment-timezone";

import { Meeting } from "./types/Meeting";
import { jsonUrl, parseData } from "./helpers/google";
import { MeetingList } from "./components/MeetingList";
import { Filter } from "./components/Filter";

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
    </ThemeProvider>
  );
}
