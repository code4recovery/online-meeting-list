export type Meeting = {
  name: string;
  time: string;
  notes: string;
  types: string[];
};

export function formatJson(data: any): Meeting[] {
  const meetings: Meeting[] = [];

  for (let i = 0; i < data.feed.entry.length; i++) {
    const meeting: Meeting = {
      name: data.feed.entry[i]["gsx$name"]["$t"],
      time: data.feed.entry[i]["gsx$time"]["$t"],
      notes: data.feed.entry[i]["gsx$notes"]["$t"],
      types: data.feed.entry[i]["gsx$types"]["$t"].split(",")
    };

    meetings.push(meeting);
  }

  return meetings;
}

export function jsonUrl(sheet_id: string, page_id = 1): string {
  return `https://spreadsheets.google.com/feeds/list/${sheet_id}/${page_id}/public/values?alt=json`;
}
