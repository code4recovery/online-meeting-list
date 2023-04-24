import moment from 'moment-timezone';

import { meetingsPerPage, videoServices } from './config';
import { JSONRow, Meeting, State, Tag } from './types';

import { Language, LanguageStrings } from './i18n';

// parse google spreadsheet data into state object (runs once on init)
export function load(
  data: JSONRow[],
  query: URLSearchParams,
  language: Language,
  strings: LanguageStrings
): State {
  const meetings: Meeting[] = [];
  const formats: string[] = [];
  const types: string[] = [];
  const availableLanguages: Language[] = [];

  console.log('hi josh', data);

  let meeting_languages: string[] = [];

  // loop through json entries
  data.forEach((row: JSONRow, i: number) => {
    //required fields
    if (!row.name || !row.timezone) return;

    //start creating meeting
    const meeting: Meeting = {
      name: row.name.trim(),
      buttons: [],
      notes: stringToTrimmedArray(row.notes, true),
      search: '',
      tags: [],
      email: row.email
    };

    //handle url
    if (row.conference_url) {
      const originalUrl = row.conference_url.trim();
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
    }

    //handle phone
    if (row.conference_phone) {
      const originalPhone = row.conference_phone.trim();
      if (originalPhone) {
        let phone = originalPhone.replace(/\D/g, '');
        if (phone.length > 8) {
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
    }

    // handle email
    if (row.email) {
      const email = row.email.trim();
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
    }

    // handle formats

    // types
    row.types
      ?.filter(
        type => !meeting_languages.includes(type) && !types.includes(type)
      )
      .forEach(type => {
        types.push(type);
      });

    // append to meeting tags
    // meeting.tags = meeting.tags.concat([], row.types);

    // add words to search index
    meeting.search = meeting.name
      .toLowerCase()
      .split(' ')
      .filter(e => e)
      .join(' ');

    // timezone
    const timezone = row.timezone.trim();
    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ];
    let timestring = row.day ? `${days[row.day]} ${row.time}` : undefined;

    if (timestring) {
      // momentize start time
      const time = moment
        .tz(timestring, 'dddd hh:mm', timezone)
        .locale(language);

      if (!time.isValid()) {
        warn(timestring, 'time', i);
      } else {
        // push a clone of the meeting onto the array
        meetings.push({ ...meeting, time });
      }
    } else {
      meetings.push(meeting);
    }
  });

  //sort
  formats.sort();
  types.sort();
  availableLanguages.sort();

  return {
    filters: {
      days: arrayToTagsArray(
        [
          strings.sunday,
          strings.monday,
          strings.tuesday,
          strings.wednesday,
          strings.thursday,
          strings.friday,
          strings.saturday
        ],
        query.get('days')?.split(',') || []
      ),
      formats: arrayToTagsArray(
        formats,
        query.get('formats')?.split(',') || []
      ),
      types: arrayToTagsArray(types, query.get('types')?.split(',') || [])
    },
    limit: meetingsPerPage,
    loaded: true,
    meetings: meetings,
    search: '',
    timezone: moment.tz.guess(),
    language: language,
    languages: availableLanguages
  };
}

function arrayToTagsArray(array: string[], values: string[]): Tag[] {
  return array.map(tag => ({ tag: tag, checked: values.includes(tag) }));
}

//split "foo, bar\nbaz" into ["foo", "bar", "baz"]
function stringToTrimmedArray(str?: string, breaksOnly = false): string[] {
  if (!str) return [];
  const sep = '\n';
  if (!breaksOnly) str = str.split(',').join(sep);
  return str
    .split(sep)
    .map(val => val.trim())
    .filter(val => val);
}

export function validateEmail(email: string) {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}

function warn(value: string, type: string, line: number) {
  console.warn(`Row ${line + 2}: “${value}” is not a valid ${type}.`);
}
