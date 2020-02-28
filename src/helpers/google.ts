import moment from "moment-timezone";

import { stringToTrimmedArray } from "./";
import { Meeting } from "../components/Meeting";

//types
export type Tag = { tag: string; checked: boolean };

export type State = {
  filters: { [key: string]: Tag[] };
  loading: boolean;
  meetings: Meeting[];
  search: string[];
  timezone: string;
};

//get json endpoint for published google sheet
export function endpointUrl(sheet_id: string, page_id = 1): string {
  return `https://spreadsheets.google.com/feeds/list/${sheet_id}/${page_id}/public/values?alt=json`;
}

export const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

//parse google spreadsheet data into state object (runs once on init)
export function loadStateFromResult(data: any): State {
  const meetings: Meeting[] = [];
  let formats: string[] = [];
  let types: string[] = [];

  for (let i = 0; i < data.feed.entry.length; i++) {
    const meeting: Meeting = {
      name: data.feed.entry[i]["gsx$name"]["$t"].trim(),
      timezone: data.feed.entry[i]["gsx$timezone"]["$t"].trim(),
      email: data.feed.entry[i]["gsx$email"]["$t"].trim(),
      phone: data.feed.entry[i]["gsx$phone"]["$t"].replace(/\D/g, "").trim(),
      url: data.feed.entry[i]["gsx$url"]["$t"].trim(),
      notes: stringToTrimmedArray(data.feed.entry[i]["gsx$notes"]["$t"], "\n"),
      updated: data.feed.entry[i]["updated"]["$t"],
      search: "",
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

    //get types
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

    //handle times
    const times = stringToTrimmedArray(
      data.feed.entry[i]["gsx$times"]["$t"],
      "\n"
    );

    //search index
    meeting.search = [meeting.name, meeting.notes]
      .join(" ")
      .toLowerCase()
      .split(" ")
      .filter(e => e)
      .join(" ");

    if (times.length) {
      //loop through create an entry for each time
      times.forEach(time => {
        const [day, ...times] = time.split(" ");
        const [start, end] = times.join(" ").split("-");

        //set start time as a udate
        meeting.start = parseInt(
          moment
            .tz(start, "h:mm a", meeting.timezone)
            .day(day)
            .format("x")
        );

        //if there is one, also set end time as a udate
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

  return {
    filters: {
      days: arrayToTagsArray(days),
      formats: arrayToTagsArray(formats),
      types: arrayToTagsArray(types)
    },
    loading: false,
    meetings: meetings,
    search: [],
    timezone: moment.tz.guess()
  };
}

function arrayToTagsArray(array: string[]): Tag[] {
  return array.map(tag => {
    return { tag: tag, checked: false };
  });
}
