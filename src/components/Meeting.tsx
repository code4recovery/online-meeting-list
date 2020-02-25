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
      border="1px"
      borderColor="gray.100"
      backgroundColor="white"
      p={5}
      rounded="md"
      shadow="md"
    >
      <Box d={{ md: "flex" }} alignItems="baseline">
        <Heading fontSize="xl">{meeting.name}</Heading>
        <Heading
          color="gray.400"
          ml={{ md: 2 }}
          fontSize="lg"
          fontWeight="normal"
        >
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
            backgroundColor="blue.300"
            color="white"
            leftIcon="link"
            mr={2}
            mt={3}
            onClick={() => window.open(meeting.url, "_blank")}
            size="sm"
            title={"Visit " + meeting.url}
          >
            {new URL(meeting.url).hostname.replace("www.", "")}
          </Button>
        )}
        {meeting.phone && (
          <Button
            backgroundColor="blue.300"
            color="white"
            leftIcon="phone"
            onClick={() => window.open("tel:" + meeting.phone, "_blank")}
            mr={2}
            mt={3}
            size="sm"
            title={"Call " + meeting.phone}
          >
            Phone
          </Button>
        )}
        {meeting.email && (
          <Button
            backgroundColor="blue.300"
            color="white"
            leftIcon="email"
            mr={2}
            mt={3}
            onClick={() => window.open("mailto:" + meeting.email, "_blank")}
            size="sm"
            title={"Email " + meeting.email}
          >
            Email
          </Button>
        )}
        <Divider mt={4} />
        {meeting.tags.length && (
          <Box mt={2} fontSize="sm">
            {meeting.tags.map((tag: string, index: number) => (
              <Tag
                backgroundColor="white"
                border="1px"
                borderColor="gray.200"
                color="gray.500"
                key={index}
                mr={2}
                mt={2}
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
