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
import { Group } from './Group';
import { Icon } from './Icon';
import {
  Meeting as MeetingType,
  MeetingLink,
  formatTime,
  useI18n,
  useInput
} from '../helpers';

export function Meeting({
  link,
  meeting
}: {
  link?: string;
  meeting: MeetingType;
}) {
  const {
    //conference_phone_notes,
    //conference_url_notes,
    conference_phone,
    conference_provider,
    conference_url,
    edit_url,
    group_id,
    name,
    notes,
    start,
    tags
  } = meeting;
  const { rtl, strings } = useI18n();
  const { input } = useInput();

  const buttons: MeetingLink[] = [];
  if (conference_provider) {
    buttons.push({
      icon: 'video',
      value: conference_provider,
      onClick: () => window.open(conference_url)
    });
  }
  if (conference_phone) {
    buttons.push({
      icon: 'phone',
      value: strings.telephone,
      onClick: () => window.open(`tel:${conference_phone}`)
    });
  }

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
    <Highlighter searchWords={input.searchWords} textToHighlight={name} />
  ) : (
    name
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
      <Stack spacing={4} p={{ base: 3, md: 5 }}>
        <Box
          alignItems="baseline"
          display="flex"
          gap={{ lg: 3 }}
          flexDirection={{ base: 'column', lg: 'row' }}
        >
          <Heading
            as="h2"
            fontSize="2xl"
            _hover={
              link ? { cursor: 'pointer', textDecoration: 'underline' } : {}
            }
          >
            {link ? <Link to={link}>{title}</Link> : title}
          </Heading>
          <Heading as="h3" color="gray.600" fontSize="lg" fontWeight="normal">
            {formatTime(strings, start)}
          </Heading>
        </Box>
        {!!buttons.length && (
          <Box>
            {buttons.map((button, index) => {
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
        {!!notes?.length && (
          <Stack spacing={1}>
            {notes.map((paragraph: string, key: number) => (
              <Text key={key} wordBreak="break-word">
                <Linkify>{paragraph}</Linkify>
              </Text>
            ))}
          </Stack>
        )}
        {!!group_id && <Group meeting={meeting} />}
        {!!tags.length && (
          <Box pt={1}>
            {tags.map((tag: string, index: number) => (
              <Tag
                bg="transparent"
                borderRadius="base"
                borderWidth="1px"
                key={index}
                me={2}
                my={1}
                opacity={input.tags.includes(tag) ? 1 : 0.5}
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
      {edit_url && (
        <ChakraButton
          {...(rtl ? { left: -3 } : { right: -3 })}
          _hover={{ bg: 'transparent', color: 'gray.500' }}
          bg="transparent"
          color="gray.400"
          leftIcon={<Icon name="pencil" size={22} />}
          onClick={() => window.open(edit_url)}
          position="absolute"
          top={0}
        />
      )}
    </Box>
  );
}
