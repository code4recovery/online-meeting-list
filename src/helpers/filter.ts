import moment from 'moment-timezone';

import type { LanguageStrings } from './i18n';
import type { Meeting } from './types';

//set time zones, apply filters, and sort meetings, runs on state change
export function filter(
  meetings: Meeting[],
  searchWords: string[],
  timezone: string,
  tags: string[],
  strings: LanguageStrings
) {
  //get current timestamp
  const now = moment();
  //const now = moment.tz('Saturday 8:12 PM', 'dddd h:mm a', timezone);

  //loop through meetings for time operations
  meetings.map(meeting => {
    if (meeting.time) {
      //convert timezone
      meeting.time.tz(timezone);

      //make all meetings upcoming
      let diff = meeting.time.diff(now, 'minutes');

      //with timezone weirdness, date could be more than a week ago
      if (diff < -10080) {
        meeting.time.add(1, 'week');
        diff = meeting.time.diff(now, 'minutes');
      }

      //show meetings that started up to 10 minutes ago
      if (diff < -10) {
        meeting.time.add(1, 'week');
      }

      //remove all days from meeting
      meeting.tags = meeting.tags.filter(tag => !strings.days.includes(tag));

      //add meeting day to tags
      const meetingDay = strings.days[meeting.time.day()];
      meeting.tags.push(meetingDay);

      //sort tags
      meeting.tags.sort();
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
  if (searchWords) {
    meetings = meetings.filter(
      meeting =>
        searchWords.map(word => meeting.search.includes(word)).filter(e => e)
          .length === searchWords.length
    );
  }

  //sort meetings (by time then name)
  meetings.sort((a: Meeting, b: Meeting) => {
    if (a.time && b.time && !a.time.isSame(b.time)) {
      return a.time.isAfter(b.time) ? 1 : -1;
    } else if (a.time && !b.time) {
      return -1;
    } else if (b.time && !a.time) {
      return 1;
    }
    return a.name.localeCompare(b.name);
  });

  //return
  return meetings;
}
