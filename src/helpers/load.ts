import moment from 'moment-timezone';

import { videoServices } from './config';
import { DataType } from './data';
import { languages as languageStrings } from './i18n';
import type { JSONRow, Meeting } from './types';

export async function load(url: string): Promise<DataType> {
  const { strings } = languageStrings.en;
  const meetings: Meeting[] = [];
  const formats: string[] = [];
  const types: string[] = [];
  const languages: string[] = [];

  console.log('loadin');

  const result = await fetch(url);
  const data = await result.json();

  // loop through json entries
  data.forEach((row: JSONRow, i: number) => {
    //required fields
    if (!row.name || !row.timezone) return;

    //start creating meeting
    const meeting: Meeting = {
      slug: row.slug,
      name: row.name.trim(),
      buttons: [],
      notes: stringToTrimmedArray(row.notes, true),
      group_notes: stringToTrimmedArray(row.group_notes, true),
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
    const meetingTypes = row.types
      ? row.types
          .filter(type => type in strings.types)
          .map(type => strings.types[type as keyof typeof strings.types])
      : [];

    meetingTypes
      .filter(type => !types.includes(type))
      .forEach(type => types.push(type));

    const meetingLanguages = row.types
      ? row.types
          .filter(language => language in strings.languages)
          .map(
            language =>
              strings.languages[language as keyof typeof strings.languages]
          )
      : [];

    meetingLanguages
      .filter(language => !languages.includes(language))
      .forEach(language => languages.push(language));

    // append to meeting tags
    meeting.tags = [...meeting.tags, ...meetingTypes, ...meetingLanguages];

    // add words to search index
    meeting.search = meeting.name
      .toLowerCase()
      .split(' ')
      .filter(e => e)
      .join(' ');

    // timezone
    const timezone = row.timezone.trim();
    let timestring = row.day
      ? `${strings.days[row.day]} ${row.time}`
      : undefined;

    if (timestring) {
      // momentize start time
      const time = moment.tz(timestring, 'dddd hh:mm', timezone);

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
  languages.sort();

  return {
    filters: {
      days: strings.days,
      types,
      languages
    },
    meetings
  };
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

function validateEmail(email: string) {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}

function warn(value: string, type: string, line: number) {
  console.warn(`Row ${line + 2}: “${value}” is not a valid ${type}.`);
}
