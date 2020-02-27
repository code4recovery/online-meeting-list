import React from "react";
import { Box, Divider, Heading, Text, Tag } from "@chakra-ui/core";
import { ButtonPrimary } from "./";

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
      bg="white"
      border="1px"
      borderColor="gray.100"
      p={5}
      rounded="md"
      shadow="md"
    >
      <Box alignItems="baseline" d={{ md: "flex" }} mb={4}>
        <Heading fontSize="xl">{meeting.name}</Heading>
        <Heading
          color="gray.400"
          fontSize="lg"
          fontWeight="normal"
          ml={{ md: 2 }}
        >
          {meeting.time}
        </Heading>
      </Box>
      {meeting.notes.length &&
        meeting.notes.map((paragraph: string, key: number) => (
          <Text key={key} mt={2}>
            {paragraph}
          </Text>
        ))}
      {meeting.url && (
        <ButtonPrimary
          icon="link"
          link={meeting.url}
          text={new URL(meeting.url).hostname.replace("www.", "")}
          title={"Visit " + meeting.url}
        />
      )}
      {meeting.phone && (
        <ButtonPrimary
          icon="phone"
          link={"tel:" + meeting.phone}
          text="Phone"
          title={"Call " + meeting.phone}
        />
      )}
      {meeting.email && (
        <ButtonPrimary
          icon="email"
          link={"mailto:" + meeting.email}
          text="Email"
          title={"Email " + meeting.email}
        />
      )}
      <Divider mt={4} />
      {meeting.tags.length &&
        meeting.tags.map((tag: string, index: number) => (
          <Tag
            bg="white"
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
  );
}
