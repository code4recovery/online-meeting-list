import { DateTime } from 'luxon';

import { videoServices } from './config';
import { DataType } from './data';
import { Language } from './i18n';
import * as languageStrings from '../languages';
import type { Group, JSONRow, Meeting } from './types';

export async function load(url: string, language: Language): Promise<DataType> {
  const { strings } = languageStrings[language];
  const meetings: Meeting[] = [];
  const groups: { [key: string]: Group } = {};
  const formats: string[] = [];
  const types: string[] = [];
  const languages: string[] = [];
  let hasOngoing = false;

  const cacheBustedUrl = `${url}${
    url.includes('?') ? '&' : '?'
  }${new Date().getTime()}`;
  const result = await fetch(cacheBustedUrl);
  const data = await result.json();

  // loop through json entries
  data.forEach((row: JSONRow, i: number) => {
    // required fields
    if (!row.name) return;

    // start creating meeting
    const meeting: Meeting = {
      slug: row.slug,
      name: row.name.trim(),
      notes: stringToTrimmedArray(row.notes, true),
      search: '',
      tags: [],
      group_id: row.group_id,
      // edit_url: row.edit_url,
      rand: process.env.REACT_APP_SORT_BY === 'random' ? Math.random() : 0
    };

    if (typeof row.day !== 'undefined' && row.time && row.timezone) {
      // timezone
      const timestring = `${strings.days[row.day]} ${row.time}`;
      const zone = row.timezone.trim();

      // luxonize start time
      const weekday = row.day === 0 ? 7 : row.day;
      let [hour, minute] = row.time.split(':').map(num => parseInt(num));
      const start = DateTime.fromObject({ weekday, hour, minute }, { zone });

      if (!start.isValid) {
        warn(timestring, `invalid start time ${start.invalidExplanation}`, i);
      } else {
        meeting.start = start;

        if (row.end_time) {
          let [hour, minute] = row.time.split(':').map(num => parseInt(num));
          const end = DateTime.fromObject({ weekday, hour, minute }, { zone });
          if (!end.isValid) {
            warn(timestring, `invalid end time ${start.invalidExplanation}`, i);
            meeting.end = start.plus({ hour: 1 });
          } else {
            meeting.end = end;
          }
        } else {
          meeting.end = start.plus({ hour: 1 });
        }
      }
    } else {
      meeting.tags.push(strings.ongoing);
      hasOngoing = true;
    }

    // start formats array
    const meetingFormats: string[] = [];

    // handle url
    if (row.conference_url) {
      const originalUrl = row.conference_url.trim();
      if (originalUrl) {
        try {
          const url = new URL(originalUrl);
          if (!['http:', 'https:'].includes(url.protocol)) {
            throw new Error();
          }
          const host = url.hostname;
          const provider = Object.keys(videoServices).find(
            service =>
              videoServices[service].filter(domain => host.endsWith(domain))
                .length
          );
          if (provider) {
            meeting.conference_url = row.conference_url;
            meeting.conference_provider = provider;
            meeting.conference_url_notes = row.conference_url_notes;
            meetingFormats.push(provider);
          }
        } catch {
          warn(originalUrl, 'URL', i);
        }
      }
    }

    // handle phone
    if (row.conference_phone) {
      const originalPhone = row.conference_phone.trim();
      if (originalPhone) {
        let phone = originalPhone.replace(/\D/g, '');
        if (phone.length > 8) {
          meeting.conference_phone = phone;
          meeting.conference_phone_notes = row.conference_phone_notes;
          meetingFormats.push(strings.telephone);
        } else {
          warn(originalPhone, 'phone number', i);
        }
      }
    }

    const website = validateUrl(row.website) ? row.website : undefined;

    // email / forum formats
    if (
      !meeting.conference_provider &&
      !meeting.conference_phone &&
      !meeting.start
    ) {
      if (row.email) {
        meetingFormats.push(strings.email);
      }
      if (website) {
        meetingFormats.push(strings.forum);
      }
    }

    // handle formats
    meetingFormats
      .filter(format => !formats.includes(format))
      .forEach(format => formats.push(format));

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

    // append to meeting tags (no day, that is set in filter)
    meeting.tags = [
      ...meeting.tags,
      ...meetingTypes,
      ...meetingLanguages,
      ...meetingFormats
    ];

    // add words to search index
    meeting.search = meeting.name
      .toLowerCase()
      .split(' ')
      .filter(e => e)
      .join(' ');

    meetings.push(meeting);

    if (row.group_id) {
      if (row.group_id in groups) {
        groups[row.group_id].meetings.push(meeting);
      } else {
        groups[row.group_id] = {
          id: row.group_id,
          name: row.group,
          notes: stringToTrimmedArray(row.group_notes, true),
          email: row.email && validateEmail(row.email) ? row.email : undefined,
          website,
          phone: row.phone,
          venmo: row.venmo,
          paypal: row.paypal,
          square: row.square,
          meetings: [meeting]
        };
      }
    }
  });

  //sort
  formats.sort();
  types.sort();
  languages.sort();

  return {
    filters: {
      days: hasOngoing ? [...strings.days, strings.ongoing] : strings.days,
      times: Object.values(strings.times),
      formats,
      types,
      languages
    },
    meetings,
    groups
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

function validateUrl(url?: string) {
  if (!url) return false;
  if (!url.startsWith('https://') && !url.startsWith('http://')) return false;
  if (!url.includes('.') || url.length <= 10) return false;
  return true;
}

function warn(value: string, type: string, line: number) {
  console.warn(`Row ${line + 2}: “${value}” is not a valid ${type}.`);
}
