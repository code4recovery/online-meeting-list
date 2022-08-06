import { useContext } from 'react';
import { Box, Heading, Stack, Text, Tag } from '@chakra-ui/react';
import Highlighter from 'react-highlight-words';
import Linkify from 'react-linkify';

import { ButtonPrimary } from './ButtonPrimary';
import { Meeting as MeetingType, i18n } from '../helpers';

export type MeetingProps = {
  meeting: MeetingType;
  searchWords: string[];
  tags: string[];
};

export function Meeting({ meeting, searchWords, tags }: MeetingProps) {
  const { rtl, strings } = useContext(i18n);
  const days = [
    strings.sunday,
    strings.monday,
    strings.tuesday,
    strings.wednesday,
    strings.thursday,
    strings.friday,
    strings.saturday
  ];
  return (
    <Box
      as="article"
      bg="white"
      border="1px"
      borderColor="gray.300"
      mb={{ base: 3, md: 6 }}
      p={{ base: 3, md: 5 }}
      overflow="hidden"
      rounded="md"
      shadow="md"
      textAlign={rtl ? 'right' : 'left'}
    >
      <Stack spacing={3}>
        <Box alignItems="baseline">
          <Heading as="h2" display={{ lg: 'inline' }} fontSize="2xl">
            <Highlighter
              searchWords={searchWords}
              textToHighlight={meeting.name}
            />
          </Heading>
          <Heading
            as="h3"
            color="gray.600"
            display={{ lg: 'inline' }}
            fontSize="lg"
            fontWeight="normal"
            ml={{ lg: 2 }}
          >
            {!meeting.time
              ? strings.ongoing
              : days[meeting.time.day()] +
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
                  ? strings.telephone
                  : button.value;
              const title =
                button.icon === 'email'
                  ? strings.email_use.replace('{{value}}', button.value)
                  : button.icon === 'phone'
                  ? strings.telephone_use.replace('{{value}}', button.value)
                  : strings.video_use.replace('{{value}}', button.value);
              return (
                <Box
                  float={rtl ? 'right' : 'left'}
                  mr={rtl ? 0 : 2}
                  ml={rtl ? 2 : 0}
                  my={1}
                  key={index}
                >
                  <ButtonPrimary text={text} title={title} {...button} />
                </Box>
              );
            })}
          </Box>
        )}
        {!!meeting.notes.length && (
          <Stack spacing={3}>
            {meeting.notes.map((paragraph: string, key: number) => (
              <Text key={key} wordBreak="break-word">
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
                border="1px"
                borderColor={tags.includes(tag) ? 'gray.400' : 'gray.200'}
                borderRadius="base"
                color={tags.includes(tag) ? 'gray.700' : 'gray.600'}
                key={index}
                ml={rtl ? 2 : 0}
                mr={rtl ? 0 : 2}
                my={1}
                px={3}
                py={1}
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
