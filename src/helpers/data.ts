import { Meeting } from "../components";

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
      email: data.feed.entry[i]["gsx$email"]["$t"],
      url: data.feed.entry[i]["gsx$url"]["$t"],
      notes: data.feed.entry[i]["gsx$notes"]["$t"]
        .split("\n")
        .map((note: string) => note.trim()),
      tags: []
    };

    //handle formats
    const meeting_formats = data.feed.entry[i]["gsx$formats"]["$t"].trim();
    if (meeting_formats.length) {
      const meeting_formats_array = meeting_formats
        .split(",")
        .map((format: string) => format.trim());

      //append to formats array
      meeting_formats_array.forEach((format: string) => {
        if (!formats.includes(format)) {
          formats.push(format);
        }
      });

      //append to meeting tags
      meeting.tags = meeting.tags.concat(meeting_formats_array);
    }

    //handle types
    const meeting_types = data.feed.entry[i]["gsx$types"]["$t"].trim();
    if (meeting_types.length) {
      const meeting_types_array = meeting_types
        .split(",")
        .map((type: string) => type.trim());

      //append to types array
      meeting_types_array.forEach((type: string) => {
        if (!types.includes(type)) {
          types.push(type);
        }
      });

      //append to meeting tags
      meeting.tags = meeting.tags.concat(meeting_types_array);
    }

    //sort "tags"
    meeting.tags.sort();

    //add to meetings
    meetings.push(meeting);
  }

  //sort
  formats.sort();
  types.sort();

  return { meetings, formats, types };
}
