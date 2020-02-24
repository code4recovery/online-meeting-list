import React from "react";

import { Box, Button, Divider, Heading, Text, Tag } from "@chakra-ui/core";

export type Meeting = {
  name: string;
  start?: number;
  end?: number;
  time?: string;
  timezone: string;
  email: string;
  url: string;
  phone: string;
  notes: string[];
  tags: string[];
  updated: string;
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
      <Box d="flex" alignItems="baseline">
        <Heading fontSize="xl">{meeting.name}</Heading>
        <Heading fontSize="lg" color="gray.400" fontWeight="normal" ml="2">
          {meeting.time}
        </Heading>
      </Box>
      <Box mt={4}>
        {meeting.notes.length &&
          meeting.notes.map((paragraph: string, key: number) => (
            <Text key={key} mt={2}>
              {paragraph}
            </Text>
          ))}
        {meeting.url && (
          <Button
            leftIcon="link"
            mt={3}
            mr={2}
            size="sm"
            backgroundColor="blue.300"
            color="white"
            onClick={() => window.open(meeting.url, "_blank")}
          >
            {new URL(meeting.url).hostname.replace("www.", "")}
          </Button>
        )}
        {meeting.phone && (
          <Button
            leftIcon="phone"
            mt={3}
            mr={2}
            size="sm"
            backgroundColor="blue.300"
            color="white"
            title={meeting.phone}
            onClick={() => window.open("tel:" + meeting.phone, "_blank")}
          >
            Phone
          </Button>
        )}
        {meeting.email && (
          <Button
            leftIcon="email"
            mt={3}
            mr={2}
            size="sm"
            backgroundColor="blue.300"
            color="white"
            onClick={() => window.open("mailto:" + meeting.email, "_blank")}
          >
            Email
          </Button>
        )}
        <Divider mt={4} />
        {meeting.tags.length && (
          <Box mt={2} fontSize="sm">
            Tags:
            {meeting.tags.map((tag: string) => (
              <Tag
                mt={2}
                ml={2}
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
