import moment from "moment-timezone";

import { State } from "../helpers";
import { Meeting } from "../components";

//set time zones, apply filters, and sort meetings, runs on state change
export function filterData({ meetings, timezone }: State): Meeting[] {
  //get current timestamp
  const now: number = parseInt(moment().format("x"));

  /*filter meetings based on selected tags
  if (state.Tags.length) {
    meetings = meetings.filter(meeting => {
      for (let i = 0; i < tags.length; i++) {
        if (meeting.tags.includes(tags[i])) return true;
      }
      return false;
    });
  }*/

  meetings.map(meeting => {
    //format human-readable time
    meeting.time = meeting.start
      ? moment(meeting.start)
          .tz(timezone)
          .format("dddd, h:mma")
          .concat(
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
