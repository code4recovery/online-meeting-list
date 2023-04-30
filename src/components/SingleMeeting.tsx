import { useLoaderData, useNavigate } from 'react-router-dom';
import { Button, Stack } from '@chakra-ui/react';

import { Icon } from './Icon';
import { Meeting } from './Meeting';
import { useAppState } from '../helpers';

export function SingleMeeting() {
  const navigate = useNavigate();
  const request = useLoaderData();
  const { state } = useAppState();

  const meeting = request
    ? state.meetings.find(({ slug }) => slug === request)
    : undefined;

  if (!meeting) return null;

  return (
    <Stack gap={3} alignItems="start">
      <Button
        leftIcon={<Icon name="arrow-left" />}
        onClick={() => navigate(-1)}
      >
        Back to Meetings
      </Button>
      <Meeting meeting={meeting} />
    </Stack>
  );
}
