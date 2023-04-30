import InfiniteScroll from 'react-infinite-scroller';

import { NoResults } from './NoResults';
import { Meeting } from './Meeting';

import {
  Meeting as MeetingType,
  meetingsPerPage,
  useAppState
} from '../helpers';

export function Meetings() {
  const { state, setState } = useAppState();
  return !state.filteredMeetings.length ? (
    <NoResults />
  ) : (
    <InfiniteScroll
      hasMore={state.filteredMeetings.length > state.limit}
      loadMore={() => {
        const limit = state.limit + meetingsPerPage;
        setState({ ...state, limit });
      }}
    >
      {state.filteredMeetings
        .slice(0, state.limit)
        .map((meeting: MeetingType, index: number) => (
          <Meeting key={index} meeting={meeting} link={`/${meeting.slug}`} />
        ))}
    </InfiniteScroll>
  );
}
