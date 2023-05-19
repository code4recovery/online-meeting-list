import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import { Stack } from '@chakra-ui/react';

import { Button } from './Button';
import { Error } from './Error';
import { Meeting } from './Meeting';
import { useData } from '../helpers';

export function SingleMeeting() {
  const navigate = useNavigate();
  const { key } = useLocation();
  const request = useLoaderData();
  const { meetings } = useData();

  const meeting = request
    ? meetings.find(({ slug }) => slug === request)
    : undefined;

  return (
    <Stack gap={3} alignItems="start">
      <Button
        icon="arrow-left"
        onClick={() => {
          if (key === 'default') {
            navigate('/');
          } else {
            navigate(-1);
          }
        }}
      >
        Back to Meetings
      </Button>
      {meeting ? (
        <Meeting meeting={meeting} />
      ) : (
        <Error message={`Meeting “${request}” not found`} />
      )}
    </Stack>
  );
}
