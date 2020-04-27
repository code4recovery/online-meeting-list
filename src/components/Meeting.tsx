import React from 'react';
import { Box, Divider, Heading, Text, Tag } from '@chakra-ui/core';
import Highlighter from 'react-highlight-words';
import { Moment } from 'moment-timezone';
// @ts-ignore
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
      <Box alignItems="baseline" mb={2}>
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
          {!meeting.time ? 'Ongoing' : meeting.time.format('dddd h:mm a')}
        </Heading>
      </Box>
      {!!meeting.tags.length &&
        meeting.tags.map((tag: string, index: number) => (
          <Tag
            bg={tags.includes(tag) ? 'gray.300' : 'gray.100'}
            color={tags.includes(tag) ? 'gray.700' : 'gray.600'}
            key={index}
            mr={2}
            my={2}
            size="sm"
          >
            {tag}
          </Tag>
        ))}
      <Divider mb={0} role="separator" />
      {!!meeting.url && (
        <ButtonPrimary
          icon="link"
          link={meeting.url}
          text={new URL(meeting.url).hostname.replace('www.', '')}
          title={'Visit ' + meeting.url}
        />
      )}
      {!!meeting.phone && (
        <ButtonPrimary
          icon="phone"
          link={'tel:' + meeting.phone}
          text="Phone"
          title={'Call ' + meeting.phone}
        />
      )}
      {!!meeting.email && (
        <ButtonPrimary
          icon="email"
          link={'mailto:' + meeting.email}
          text="Email"
          title={'Email ' + meeting.email}
        />
      )}
      <Divider mt={4} role="separator" />
      {!!meeting.notes.length &&
        meeting.notes.map((paragraph: string, key: number) => (
          <Text key={key} mt={2}>
            <Linkify>{paragraph}</Linkify>
          </Text>
        ))}
    </Box>
  );
}
