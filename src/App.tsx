import React, { useState } from "react";
import { Box, CSSReset, Grid, Stack, ThemeProvider } from "@chakra-ui/core";
import moment from "moment-timezone";

import { Filter, Loading, Meeting } from "./components";
import { filterData, googleSheetUrl, importGoogleSheet } from "./helpers";

type State = {
  filters: { [key: string]: string[] };
  loading: boolean;
  meetings: Meeting[];
  search: string;
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
    search: "",
    timezone: moment.tz.guess()
  });

  if (state.loading) {
    fetch(googleSheetUrl("1UwTJNdzpGHKL8Vuig37SBk_pYKlA9xJgjjfOGyAeD_4"))
      .then(result => {
        return result.json();
      })
      .then(result => {
        const { meetings, formats, types } = importGoogleSheet(result);
        setState({
          ...state,
          filters: { ...state.filters, Formats: formats, Types: types },
          loading: false,
          meetings: filterData(meetings, state.timezone)
        });
      });
  }

  return (
    <ThemeProvider>
      <CSSReset />
      {state.loading ? (
        <Loading />
      ) : (
        <Box p={{ xs: 3, md: 6 }} backgroundColor="gray.50">
          <Grid templateColumns={{ md: "auto 300px" }} gap={{ xs: 3, md: 6 }}>
            <Stack spacing={{ xs: 3, md: 6 }} shouldWrapChildren={true}>
              {state.meetings.map((meeting: Meeting, index: number) => (
                <Meeting key={index} meeting={meeting} />
              ))}
            </Stack>
            <Filter
              filters={state.filters}
              setSearch={(search: string) => {
                setState({ ...state, search });
              }}
              setTags={() => {}}
              timezone={state.timezone}
            />
          </Grid>
        </Box>
      )}
    </ThemeProvider>
  );
}
