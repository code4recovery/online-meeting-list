import React from "react";

import { Box, Heading, Text, Tag } from "@chakra-ui/core";

export type Meeting = {
  name: string;
  time: string;
  email: string;
  url: string;
  notes: string[];
  tags: string[];
};

export function Meeting({ meeting }: { meeting: Meeting }) {
  return (
    <Box
      p={5}
      shadow="md"
      rounded="md"
      border="1px"
      borderColor="gray.100"
      backgroundColor="white"
    >
      <Heading fontSize="xl">{meeting.name}</Heading>
      <Box mt={4}>
        {meeting.notes.length &&
          meeting.notes.map((paragraph: string, key: number) => (
            <Text key={key} mt={2}>
              {paragraph}
            </Text>
          ))}
        {meeting.tags.length && (
          <Box mt={2}>
            {meeting.tags.map((tag: string) => (
              <Tag
                mt={2}
                mr={2}
                border="1px"
                borderColor="gray.200"
                color="gray.500"
                backgroundColor="white"
                size="sm"
              >
                {tag}
              </Tag>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
}
