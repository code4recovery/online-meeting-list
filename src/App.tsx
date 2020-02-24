import React, { useState } from "react";

import {
  Box,
  CSSReset,
  Grid,
  Spinner,
  Stack,
  ThemeProvider
} from "@chakra-ui/core";
import * as moment from "moment-timezone";

import { Filter, Meeting } from "./components";
import { filterData, jsonUrl, parseData } from "./helpers";

type State = {
  filters: { [key: string]: string[] };
  loading: boolean;
  meetings: Meeting[];
  timezone: string;
};

export default function App() {
  const [state, setState] = useState<State>({
    filters: {
      Days: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      Times: ["Morning", "Midday", "Evening", "Night"],
      Formats: [],
      Types: []
    },
    loading: true,
    meetings: [],
    timezone: moment.tz.guess()
  });

  if (state.loading) {
    fetch(jsonUrl("1UwTJNdzpGHKL8Vuig37SBk_pYKlA9xJgjjfOGyAeD_4"))
      .then(result => {
        return result.json();
      })
      .then(result => {
        const { meetings, formats, types } = parseData(result);
        const timezone = moment.tz.guess();
        setState({
          filters: {
            Days: state.filters.Days,
            Times: state.filters.Times,
            Formats: formats,
            Types: types
          },
          loading: false,
          meetings: filterData(meetings, timezone),
          timezone: timezone
        });
      });
  }

  return (
    <ThemeProvider>
      <CSSReset />
      {state.loading ? (
        <Box
          backgroundColor="gray.50"
          height="100%"
          d="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Spinner size="xl" />
        </Box>
      ) : (
        <Box p={6} backgroundColor="gray.50">
          <Grid templateColumns={{ md: "auto 300px" }} gap={6}>
            <Stack spacing={8} shouldWrapChildren={true}>
              {state.meetings.map((meeting: Meeting) => (
                <Meeting meeting={meeting} />
              ))}
            </Stack>
            <Filter timezone={state.timezone} filters={state.filters} />
          </Grid>
        </Box>
      )}
    </ThemeProvider>
  );
}
