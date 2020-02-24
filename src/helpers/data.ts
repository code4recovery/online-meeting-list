import { Meeting } from "../components";

import * as moment from "moment-timezone";

//get json endpoint for published google sheet
export function jsonUrl(sheet_id: string, page_id = 1): string {
  return `https://spreadsheets.google.com/feeds/list/${sheet_id}/${page_id}/public/values?alt=json`;
}

//parse google spreadsheet data into arrays of meetings, formats, and types
export function parseData(
  data: any
): { meetings: Meeting[]; formats: string[]; types: string[] } {
  const meetings: Meeting[] = [];
  let formats: string[] = [];
  let types: string[] = [];

  for (let i = 0; i < data.feed.entry.length; i++) {
    //console.log(data.feed.entry[i]);

    const meeting: Meeting = {
      name: data.feed.entry[i]["gsx$name"]["$t"],
      timezone: data.feed.entry[i]["gsx$timezone"]["$t"],
      email: data.feed.entry[i]["gsx$email"]["$t"],
      phone: data.feed.entry[i]["gsx$phone"]["$t"],
      accessCode: data.feed.entry[i]["gsx$accesscode"]["$t"],
      url: data.feed.entry[i]["gsx$url"]["$t"],
      notes: splitIntoTrimmedArray(data.feed.entry[i]["gsx$notes"]["$t"], "\n"),
      tags: []
    };

    //handle formats
    const meeting_formats = splitIntoTrimmedArray(
      data.feed.entry[i]["gsx$formats"]["$t"]
    );

    //append to formats array
    meeting_formats.forEach(format => {
      if (!formats.includes(format)) {
        formats.push(format);
      }
    });

    //append to meeting tags
    meeting.tags = meeting.tags.concat(meeting_formats);

    //handle types
    const meeting_types = splitIntoTrimmedArray(
      data.feed.entry[i]["gsx$types"]["$t"]
    );

    //append to types array
    meeting_types.forEach(type => {
      if (!types.includes(type)) {
        types.push(type);
      }
    });

    //append to meeting tags
    meeting.tags = meeting.tags.concat(meeting_types);

    //sort "tags"
    meeting.tags.sort();

    //handle times
    const times = splitIntoTrimmedArray(
      data.feed.entry[i]["gsx$times"]["$t"],
      "\n"
    );

    if (times.length) {
      //loop through create an entry for each time
      times.forEach(time => {
        const [day, ...times] = time.split(" ");
        const [start, end] = times.join(" ").split("-");

        //create moments
        meeting.start = moment.tz(start, "h:mm a", meeting.timezone).day(day);
        if (end) {
          meeting.end = moment.tz(end, "h:mm a", meeting.timezone).day(day);
        }

        //if the meeting is in the past (earlier today), then add a week
        if (meeting.start.isBefore()) {
          meeting.start.add(1, "week");
          if (meeting.end) {
            meeting.end.add(1, "week");
          }
        }

        //push a clone of the meeting onto the array
        meetings.push({ ...meeting });
      });
    } else {
      //ongoing meeting; add to meetings
      meetings.push(meeting);
    }
  }

  //sort
  formats.sort();
  types.sort();
  meetings.sort((a: Meeting, b: Meeting) => {
    //sort by time then name
    if (a.start && b.start && !a.start.isSame(b.start)) {
      return b.start.isBefore(a.start) ? 1 : -1;
    } else if (a.start) {
      return -1;
    } else if (b.start) {
      return 1;
    }
    return a.name.localeCompare(b.name);
  });

  return { meetings, formats, types };
}

//split "foo, bar, baz" into ["foo", "bar", "baz"]
function splitIntoTrimmedArray(input: string, separator = ","): string[] {
  return input
    .split(separator)
    .map(val => val.trim())
    .filter(val => val);
}
