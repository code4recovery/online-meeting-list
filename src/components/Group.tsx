import { Fragment } from 'react';
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
  Grid,
  GridItem,
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
  type Meeting as MeetingType,
  useI18n,
  type Group as GroupType
} from '../helpers';

import { Button } from './Button';
import { Icon } from './Icon';

export function Group({
  group,
  meeting
}: {
  group: GroupType;
  meeting: MeetingType;
}) {
  const { start, end } = meeting;
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

  const { name, email, phone, website, venmo, paypal, square, meetings } =
    group;

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
      <Box display="flex" gap={2} flexWrap="wrap">
        {!!email && (
          <Button
            icon="email"
            onClick={() => {
              window.open(`mailto:${email}`);
            }}
          >
            {strings.email}
          </Button>
        )}
        {!!phone && (
          <Button
            icon="phone"
            onClick={() => {
              window.open(`tel:${phone}`);
            }}
          >
            {strings.telephone}
          </Button>
        )}
        {!!website && (
          <Button
            icon="link"
            onClick={() => {
              window.open(website);
            }}
          >
            {strings.website}
          </Button>
        )}
        {!!venmo && (
          <Button
            icon="cash"
            onClick={() => {
              window.open(`https://account.venmo.com/u/${venmo}`);
            }}
          >
            Venmo
          </Button>
        )}
        {!!paypal && (
          <Button
            icon="cash"
            onClick={() => {
              window.open(`https://www.paypal.com/paypalme/${paypal}`);
            }}
          >
            PayPal
          </Button>
        )}
        {!!square && (
          <Button
            icon="cash"
            onClick={() => {
              window.open(`https://cash.app/${square}`);
            }}
          >
            Cash App
          </Button>
        )}
        {start && end && (
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
        {meetings[0].edit_url && (
          <Button
            icon="pencil"
            onClick={() => {
              window.open(meetings[0].edit_url);
            }}
          >
            {strings.edit}
          </Button>
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
                  <AccordionPanel pt={1} pb={4}>
                    <Grid templateColumns={{ md: 'repeat(3, 1fr)' }} pb={5}>
                      {meetings.map(({ start, slug, name }, index) => (
                        <Fragment key={index}>
                          <GridItem
                            borderBottom="1px"
                            borderColor="gray.700"
                            px={3}
                            py={2}
                          >
                            {formatTime(strings, start)}
                          </GridItem>
                          <GridItem
                            borderBottom="1px"
                            borderColor="gray.700"
                            colSpan={2}
                            px={3}
                            py={2}
                          >
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
                          </GridItem>
                        </Fragment>
                      ))}
                    </Grid>
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
