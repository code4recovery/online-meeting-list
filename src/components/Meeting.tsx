import React from "react";

import { Box, Divider, Heading, Text, Tag } from "@chakra-ui/core";

export type Meeting = {
  name: string;
  time: string;
  notes: string;
  types: string[];
  formats: string[];
};

export function Meeting({ meeting }: { meeting: Meeting }) {
  return (
    <Box p={5} shadow="md" rounded="md" backgroundColor="white">
      <Heading fontSize="xl">{meeting.name}</Heading>
      <Box mt={4}>
        {meeting.notes.split("\n").map((paragraph: string, key: number) => (
          <Text key={key} mt={2}>
            {paragraph}
          </Text>
        ))}
      </Box>
      <Divider mt={4} />
      <Box>
        {meeting.formats.map((format: string) => (
          <Tag mt={2} mr={2}>
            {format}
          </Tag>
        ))}
      </Box>
    </Box>
  );
}
