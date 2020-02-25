import moment from "moment-timezone";

import { stringToTrimmedArray } from "./data";
import { Meeting } from "../components/Meeting";

//get json endpoint for published google sheet
export function googleSheetUrl(sheet_id: string, page_id = 1): string {
  return `https://spreadsheets.google.com/feeds/list/${sheet_id}/${page_id}/public/values?alt=json`;
}

//parse google spreadsheet data into arrays of meetings, formats, and types
//runs only once on init
export function importGoogleSheet(
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
      notes: stringToTrimmedArray(data.feed.entry[i]["gsx$notes"]["$t"], "\n"),
      updated: data.feed.entry[i]["updated"]["$t"],
      tags: []
    };

    //handle phone
    const accessCode = data.feed.entry[i]["gsx$accesscode"]["$t"].trim();
    if (accessCode.length)
      meeting.phone = meeting.phone.concat("," + accessCode);

    //handle formats
    const meeting_formats = stringToTrimmedArray(
      data.feed.entry[i]["gsx$formats"]["$t"]
    );

    //append to formats array
    meeting_formats.forEach((format: string) => {
      if (!formats.includes(format)) {
        formats.push(format);
      }
    });

    //append to meeting tags
    meeting.tags = meeting.tags.concat(meeting_formats);

    //handle types
    const meeting_types = stringToTrimmedArray(
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
    const times = stringToTrimmedArray(
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
