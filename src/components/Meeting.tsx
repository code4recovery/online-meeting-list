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
  useData,
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
    conference_phone_notes,
    conference_url_notes,
    conference_phone,
    conference_provider,
    conference_url,
    edit_url,
    group_id,
    name,
    start,
    tags
  } = meeting;
  const { rtl, strings } = useI18n();
  const { input, isAdmin } = useInput();
  const { groups } = useData();
  const group = groups[group_id as keyof typeof groups];
  const notes = [...(group?.notes ?? []), ...(meeting.notes ?? [])];

  const buttons: Array<MeetingLink & { notes?: string }> = [];
  if (conference_provider && conference_url) {
    buttons.push({
      icon: 'video',
      value: conference_provider,
      onClick: () => window.open(conference_url),
      notes: conference_url_notes,
      title: strings.video_use.replace('{{value}}', conference_url)
    });
  }
  if (conference_phone) {
    buttons.push({
      icon: 'phone',
      value: strings.telephone,
      onClick: () => window.open(`tel:${conference_phone}`),
      notes: conference_phone_notes,
      title: strings.telephone_use.replace('{{value}}', conference_phone)
    });
  }

  const title = input.searchWords?.length ? (
    <Highlighter searchWords={input.searchWords} textToHighlight={name} />
  ) : (
    name
  );

  return (
    <Box
      as="article"
      bg={useColorModeValue('white', 'gray.800')}
      borderColor={useColorModeValue('gray.300', 'gray.800')}
      borderWidth={1}
      mb={{ base: 5, md: 6 }}
      position="relative"
      rounded="md"
      shadow="md"
      textAlign={rtl ? 'right' : 'left'}
      w="full"
    >
      <Stack spacing={5} p={{ base: 3, md: 5 }}>
        <Box
          alignItems="baseline"
          display="flex"
          flexDirection={{ base: 'column', lg: 'row' }}
          flexWrap="wrap"
          gap={{ base: 2, lg: 3 }}
          mr={isAdmin ? 7 : 0}
        >
          <Heading
            as="h2"
            fontSize="2xl"
            m={0}
            _hover={
              link ? { cursor: 'pointer', textDecoration: 'underline' } : {}
            }
          >
            {link ? <Link to={link}>{title}</Link> : title}
          </Heading>
          <Heading
            as="h3"
            color={'gray.500'}
            fontSize="lg"
            fontWeight="normal"
            m={0}
          >
            {formatTime(strings, start)}
          </Heading>
        </Box>
        {!!buttons.length && (
          <Stack spacing={3}>
            {buttons.map((button, index) => {
              const text =
                button.icon === 'email'
                  ? strings.email
                  : button.icon === 'phone'
                  ? strings.telephone
                  : button.value;
              return (
                <Box
                  alignItems="center"
                  display="flex"
                  flexWrap="wrap"
                  gap={3}
                  key={index}
                >
                  <Button {...button} primary>
                    {text}
                  </Button>
                  <Text color="gray.500">{button.notes}</Text>
                </Box>
              );
            })}
          </Stack>
        )}
        {!!notes.length && (
          <Stack spacing={1}>
            {notes.map((paragraph: string, key: number) => (
              <Text key={key} overflow="hidden" wordBreak="break-word">
                <Linkify>{paragraph}</Linkify>
              </Text>
            ))}
          </Stack>
        )}
        {group && <Group group={group} meeting={meeting} />}
        {!!tags.length && (
          <Box>
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
      {edit_url && isAdmin && (
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
