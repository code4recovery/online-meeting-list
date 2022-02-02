import React from 'react';
import { Box, Heading, Stack, Text, Tag } from '@chakra-ui/core';
import Highlighter from 'react-highlight-words';
import { Moment } from 'moment-timezone';
import Linkify from 'react-linkify';

import { ButtonPrimary, ButtonPrimaryProps } from './ButtonPrimary';

export type Meeting = {
  name: string;
  time?: Moment;
  buttons: ButtonPrimaryProps[];
  notes: string[];
  tags: string[];
  updated: string;
  search: string;
};

export function Meeting({
  meeting,
  search,
  tags
}: {
  meeting: Meeting;
  search: string[];
  tags: string[];
}) {
  return (
    <Box
      as="article"
      bg="white"
      border="1px"
      borderColor="gray.300"
      mb={{ xs: 3, md: 6 }}
      p={5}
      rounded="md"
      shadow="md"
    >
      <Stack spacing={3}>
        <Box alignItems="baseline">
          <Heading as="h2" d={{ lg: 'inline' }} fontSize="2xl">
            <Highlighter searchWords={search} textToHighlight={meeting.name} />
          </Heading>
          <Heading
            as="h3"
            color="gray.600"
            d={{ lg: 'inline' }}
            fontSize="lg"
            fontWeight="normal"
            ml={{ lg: 2 }}
          >
            {!meeting.time ? 'Ongoing' : meeting.time.format('dddd h:mm a')}
          </Heading>
        </Box>
        {!!meeting.buttons.length && (
          <Box>
            {meeting.buttons.map((button, index) => (
              <Box float="left" mr={2} my={1} key={index}>
                <ButtonPrimary {...button} />
              </Box>
            ))}
          </Box>
        )}
        {!!meeting.notes.length && (
          <Stack spacing={3}>
            {meeting.notes.map((paragraph: string, key: number) => (
              <Text key={key} overflowWrap="anywhere">
                <Linkify>{paragraph}</Linkify>
              </Text>
            ))}
          </Stack>
        )}
        {!!meeting.tags.length && (
          <Box>
            {meeting.tags.map((tag: string, index: number) => (
              <Tag
                bg={tags.includes(tag) ? 'gray.300' : 'gray.100'}
                color={tags.includes(tag) ? 'gray.700' : 'gray.600'}
                key={index}
                mr={2}
                my={1}
                size="sm"
              >
                {tag}
              </Tag>
            ))}
          </Box>
        )}
      </Stack>
    </Box>
  );
}
