import React from "react";

import * as moment from "moment-timezone";

import { Box, Button, Heading, Text, Tag } from "@chakra-ui/core";

export type Meeting = {
  name: string;
  start?: moment.Moment;
  end?: moment.Moment;
  timezone: string;
  email: string;
  url: string;
  phone: string;
  accessCode: string;
  notes: string[];
  tags: string[];
};

export function Meeting({
  meeting,
  timezone
}: {
  meeting: Meeting;
  timezone: string;
}) {
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
          {meeting.start
            ? meeting.start
                .tz(timezone)
                .format("dddd, h:mma")
                .concat(
                  meeting.end
                    ? "–" + meeting.end.tz(timezone).format("h:mma")
                    : ""
                )
            : "Ongoing"}
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
            leftIcon="external-link"
            mt={3}
            mr={2}
            size="sm"
            backgroundColor="blue.300"
            color="white"
            onClick={() => window.open(meeting.url, "_blank")}
          >
            {new URL(meeting.url).hostname}
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
