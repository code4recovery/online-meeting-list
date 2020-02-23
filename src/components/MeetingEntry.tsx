import React from "react";

import { Meeting } from "../types";

import { Box, Divider, Heading, Text, Tag } from "@chakra-ui/core";

type MeetingEntry = {
  meeting: Meeting;
};

export function MeetingEntry({ meeting }: MeetingEntry) {
  return (
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
  );
}
