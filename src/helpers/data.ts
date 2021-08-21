import moment from 'moment-timezone';

import { days, meetingsPerPage, videoServices } from './config';
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

//parse google spreadsheet data into state object (runs once on init)
export function load(data: any): State {
  const meetings: Meeting[] = [];
  let formats: string[] = [];
  let types: string[] = [];

  //translate google sheet format
  if (!process.env.REACT_APP_JSON_URL) {
    data = translateGoogleSheet(data);
  }

  //loop through json entries
  for (let i = 0; i < data.length; i++) {
    const meeting: Meeting = {
      name: data[i]['name'].trim(),
      buttons: [],
      notes: stringToTrimmedArray(data[i]['notes'], '\n'),
      updated: data[i]['updated'],
      search: '',
      tags: []
    };

    //handle url
    const originalUrl = data[i]['url'].trim();
    if (originalUrl) {
      let label;
      let icon: 'link' | 'video' = 'link';
      try {
        const url = new URL(originalUrl);
        const host = url.hostname;
        const service = Object.keys(videoServices).filter(
          service =>
            videoServices[service].filter(domain => host.endsWith(domain))
              .length
        );
        if (service.length) {
          label = service[0];
          icon = 'video';
        } else {
          label = url.hostname.replace('www.', '');
        }
        meeting.buttons.push({
          icon: icon,
          onClick: () => {
            window.open(originalUrl, '_blank');
          },
          text: label,
          title: 'Visit ' + originalUrl
        });
      } catch {
        warn(originalUrl, 'URL', i);
      }
    }

    //handle phone
    const originalPhone = data[i]['phone'].trim();
    if (originalPhone) {
      let phone = originalPhone.replace(/\D/g, '');
      if (phone.length > 8) {
        const accessCode = data[i]['access_code'].trim();
        if (accessCode.length) {
          phone += ',,' + accessCode;
        }
        meeting.buttons.push({
          icon: 'phone',
          onClick: () => {
            window.open('tel:' + phone);
          },
          text: 'Phone',
          title: 'Call ' + phone
        });
      } else {
        warn(originalPhone, 'phone number', i);
      }
    }

    //handle email
    const email = data[i]['email'].trim();
    if (email) {
      if (validateEmail(email)) {
        meeting.buttons.push({
          icon: 'email',
          onClick: () => {
            window.open('mailto:' + email);
          },
          text: 'Email',
          title: 'Email ' + email
        });
      } else {
        warn(email, 'email address', i);
      }
    }

    //handle formats
    const meeting_formats = stringToTrimmedArray(data[i]['formats']);

    //append to formats array
    meeting_formats.forEach((format: string) => {
      if (!formats.includes(format)) {
        formats.push(format);
      }
    });

    //append to meeting tags
    meeting.tags = meeting.tags.concat(meeting_formats);

    //get types
    const meeting_types = stringToTrimmedArray(data[i]['types']);

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
    const timezone = data[i]['timezone'].trim();

    //handle times
    const times = stringToTrimmedArray(data[i]['times'], '\n');

    if (times.length) {
      //loop through create an entry for each time
      times.forEach(timestring => {
        //momentize start time
        const time = moment.tz(timestring, 'dddd h:mm a', timezone);

        if (time.isValid()) {
          //push a clone of the meeting onto the array
          meetings.push({ ...meeting, time });
        } else {
          warn(timestring, 'time', i);
        }
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

//translate response from Google Sheet v4
function translateGoogleSheet(data: any) {
  const { values } = data;
  const headers = values
    .shift()
    .map((header: string) => header.toLowerCase().replace(' ', '_'));
  return values.map((row: string[]) => {
    const thisRow: any = {};
    headers.forEach((header: string, index: number) => {
      thisRow[header] = row[index];
    });
    return thisRow;
  });
}

function validateEmail(email: string) {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}

function warn(value: string, type: string, line: number) {
  console.warn(`Row ${line + 2}: “${value}” is not a valid ${type}.`);
}
