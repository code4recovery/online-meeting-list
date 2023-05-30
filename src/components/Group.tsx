import Linkify from 'react-linkify';
import { Link } from 'react-router-dom';
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Badge,
  Box,
  Button as ChakraButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
  useColorModeValue
} from '@chakra-ui/react';

import {
  formatGoogleCalendar,
  formatIcs,
  formatOutlook365,
  formatOutlookLive,
  formatTime,
  type Meeting,
  useData,
  useI18n
} from '../helpers';

import { Button } from './Button';
import { Icon } from './Icon';

export function Group({ meeting }: { meeting: Meeting }) {
  const { group_id } = meeting;
  const { groups } = useData();
  const { strings } = useI18n();
  const accordion = useColorModeValue(
    {
      bg: 'gray.50',
      color: 'gray.800',
      borderColor: 'gray.200'
    },
    {
      bg: 'gray.900',
      color: 'white',
      borderColor: 'gray.700'
    }
  );

  const group = groups[group_id as keyof typeof groups];
  if (!group) return <div>nothing</div>;
  const {
    name,
    notes,
    email,
    phone,
    website,
    venmo,
    paypal,
    square,
    meetings
  } = group;
  meetings.sort((a, b) => {
    if (a.start && b.start) {
      const weekdayA = a.start.weekday === 7 ? 0 : a.start.weekday;
      const weekdayB = a.start.weekday === 7 ? 0 : a.start.weekday;
      if (weekdayA !== weekdayB) {
        return weekdayA - weekdayB;
      }
      return a.start.toMillis() - b.start.toMillis();
    } else if (a.start) {
      return 1;
    } else if (b.start) {
      return -1;
    } else {
      return 0;
    }
  });
  return (
    <Stack gap={5}>
      {!!notes?.length && (
        <Stack spacing={2}>
          {notes.map((paragraph: string, key: number) => (
            <Text key={key} wordBreak="break-word">
              <Linkify>{paragraph}</Linkify>
            </Text>
          ))}
        </Stack>
      )}
      <Box display="flex" gap={2} flexWrap="wrap">
        {!!email && (
          <Button
            icon="email"
            onClick={() => (window.location.href = `mailto:${email}`)}
          >
            {strings.email}
          </Button>
        )}
        {!!phone && (
          <Button
            icon="phone"
            onClick={() => (window.location.href = `tel:${phone}`)}
          >
            {strings.telephone}
          </Button>
        )}
        {!!website && (
          <Button icon="link" onClick={() => (window.location.href = website)}>
            {strings.website}
          </Button>
        )}
        {!!venmo && (
          <Button
            icon="cash"
            onClick={() =>
              (window.location.href = `https://account.venmo.com/u/${venmo}`)
            }
          >
            Venmo
          </Button>
        )}
        {!!paypal && (
          <Button
            icon="cash"
            onClick={() =>
              (window.location.href = `https://www.paypal.com/paypalme/${paypal}`)
            }
          >
            PayPal
          </Button>
        )}
        {!!square && (
          <Button
            icon="cash"
            onClick={() =>
              (window.location.href = `https://cash.app/${square}`)
            }
          >
            Cash App
          </Button>
        )}
        {meeting.start && meeting.end && (
          <Menu autoSelect={false}>
            {({ isOpen }) => (
              <>
                <MenuButton
                  as={ChakraButton}
                  isActive={isOpen}
                  leftIcon={<Icon name="calendar" />}
                  rightIcon={<Icon name="chevron-down" />}
                >
                  {strings.calendar}
                </MenuButton>
                {isOpen && (
                  <MenuList>
                    <MenuItem onClick={() => formatIcs({ ...meeting, group })}>
                      iCalendar
                    </MenuItem>
                    <MenuItem
                      as="a"
                      href={formatGoogleCalendar({ ...meeting, group })}
                      target="_blank"
                    >
                      Google Calendar
                    </MenuItem>
                    <MenuItem
                      as="a"
                      href={formatOutlook365({ ...meeting, group })}
                      target="_blank"
                    >
                      Microsoft 365
                    </MenuItem>
                    <MenuItem
                      as="a"
                      href={formatOutlookLive({ ...meeting, group })}
                      target="_blank"
                    >
                      Microsoft Live
                    </MenuItem>
                  </MenuList>
                )}
              </>
            )}
          </Menu>
        )}
      </Box>
      {meetings.length > 1 && (
        <Box style={{ marginLeft: '-1.25rem', marginRight: '-1.25rem' }}>
          <Accordion allowToggle>
            <AccordionItem
              borderBottomColor={accordion.borderColor}
              borderBottomWidth={1}
              borderStyle="solid"
              borderTopColor={accordion.borderColor}
              borderTopWidth={1}
            >
              {({ isExpanded }) => (
                <Box bg={isExpanded ? accordion.bg : undefined}>
                  <AccordionButton px={5} _hover={{ bg: accordion.bg }}>
                    <Box
                      alignItems="center"
                      as="span"
                      color={accordion.color}
                      display="flex"
                      flex="1"
                      gap={3}
                      textAlign="left"
                    >
                      <Badge variant="subtle">{meetings.length}</Badge>
                      <Text fontWeight="bold" m={0}>
                        {name}
                      </Text>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel pt={1} pb={4} px={5}>
                    <Stack spacing={{ base: 4, lg: 1 }}>
                      {meetings.map(({ start, slug, name }, index) => (
                        <Box
                          display="flex"
                          flexDirection={{ base: 'column', lg: 'row' }}
                          gap={{ base: 0, lg: 3 }}
                          key={index}
                        >
                          <Box>{formatTime(strings, start)}</Box>
                          <Box>
                            <Link to={`/${slug}`}>
                              <Text
                                _hover={{ color: 'blue.600' }}
                                as="span"
                                color="blue.500"
                                overflow="hidden"
                                textDecoration="underline"
                              >
                                {name}
                              </Text>
                            </Link>
                          </Box>
                        </Box>
                      ))}
                    </Stack>
                  </AccordionPanel>
                </Box>
              )}
            </AccordionItem>
          </Accordion>
        </Box>
      )}
    </Stack>
  );
}
