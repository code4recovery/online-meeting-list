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
  Button,
  Stack,
  Text
} from '@chakra-ui/react';

import {
  useData,
  type Meeting,
  useI18n,
  formatIcs,
  formatTime
} from '../helpers';
import { Icon } from './Icon';

export function Group({ meeting }: { meeting: Meeting }) {
  const { group_id } = meeting;
  const { groups } = useData();
  const { strings } = useI18n();
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
            leftIcon={<Icon name="email" />}
            onClick={() => (window.location.href = `mailto:${email}`)}
          >
            {strings.email}
          </Button>
        )}
        {!!phone && (
          <Button
            leftIcon={<Icon name="phone" />}
            onClick={() => (window.location.href = `tel:${phone}`)}
          >
            {strings.telephone}
          </Button>
        )}
        {!!website && (
          <Button
            leftIcon={<Icon name="link" />}
            onClick={() => (window.location.href = website)}
          >
            {strings.website}
          </Button>
        )}
        {!!venmo && (
          <Button
            leftIcon={<Icon name="cash" />}
            onClick={() =>
              (window.location.href = `https://account.venmo.com/u/${venmo}`)
            }
          >
            Venmo
          </Button>
        )}
        {!!paypal && (
          <Button
            leftIcon={<Icon name="cash" />}
            onClick={() =>
              (window.location.href = `https://www.paypal.com/paypalme/${paypal}`)
            }
          >
            PayPal
          </Button>
        )}
        {!!square && (
          <Button
            leftIcon={<Icon name="cash" />}
            onClick={() =>
              (window.location.href = `https://cash.app/${square}`)
            }
          >
            Cash App
          </Button>
        )}
        <Button
          onClick={() => formatIcs({ ...meeting, group })}
          leftIcon={<Icon name="calendar" />}
        >
          {strings.calendar}
        </Button>
      </Box>
      {meetings.length > 1 && (
        <Box style={{ marginLeft: '-1.25rem', marginRight: '-1.25rem' }}>
          <Accordion allowToggle>
            <AccordionItem>
              <h2>
                <AccordionButton px={5}>
                  <Box
                    as="span"
                    flex="1"
                    display="flex"
                    gap={3}
                    alignItems="center"
                    textAlign="left"
                  >
                    <Badge variant="subtle">{meetings.length}</Badge>
                    <Text fontWeight="bold">{name}</Text>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pt={1} pb={4} px={5}>
                <Stack spacing={{ base: 4, lg: 1 }}>
                  {meetings.map(({ start, slug, name }, index) => (
                    <Box
                      key={index}
                      display="flex"
                      gap={{ base: 0, lg: 3 }}
                      flexDirection={{ base: 'column', lg: 'row' }}
                    >
                      <Box>{formatTime(strings, start)}</Box>
                      <Box>
                        <Link to={`/${slug}`}>
                          <Text
                            color="blue.500"
                            as="span"
                            textDecoration="underline"
                            _hover={{ color: 'blue.600' }}
                          >
                            {name}
                          </Text>
                        </Link>
                      </Box>
                    </Box>
                  ))}
                </Stack>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        </Box>
      )}
    </Stack>
  );
}
