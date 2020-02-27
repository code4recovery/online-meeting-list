import moment from "moment-timezone";

import { State, days } from "../helpers";
import { Meeting } from "../components";

//set time zones, apply filters, and sort meetings, runs on state change
export function filterData({
  meetings,
  filters,
  search,
  timezone
}: State): Meeting[] {
  //get currently-checked tags
  const tags: string[] = Object.keys(filters)
    .map(filter => {
      return filters[filter]
        .filter(value => value.checked)
        .map(value => value.tag);
    })
    .flat();

  //get current timestamp
  const now: number = parseInt(moment().format("x"));

  //loop through meetings for time operations
  meetings.map(meeting => {
    //momentize start time
    const startTime = moment(meeting.start).tz(timezone);

    //add day to meeting tags
    meeting.tags = meeting.tags.filter(tag => !days.includes(tag));
    meeting.tags.push(startTime.format("dddd"));
    meeting.tags.sort();

    //format human-readable time
    meeting.time = meeting.start
      ? startTime.format("dddd, h:mma").concat(
          meeting.end
            ? "–" +
                moment(meeting.end)
                  .tz(timezone)
                  .format("h:mma")
            : ""
        )
      : "Ongoing";

    //if the meeting is in the past (earlier today), then add a week
    if (meeting.start && meeting.start < now) {
      meeting.start += 604800000;
      if (meeting.end) {
        meeting.end += 604800000;
      }
    }

    return meeting;
  });

  //filter meetings based on selected tags
  if (tags.length) {
    meetings = meetings.filter(meeting => {
      for (let i = 0; i < tags.length; i++) {
        if (meeting.tags.includes(tags[i])) return true;
      }
      return false;
    });
  }

  //search?
  const needle = search
    .toLowerCase()
    .split(" ")
    .filter(e => e);
  if (needle.length) {
    meetings = meetings.filter(meeting => {
      const haystack = [meeting.name, meeting.notes]
        .join(" ")
        .toLowerCase()
        .split(" ")
        .filter(e => e)
        .join(" ");
      return (
        needle
          .map(word => {
            return haystack.includes(word);
          })
          .filter(e => e).length === needle.length
      );
    });
  }

  //sort meetings (by time then name)
  meetings.sort((a: Meeting, b: Meeting) => {
    if (a.start && b.start && a.start !== b.start) {
      return a.start - b.start;
    } else if (a.start) {
      return -1;
    } else if (b.start) {
      return 1;
    }
    return a.name.localeCompare(b.name);
  });

  //return
  return meetings;
}

//split "foo, bar, baz" into ["foo", "bar", "baz"]
export function stringToTrimmedArray(str: string, sep = ","): string[] {
  return str
    .split(sep)
    .map(val => val.trim())
    .filter(val => val);
}
