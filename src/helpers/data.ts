import { Meeting } from "../types";

export function jsonUrl(sheet_id: string, page_id = 1): string {
  return `https://spreadsheets.google.com/feeds/list/${sheet_id}/${page_id}/public/values?alt=json`;
}

export function parseData(
  data: any
): { meetings: Meeting[]; formats: string[]; types: string[] } {
  const meetings: Meeting[] = [];
  const formats: string[] = [];
  const types: string[] = [];

  for (let i = 0; i < data.feed.entry.length; i++) {
    const meeting: Meeting = {
      name: data.feed.entry[i]["gsx$name"]["$t"],
      time: data.feed.entry[i]["gsx$time"]["$t"],
      notes: data.feed.entry[i]["gsx$notes"]["$t"],
      types: data.feed.entry[i]["gsx$types"]["$t"].split(","),
      formats: data.feed.entry[i]["gsx$formats"]["$t"].split(",")
    };

    //build formats array
    meeting.formats.forEach(format => {
      format = format.trim();
      if (format.length && !formats.includes(format)) {
        formats.push(format);
      }
    });

    //build types array
    meeting.types.forEach(type => {
      type = type.trim();
      if (type.length && !types.includes(type)) {
        types.push(type);
      }
    });

    //add to meetings
    meetings.push(meeting);
  }

  //sort
  formats.sort();
  types.sort();

  return { meetings, formats, types };
}
