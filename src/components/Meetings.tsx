import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroller';

import { type Meeting as MeetingType, pushEvent, useData } from '../helpers';
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
      loadMore={() => {
        setLimit(limit + meetingsPerPage);
        pushEvent({ event: 'scroll', value: limit });
      }}
    >
      {filteredMeetings
        .slice(0, limit)
        .map((meeting: MeetingType, index: number) => (
          <Meeting key={index} link={`/${meeting.slug}`} meeting={meeting} />
        ))}
    </InfiniteScroll>
  );
}
