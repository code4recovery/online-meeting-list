import { Box, Button, Grid, GridItem, Stack, Text } from '@chakra-ui/react';
import Linkify from 'react-linkify';
import { useData, type Meeting, useI18n, formatTime } from '../helpers';
import { Link } from 'react-router-dom';
import { formatIcs } from '../helpers/ics';
import { Icon } from './Icon';

export function Group({ meeting }: { meeting: Meeting }) {
  const { name: meetingName, slug, group_id } = meeting;
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
  const otherMeetings = meetings.filter(
    ({ slug: meetingSlug }) => meetingSlug !== slug
  );
  return (
    <Stack gap={3}>
      {meetingName !== name && (
        <Text fontWeight="bold" textDecoration="underline" as="h3">
          {name}
        </Text>
      )}
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
      {!!otherMeetings.length && (
        <Stack gap={1}>
          <Text as="h4" fontWeight="bold" textDecoration="underline">
            Other Meetings
          </Text>
          <Grid templateColumns="repeat(2, 1fr)">
            {otherMeetings.map(({ start, slug, name }, index) => (
              <GridItem display="flex" gap={2} key={index}>
                {formatTime(strings, start)}
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
              </GridItem>
            ))}
          </Grid>
        </Stack>
      )}
    </Stack>
  );
}
