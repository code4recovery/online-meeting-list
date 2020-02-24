import { Meeting } from "../components";

import * as moment from "moment-timezone";

export function jsonUrl(sheet_id: string, page_id = 1): string {
  return `https://spreadsheets.google.com/feeds/list/${sheet_id}/${page_id}/public/values?alt=json`;
}

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
      times.forEach(time => {
        const [day, ...times] = time.split(" ");
        const [start, end] = times.join(" ").split("-");
        if (end) console.log(end);

        meeting.start = moment.tz(start, "h:mm a", meeting.timezone).day(day);

        meetings.push({ ...meeting });
      });
    } else {
      //add to meetings
      meetings.push(meeting);
    }
  }

  //sort
  formats.sort();
  types.sort();
  meetings.sort((a: Meeting, b: Meeting) => {
    if (a.start && b.start && !a.start.isSame(b.start)) {
      return b.start.isBefore(a.start) ? 1 : -1;
    } else if (a.start) {
      return -1;
    } else if (b.start) {
      return 1;
    } else {
      return a.name.localeCompare(b.name);
    }
  });

  return { meetings, formats, types };
}

function splitIntoTrimmedArray(input: string, separator = ","): string[] {
  return input
    .split(separator)
    .map(val => val.trim())
    .filter(val => val);
}
