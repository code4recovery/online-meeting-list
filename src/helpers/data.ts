import moment from 'moment-timezone';
import 'moment/locale/it';

import { Meeting } from '../components/Meeting';

//types
export type Tag = { tag: string; checked: boolean };

export type State = {
  filters: { [key: string]: Tag[] };
  limit: number;
  loading: boolean;
  meetings: Meeting[];
  search: string[];
  timezone: string;
};

//get json endpoint for published google sheet
export function endpoint(sheet_id: string, page_id = 1): string {
  return `https://spreadsheets.google.com/feeds/list/${sheet_id}/${page_id}/public/values?alt=json`;
}

export const days = [
  'domenica',
  'lunedì',
  'martedì',
  'mercoledì',
  'giovedì',
  'venerdì',
  'sabato'
];

export const meetingsPerPage = 10;

//parse google spreadsheet data into state object (runs once on init)
export function load(data: any): State {

  moment.locale('it'); // Set locale to Italian

  const meetings: Meeting[] = [];
  let formats: string[] = [];
  let types: string[] = [];

  //loop through json entries
  for (let i = 0; i < data.feed.entry.length; i++) {
    const meeting: Meeting = {
      name: data.feed.entry[i]['gsx$name']['$t'].trim(),
      email: data.feed.entry[i]['gsx$email']['$t'].trim(),
      phone: data.feed.entry[i]['gsx$phone']['$t'].replace(/\D/g, '').trim(),
      url: data.feed.entry[i]['gsx$url']['$t'].trim(),
      notes: stringToTrimmedArray(data.feed.entry[i]['gsx$notes']['$t'], '\n'),
      updated: data.feed.entry[i]['updated']['$t'],
      search: '',
      tags: []
    };

    //handle phone
    if (meeting.phone) {
      const accessCode = data.feed.entry[i]['gsx$accesscode']['$t'].trim();
      if (accessCode.length) {
        meeting.phone = meeting.phone.concat(',' + accessCode);
      }
    }

    //handle formats
    const meeting_formats = stringToTrimmedArray(
      data.feed.entry[i]['gsx$formats']['$t']
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
      data.feed.entry[i]['gsx$types']['$t']
    );

    //append to types array
    meeting_types.forEach(type => {
      if (!types.includes(type)) {
        types.push(type);
      }
    });

    //append to meeting tags
    meeting.tags = meeting.tags.concat(meeting_types);

    //search index
    meeting.search = meeting.name
      .toLowerCase()
      .split(' ')
      .filter(e => e)
      .join(' ');

    //timezone
    const timezone = data.feed.entry[i]['gsx$timezone']['$t'].trim();

    //handle times
    const times = stringToTrimmedArray(
      data.feed.entry[i]['gsx$times']['$t'],
      '\n'
    );

    if (times.length) {
      //loop through create an entry for each time
      times.forEach(timestring => {
        //set start time as a udate
        const time = moment.tz(timestring, 'dddd h:mm a', timezone);

        //push a clone of the meeting onto the array
        meetings.push({ ...meeting, time });
      });
    } else {
      //ongoing meeting; add to meetings
      meetings.push(meeting);
    }
  }

  //sort
  formats.sort();
  types.sort();

  //read query string
  const query: { [key: string]: string[] } = {};
  if (window.location.search.length > 1) {
    window.location.search
      .substr(1)
      .split('&')
      .forEach(pair => {
        const [key, value] = pair.split('=');
        query[key] = value.split(',').map(decodeURIComponent);
      });
  }

  return {
    filters: {
      days: arrayToTagsArray(days, query.days || []),
      formats: arrayToTagsArray(formats, query.formats || []),
      types: arrayToTagsArray(types, query.types || [])
    },
    limit: meetingsPerPage,
    loading: false,
    meetings: meetings,
    search: [],
    timezone: moment.tz.guess()
  };
}

function arrayToTagsArray(array: string[], values: string[]): Tag[] {
  return array.map(tag => {
    return { tag: tag, checked: values.includes(tag) };
  });
}

//split "foo, bar, baz" into ["foo", "bar", "baz"]
function stringToTrimmedArray(str: string, sep = ','): string[] {
  return str
    .split(sep)
    .map(val => val.trim())
    .filter(val => val);
}
