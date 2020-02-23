import React from "react";

import { Box, Divider, Heading, Stack, Text, Tag } from "@chakra-ui/core";

import { Meeting } from "../types";

type MeetingList = {
  meetings: Meeting[];
};

export function MeetingList(props: MeetingList) {
  return (
    <Stack spacing={8}>
      {props.meetings.map(meeting => (
        <Box p={5} shadow="md" rounded="md" backgroundColor="white">
          <Heading fontSize="xl">{meeting.name}</Heading>
          <Box mt={4}>
            {meeting.notes.split("\n").map((paragraph, key) => (
              <Text key={key} mt={2}>
                {paragraph}
              </Text>
            ))}
          </Box>
          <Divider mt={4} />
          <Box>
            {meeting.formats.map(format => (
              <Tag mt={2} mr={2}>
                {format}
              </Tag>
            ))}
          </Box>
        </Box>
      ))}
    </Stack>
  );
}
