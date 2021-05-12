import moment from 'moment-timezone';

import { meetingsPerPage, videoServices } from './config';
import { Meeting, State, Tag } from './types';

import { days } from './config';

import { Language, languages } from './i18n';

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

  //loop through json entries
  for (let i = 0; i < data.feed.entry.length; i++) {
    //handle language
    const meeting_languages = stringToTrimmedArray(
      data.feed.entry[i]['gsx$languages']['$t']
    ).map(
      type =>
        Object.keys(languages).filter(
          language => type === languages[language as Language].english_name
        )[0] as Language
    );

    //make sure available languages is populated
    meeting_languages.forEach(language => {
      if (!availableLanguages.includes(language)) {
        availableLanguages.push(language);
      }
    });

    //only want meetings for current language
    if (!meeting_languages.includes(language)) continue;

    const meeting: Meeting = {
      name: data.feed.entry[i]['gsx$name']['$t'].trim(),
      buttons: [],
      notes: stringToTrimmedArray(data.feed.entry[i]['gsx$notes']['$t'], '\n'),
      updated: data.feed.entry[i]['updated']['$t'],
      search: '',
      languages: meeting_languages,
      tags: []
    };

    //handle url
    const originalUrl = data.feed.entry[i]['gsx$url']['$t'].trim();
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
          value: label
        });
      } catch {
        warn(originalUrl, 'URL', i);
      }
    }

    //handle phone
    const originalPhone = data.feed.entry[i]['gsx$phone']['$t'].trim();
    if (originalPhone) {
      let phone = originalPhone.replace(/\D/g, '');
      if (phone.length > 8) {
        const accessCode = data.feed.entry[i]['gsx$accesscode']['$t'].trim();
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
    const email = data.feed.entry[i]['gsx$email']['$t'].trim();
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
    const meeting_formats = stringToTrimmedArray(
      data.feed.entry[i]['gsx$formats']['$t']
    ).map(format => t(format));

    //append to formats array
    meeting_formats.forEach((format: string) => {
      if (!formats.includes(format)) {
        formats.push(format);
      }
    });

    //append to meeting tags
    meeting.tags = meeting.tags.concat(meeting_formats);

    //handle types
    const meeting_types = stringToTrimmedArray(
      data.feed.entry[i]['gsx$types']['$t']
    ).map(format => t(format));

    //append to types array
    meeting_types
      .filter(type => !types.includes(type))
      .forEach(type => {
        types.push(type);
      });

    //append to meeting tags
    meeting.tags = meeting.tags.concat(meeting_types);

    //add words to search index
    meeting.search = meeting.name
      .toLowerCase()
      .split(' ')
      .filter(e => e)
      .join(' ');

    //handle timezone
    const timezone = data.feed.entry[i]['gsx$timezone']['$t'].trim();

    //handle times
    const times = stringToTrimmedArray(
      data.feed.entry[i]['gsx$times']['$t'],
      '\n'
    );

    if (times.length) {
      //loop through create an entry for each time
      times.forEach(timestring => {
        //momentize start time
        const time = moment
          .tz(timestring, 'dddd h:mm a', timezone)
          .locale(language);

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

function validateEmail(email: string) {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
}

function warn(value: string, type: string, line: number) {
  console.warn(`Row ${line + 2}: “${value}” is not a valid ${type}.`);
}
