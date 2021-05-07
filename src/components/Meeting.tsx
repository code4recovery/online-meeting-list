import React from 'react';
import { Box, Heading, Stack, Text, Tag } from '@chakra-ui/core';
import Highlighter from 'react-highlight-words';
import Linkify from 'react-linkify';

import { ButtonPrimary } from './ButtonPrimary';
import { getStrings } from '../helpers/i18n';

import { Meeting as MeetingType } from '../helpers/types';
import { Language } from '../helpers/i18n';

export function Meeting({
  meeting,
  search,
  tags,
  language
}: {
  meeting: MeetingType;
  search: string[];
  tags: string[];
  language: Language;
}) {
  const strings = getStrings(language);
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
            {!meeting.time
              ? strings.ongoing
              : strings.days[
                  meeting.time.format('d') as keyof typeof strings.days
                ] +
                ' ' +
                meeting.time.format('LT').toLocaleLowerCase()}
          </Heading>
        </Box>
        {!!meeting.buttons.length && (
          <Box>
            {meeting.buttons.map((button, index) => {
              const text =
                button.icon === 'email'
                  ? strings.email
                  : button.icon === 'phone'
                  ? strings.phone
                  : button.value;
              const title =
                button.icon === 'email'
                  ? strings.email_use.replace('{{value}}', button.value)
                  : button.icon === 'phone'
                  ? strings.phone_use.replace('{{value}}', button.value)
                  : strings.video_use.replace('{{value}}', button.value);
              return (
                <Box float="left" mr={2} my={1} key={index}>
                  <ButtonPrimary text={text} title={title} {...button} />
                </Box>
              );
            })}
          </Box>
        )}
        {!!meeting.notes.length && (
          <Stack spacing={3}>
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
