import React, { useState } from "react";

import {
  ThemeProvider,
  CSSReset,
  Stack,
  Box,
  CheckboxGroup,
  Checkbox,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  Text,
  Divider
} from "@chakra-ui/core";

import { formatJson, jsonUrl, Meeting } from "./helpers/google";

export default function App() {
  const [meetings, setMeetings] = useState<Meeting[]>([]);

  const formats = {
    email: "Email",
    chat: "Chat",
    video: "Video",
    phone: "Phone",
    forum: "Forum"
  };
  const formatsKeys = Object.keys(formats);

  fetch(jsonUrl("1UwTJNdzpGHKL8Vuig37SBk_pYKlA9xJgjjfOGyAeD_4"))
    .then(result => {
      return result.json();
    })
    .then(result => {
      setMeetings(formatJson(result));
    });

  return (
    <ThemeProvider>
      <CSSReset />
      <Grid templateColumns="70% 30%" gap={6} p={6}>
        <Box w="100%" h="10">
          <Stack spacing={8}>
            {meetings.map(meeting => (
              <Box p={5} shadow="md" borderWidth="1px" flex="1" rounded="md">
                <Heading fontSize="xl">{meeting.name}</Heading>
                <Box mt={4}>
                  {meeting.notes.split("\n").map((paragraph, key) => (
                    <Text key={key} mt={2}>
                      {paragraph}
                    </Text>
                  ))}
                </Box>
              </Box>
            ))}
          </Stack>
        </Box>
        <Box w="100%" h="10">
          <FormControl as="fieldset">
            <FormLabel as="legend" fontSize="lg" fontWeight="bold">
              Format
            </FormLabel>
            <Divider />
            <CheckboxGroup variantColor="green" defaultValue={formatsKeys}>
              {formatsKeys.map(format => (
                <Checkbox value={format}>
                  {formats[format as keyof typeof formats]}
                </Checkbox>
              ))}
            </CheckboxGroup>
          </FormControl>
        </Box>
      </Grid>
    </ThemeProvider>
  );
}
