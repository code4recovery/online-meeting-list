import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';

import { Meeting as MeetingType, useData } from '../helpers';
import { NoResults } from './NoResults';
import { Meeting } from './Meeting';

export function Meetings() {
  const { filteredMeetings } = useData();
  const meetingsPerPage = 25;
  const [limit, setLimit] = useState(meetingsPerPage);

  if (!filteredMeetings) return null;

  return !filteredMeetings.length ? (
    <NoResults />
  ) : (
    <InfiniteScroll
      hasMore={filteredMeetings.length > limit}
      loadMore={() => setLimit(limit + meetingsPerPage)}
    >
      {filteredMeetings
        .slice(0, limit)
        .map((meeting: MeetingType, index: number) => (
          <Meeting key={index} link={`/${meeting.slug}`} meeting={meeting} />
        ))}
    </InfiniteScroll>
  );
}
