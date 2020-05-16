import React from 'react';
import { Box, Heading, Stack, Text, Tag } from '@chakra-ui/core';
import Highlighter from 'react-highlight-words';
import { Moment } from 'moment-timezone';
import Linkify from 'react-linkify';

import { ButtonPrimary } from './';

export type Meeting = {
  name: string;
  time?: Moment;
  email: string;
  url: string;
  phone: string;
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
      borderColor="gray.200"
      mb={{ xs: 3, md: 6 }}
      p={5}
      rounded="md"
      shadow="md"
    >
      <Stack spacing={3}>
        <Box alignItems="baseline">
          <Heading d={{ lg: 'inline' }} fontSize="2xl">
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
            {!meeting.time ? 'Ongoing' : meeting.time.format('dddd HH:mm')}
          </Heading>
        </Box>
        <Box>
          {!!meeting.url && (
            <Box float="left" mr={2} my={1}>
              <ButtonPrimary
                icon="link"
                onClick={() => {
                  window.open(meeting.url, '_blank');
                }}
                text={new URL(meeting.url).hostname.replace('www.', '')}
                title={'Visit ' + meeting.url}
              />
            </Box>
          )}
          {!!meeting.phone && (
            <Box float="left" mr={2} my={1}>
              <ButtonPrimary
                icon="phone"
                onClick={() => {
                  window.open('tel:' + meeting.phone, '_blank');
                }}
                text="Phone"
                title={'Call ' + meeting.phone}
              />
            </Box>
          )}
          {!!meeting.email && (
            <Box float="left" mr={2} my={1}>
              <ButtonPrimary
                icon="email"
                onClick={() => {
                  window.open('mailto:' + meeting.email, '_blank');
                }}
                text="Email"
                title={'Email ' + meeting.email}
              />
            </Box>
          )}
        </Box>
        {!!meeting.notes.length && (
          <Stack spacing={2}>
            {meeting.notes.map((paragraph: string, key: number) => (
              <Text key={key}>
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
