import moment from 'moment-timezone';

import { meetingsPerPage, videoServices } from './config';
import { Meeting, State, Tag } from './types';

import { days } from './config';

import { Language, isLanguage, languageLookup } from './i18n';

//parse google spreadsheet data into state object (runs once on init)
export function load(
  data: any,
  query: URLSearchParams,
  language: Language,
  t: (string: string, value?: string) => string
): State {
  const meetings: Meeting[] = [];
  const formats: string[] = [];
  const types: string[] = [];
  const availableLanguages: Language[] = [];

  //translate google sheet format
  if (!process.env.REACT_APP_JSON_URL) {
    data = translateGoogleSheet(data);
  }

  //loop through json entries
  for (let i = 0; i < data.feed.entry.length; i++) {
    //handle language
    const meetingLanguages = stringToTrimmedArray(
      data.feed.entry[i]['gsx$languages']['$t']
    )
      .filter(string => {
        const isLanguageDefined = isLanguage(string);
        if (!isLanguageDefined) warn(string, 'language', i);
        return isLanguageDefined;
      })
      .map(string => languageLookup[string]);

    //make sure available languages is populated
    meetingLanguages.forEach(language => {
      if (language && !availableLanguages.includes(language)) {
        availableLanguages.push(language);
      }
    });

    //only want meetings for current language, but need to keep going to see all data issues
    const addMeeting = meetingLanguages.includes(language);

    //start creating meeting
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
        if (!['http:', 'https:'].includes(url.protocol)) {
          throw new Error();
        }
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
          value: label
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
            window.open(`tel:${phone}`);
          },
          value: phone
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
          value: email
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

    //append to formats & types arrays
    if (addMeeting) {
      meeting_formats.forEach((format: string) => {
        if (!formats.includes(format)) {
          formats.push(format);
        }
      });
      meeting_types
        .filter(type => !types.includes(type))
        .forEach(type => {
          types.push(type);
        });
    }

    //append to meeting tags
    meeting.tags = meeting.tags.concat(meeting_formats);

    //add words to search index
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
        const time = moment
          .tz(timestring, 'dddd h:mm a', timezone)
          .locale(language);

        if (!time.isValid()) {
          warn(timestring, 'time', i);
        } else if (addMeeting) {
          //push a clone of the meeting onto the array
          meetings.push({ ...meeting, time });
        }
      });
    } else if (addMeeting) {
      //ongoing meeting; add to meetings
      meetings.push(meeting);
    }
  }

  //sort
  formats.sort();
  types.sort();
  availableLanguages.sort();

  return {
    filters: {
      days: arrayToTagsArray(
        days.map(day => t(day)),
        query.get('days')?.split(',') || []
      ),
      formats: arrayToTagsArray(
        formats,
        query.get('formats')?.split(',') || []
      ),
      types: arrayToTagsArray(types, query.get('types')?.split(',') || [])
    },
    limit: meetingsPerPage,
    loading: false,
    meetings: meetings,
    search: [],
    timezone: moment.tz.guess(),
    language: language,
    languages: availableLanguages
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
  if (!values || !values.length) return [];
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
