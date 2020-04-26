import moment from 'moment-timezone';

import { days, State } from '../helpers';
import { Meeting } from '../components';

//set time zones, apply filters, and sort meetings, runs on state change
export function filterData(
  { meetings, search, timezone }: State,
  tags: string[]
): Meeting[] {
  //loop through meetings for time operations
  meetings.map(meeting => {
    if (meeting.start) {
      //momentize start time
      const startTime = moment(meeting.start).tz(timezone);

      //add day to meeting tags
      meeting.tags = meeting.tags.filter(tag => !days.includes(tag));
      meeting.tags.push(startTime.format('dddd'));
      meeting.tags.sort();

      //format human-readable time
      meeting.time = startTime
        .format('dddd, h:mma')
        .concat(
          meeting.end
            ? '–' + moment(meeting.end).tz(timezone).format('h:mma')
            : ''
        );
    } else {
      meeting.time = 'Ongoing';
    }
    return meeting;
  });

  //filter meetings based on selected tags
  if (tags.length) {
    meetings = meetings.filter(meeting => {
      for (let i = 0; i < tags.length; i++) {
        if (!meeting.tags.includes(tags[i])) return false;
      }
      return true;
    });
  }

  //search?
  if (search) {
    meetings = meetings.filter(meeting => {
      return (
        search
          .map(word => {
            return meeting.search.includes(word);
          })
          .filter(e => e).length === search.length
      );
    });
  }

  //sort meetings (by time then name)
  meetings.sort((a: Meeting, b: Meeting) => {
    if (a.start && b.start && a.start !== b.start) {
      return a.start - b.start;
    } else if (a.start && !b.start) {
      return -1;
    } else if (b.start && !a.start) {
      return 1;
    }
    return a.name.localeCompare(b.name);
  });

  //return
  return meetings;
}

//split "foo, bar, baz" into ["foo", "bar", "baz"]
export function stringToTrimmedArray(str: string, sep = ','): string[] {
  return str
    .split(sep)
    .map(val => val.trim())
    .filter(val => val);
}
