import {
  Box,
  Button as ChakraButton,
  Heading,
  Stack,
  Text,
  Tag,
  useColorModeValue
} from '@chakra-ui/react';
import Highlighter from 'react-highlight-words';
import Linkify from 'react-linkify';
import { Link } from 'react-router-dom';

import { Button } from './Button';
import { Icon } from './Icon';
import { Meeting as MeetingType, useI18n, useInput } from '../helpers';

export function Meeting({
  link,
  meeting
}: {
  link?: string;
  meeting: MeetingType;
}) {
  const { rtl, strings } = useI18n();
  const { input } = useInput();

  const tagDefault = useColorModeValue(
    {
      bg: 'gray.100',
      borderColor: 'gray.200',
      color: 'gray.600'
    },
    {
      bg: 'gray.800',
      borderColor: 'gray.700',
      color: 'gray.400'
    }
  );

  const tagActive = useColorModeValue(
    {
      bg: 'gray.300',
      borderColor: 'gray.400',
      color: 'gray.700'
    },
    {
      bg: 'gray.700',
      borderColor: 'gray.600',
      color: 'gray.300'
    }
  );

  const meetingTheme = useColorModeValue(
    {
      bg: 'white',
      borderColor: 'gray.300'
    },
    {
      bg: 'gray.900',
      borderColor: 'gray.800'
    }
  );

  const title = input.searchWords?.length ? (
    <Highlighter
      searchWords={input.searchWords}
      textToHighlight={meeting.name}
    />
  ) : (
    meeting.name
  );
  return (
    <Box
      {...meetingTheme}
      as="article"
      borderWidth="1px"
      mb={{ base: 3, md: 6 }}
      overflow="hidden"
      position="relative"
      rounded="md"
      shadow="md"
      textAlign={rtl ? 'right' : 'left'}
      w="full"
    >
      <Stack spacing={3} p={{ base: 3, md: 5 }}>
        <Box alignItems="baseline">
          <Heading
            as="h2"
            display={{ lg: 'inline' }}
            fontSize="2xl"
            _hover={
              link ? { cursor: 'pointer', textDecoration: 'underline' } : {}
            }
          >
            {link ? <Link to={link}>{title}</Link> : title}
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
              : strings.days[meeting.time.day()] +
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
                  <Button text={text} title={title} {...button} />
                </Box>
              );
            })}
          </Box>
        )}
        {!!meeting.notes?.length && (
          <Stack spacing={3}>
            {meeting.notes.map((paragraph: string, key: number) => (
              <Text key={key} wordBreak="break-word">
                <Linkify>{paragraph}</Linkify>
              </Text>
            ))}
          </Stack>
        )}
        {!!meeting.group_notes?.length && (
          <Stack spacing={3}>
            {meeting.group_notes.map((paragraph: string, key: number) => (
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
                {...(input.tags.includes(tag) ? tagActive : tagDefault)}
                borderRadius="base"
                borderWidth="1px"
                key={index}
                me={2}
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
      {meeting.edit_url && (
        <ChakraButton
          {...(rtl ? { left: -3 } : { right: -3 })}
          _hover={{ bg: 'transparent', color: 'gray.500' }}
          bg="transparent"
          color="gray.400"
          leftIcon={<Icon name="pencil" size={22} />}
          onClick={() => window.open(meeting.edit_url)}
          position="absolute"
          top={0}
        />
      )}
    </Box>
  );
}
