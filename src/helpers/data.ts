import { Meeting } from "../components";

import moment from "moment-timezone";

//set time zones, apply filters, and sort meetings by time
//runs after init, and whenever a filter is changed
export function filterData(meetings: Meeting[], timezone: string): Meeting[] {
  //get current timestamp
  const now: number = parseInt(moment().format("x"));

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

//get json endpoint for published google sheet
export function jsonUrl(sheet_id: string, page_id = 1): string {
  return `https://spreadsheets.google.com/feeds/list/${sheet_id}/${page_id}/public/values?alt=json`;
}

//parse google spreadsheet data into arrays of meetings, formats, and types
//runs only once on init
export function parseData(
  data: any
): { meetings: Meeting[]; formats: string[]; types: string[] } {
  const meetings: Meeting[] = [];
  let formats: string[] = [];
  let types: string[] = [];

  for (let i = 0; i < data.feed.entry.length; i++) {
    //console.log(data.feed.entry[i]);

    const meeting: Meeting = {
      name: data.feed.entry[i]["gsx$name"]["$t"].trim(),
      timezone: data.feed.entry[i]["gsx$timezone"]["$t"].trim(),
      email: data.feed.entry[i]["gsx$email"]["$t"].trim(),
      phone: data.feed.entry[i]["gsx$phone"]["$t"].replace(/\D/g, "").trim(),
      url: data.feed.entry[i]["gsx$url"]["$t"].trim(),
      notes: splitIntoTrimmedArray(data.feed.entry[i]["gsx$notes"]["$t"], "\n"),
      updated: data.feed.entry[i]["updated"]["$t"],
      tags: []
    };

    //handle phone
    const accessCode = data.feed.entry[i]["gsx$accesscode"]["$t"].trim();
    if (accessCode.length)
      meeting.phone = meeting.phone.concat("," + accessCode);

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
        meeting.start = parseInt(
          moment
            .tz(start, "h:mm a", meeting.timezone)
            .day(day)
            .format("x")
        );
        if (end) {
          meeting.end = parseInt(
            moment
              .tz(end, "h:mm a", meeting.timezone)
              .day(day)
              .format("x")
          );
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

  return { meetings, formats, types };
}

//split "foo, bar, baz" into ["foo", "bar", "baz"]
function splitIntoTrimmedArray(input: string, separator = ","): string[] {
  return input
    .split(separator)
    .map(val => val.trim())
    .filter(val => val);
}
