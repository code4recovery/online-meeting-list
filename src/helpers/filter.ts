import * as languages from '../languages';
import type { Meeting } from './types';
import { InputType } from './input';

//set time zones, apply filters, and sort meetings, runs on state change
export function filter(meetings: Meeting[], input: InputType) {
  const { searchWords, tags, language, timezone } = input;
  const { strings } = languages[language];

  //loop through meetings for time operations
  meetings.map(meeting => {
    if (meeting.start && meeting.end) {
      //convert timezone
      meeting.start = meeting.start.setZone(timezone);
      meeting.end = meeting.end.setZone(timezone);

      //make all meetings upcoming
      let diff = meeting.start.diffNow('minutes').minutes;

      //with timezone weirdness, date could be more than a week ago
      if (diff < -10080) {
        meeting.start = meeting.start.plus({ week: 1 });
        meeting.end = meeting.end.plus({ week: 1 });
        diff = meeting.start.diffNow('minutes').minutes;
      }

      //show meetings that started up to 10 minutes ago
      if (diff < -10) {
        meeting.start = meeting.start.plus({ week: 1 });
        meeting.end = meeting.end.plus({ week: 1 });
      }

      //remove all days from meeting
      meeting.tags = meeting.tags.filter(tag => !strings.days.includes(tag));

      //add meeting day to tags
      const meetingDay =
        strings.days[meeting.start.weekday === 7 ? 0 : meeting.start.weekday];
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
    if (a.start && b.start && a.start !== b.start) {
      return a.start.toMillis() - b.start.toMillis();
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
