import { getTypesForLanguage } from '@code4recovery/spec';

import { languageCodes } from '../helpers';

const types = getTypesForLanguage('sv');

const languageTypes = Object.fromEntries(
  Object.entries(types).filter(([key]) => languageCodes.includes(key))
);

const nonLanguageTypes = Object.fromEntries(
  Object.entries(types).filter(([key]) => !languageCodes.includes(key))
);

export const sv = {
  english_name: 'Swedish',
  name: 'Svenska',
  rtl: false,
  strings: {
    calendar: 'Kalender',
    clear_search: 'Rensa sökningen',
    close: 'Stänga',
    days: [
      'Söndag',
      'Måndag',
      'Tisdag',
      'Onsdag',
      'Torsdag',
      'Fredag',
      'Lördag'
    ],
    edit: 'Begäran om redigering',
    email: 'E-post',
    email_use: 'Skicka e-post till {{value}}',
    filters: 'Filter',
    forum: 'Forum',
    language: 'Språk',
    languages: {
      ...languageTypes,
      BG: 'Bulgariska',
      MT: 'Maltesiska',
      NE: 'Nepalesiska'
    },
    no_results: 'Inga resultat matchar de valda filtren:',
    ongoing: 'Pågående',
    report: 'Ripoti Tatizo',
    report_comments: 'Maoni',
    report_confirm: 'Asante kwa kutufahamisha. Tutafuatilia na kikundi!',
    report_email: 'Barua pepe yako',
    report_error: 'Hitilafu',
    report_name: 'Jina lako',
    report_send: 'Tuma Ripoti',
    report_sending: 'Inatuma',
    report_sent: 'Ripoti Imetumwa',
    search: 'Sök',
    telephone: 'Telefon',
    telephone_use: 'Ring {{value}}',
    times: {
      morning: 'Morgon',
      midday: 'Middag',
      evening: 'Kväll',
      night: 'Natt'
    },
    timezone: 'Tidszon',
    types: {
      ...nonLanguageTypes,
      'BV-I': 'Blind / Synskadad',
      'D-HOH': 'Döv/Hörselskadad',
      'LO-I': 'Loners / isolationister',
      LGBTQ: 'HBTQIAA+',
      QSL: 'Quebec teckenspråk',
      RSL: 'Ryskt teckenspråk'
    },
    video_use: 'Gå med i {{value}}',
    website: 'Hemsida'
  }
};
