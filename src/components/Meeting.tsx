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
    conference_phone_notes,
    conference_url_notes,
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

  const buttons: Array<MeetingLink & { notes?: string }> = [];
  if (conference_provider) {
    buttons.push({
      icon: 'video',
      value: conference_provider,
      onClick: () => window.open(conference_url),
      notes: conference_url_notes
    });
  }
  if (conference_phone) {
    buttons.push({
      icon: 'phone',
      value: strings.telephone,
      onClick: () => window.open(`tel:${conference_phone}`),
      notes: conference_phone_notes
    });
  }

  const isAdmin = document.cookie
    .split('; ')
    .some(row => row.startsWith('admin='));

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
              const title =
                button.icon === 'email'
                  ? strings.email_use.replace('{{value}}', button.value)
                  : button.icon === 'phone'
                  ? strings.telephone_use.replace('{{value}}', button.value)
                  : strings.video_use.replace('{{value}}', button.value);
              return (
                <Box key={index} display="flex" alignItems="center" gap={3}>
                  <Button {...button} primary title={title}>
                    {text}
                  </Button>
                  <Text color="gray.500">{button.notes}</Text>
                </Box>
              );
            })}
          </Stack>
        )}
        {!!notes?.length && (
          <Stack spacing={1}>
            {notes.map((paragraph: string, key: number) => (
              <Text key={key} overflow="hidden" wordBreak="break-word">
                <Linkify>{paragraph}</Linkify>
              </Text>
            ))}
          </Stack>
        )}
        {!!group_id && <Group meeting={meeting} />}
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
