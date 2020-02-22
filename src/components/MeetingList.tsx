import React from "react";

import { Stack, Box, Heading, Text } from "@chakra-ui/core";

import { Meeting } from "../types";

type MeetingList = {
  meetings: Meeting[];
};

export function MeetingList(props: MeetingList) {
  return (
    <Stack spacing={8}>
      {props.meetings.map(meeting => (
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
  );
}
