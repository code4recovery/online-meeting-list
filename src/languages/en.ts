import { getTypesForLanguage } from '@code4recovery/spec';

import { languageCodes } from '../helpers';

const types = getTypesForLanguage('en');

const languageTypes = Object.fromEntries(
  Object.entries(types).filter(([key]) => languageCodes.includes(key))
);

const nonLanguageTypes = Object.fromEntries(
  Object.entries(types).filter(([key]) => !languageCodes.includes(key))
);

export const en = {
  english_name: 'English',
  name: 'English',
  rtl: false,
  strings: {
    back_to_meetings: 'Back to meetings',
    calendar: 'Calendar',
    clear_search: 'Clear search',
    close: 'Close',
    days: [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ],
    edit: 'Request edit',
    email: 'Email',
    email_use: 'Email {{value}}',
    filters: 'Filters',
    forum: 'Forum',
    language: 'Language',
    languages: {
      ...languageTypes,
      BG: 'Bulgarian',
      MT: 'Maltese',
      NE: 'Nepali'
    },
    no_results: 'No results match the selected filters:',
    ongoing: 'Ongoing',
    report: 'Report Problem',
    report_comments: 'Comments',
    report_confirm:
      'Thanks for letting us know. We will follow up with the group!',
    report_email: 'Your Email',
    report_error: 'Error',
    report_name: 'Your Name',
    report_send: 'Send Report',
    report_sending: 'Sending',
    report_sent: 'Report Sent',
    search: 'Search',
    telephone: 'Phone',
    telephone_use: 'Call {{value}}',
    times: {
      morning: 'Morning',
      midday: 'Midday',
      evening: 'Evening',
      night: 'Night'
    },
    timezone: 'Timezone',
    types: {
      ...nonLanguageTypes,
      'BV-I': 'Blind / Visually Impaired',
      'D-HOH': 'Deaf / Hard of Hearing',
      'LO-I': 'Loners / Isolationists',
      LGBTQ: 'LGBTQIAA+',
      QSL: 'Quebec Sign Language',
      RSL: 'Russian Sign Language'
    },
    video_use: 'Join {{value}}',
    website: 'Website'
  }
};
