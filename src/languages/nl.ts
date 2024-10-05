import { getTypesForLanguage } from '@code4recovery/spec';

import { languageCodes } from '../helpers';

const types = getTypesForLanguage('nl');

const languageTypes = Object.fromEntries(
  Object.entries(types).filter(([key]) => languageCodes.includes(key))
);

const nonLanguageTypes = Object.fromEntries(
  Object.entries(types).filter(([key]) => !languageCodes.includes(key))
);

export const nl = {
  english_name: 'Dutch',
  name: 'Nederlands',
  rtl: false,
  strings: {
    calendar: 'Kalender',
    clear_search: 'Zoekopdracht wissen',
    close: 'Sluiten',
    days: [
      'Zondag',
      'Maandag',
      'Dinsdag',
      'Woensdag',
      'Donderdag',
      'Vrijdag',
      'Zaterdag'
    ],
    edit: 'Bewerkingsverzoek',
    email: 'E-mail',
    email_use: 'E-mail {{value}}',
    filters: 'Filters',
    forum: 'Forum',
    language: 'Taal',
    languages: {
      ...languageTypes,
      BG: 'Bulgaars',
      MT: 'Maltees',
      NE: 'Nepalees'
    },
    no_results: 'Geen resultaten komen overeen met de geselecteerde filters:',
    ongoing: 'Lopend',
    report: 'Probleem melden',
    report_comments: 'Opmerkingen',
    report_confirm:
      'Bedankt voor het melden. We zullen contact opnemen met de groep!',
    report_email: 'Uw e-mail',
    report_error: 'Fout',
    report_name: 'Uw naam',
    report_send: 'Verzend rapport',
    report_sending: 'Verzenden',
    report_sent: 'Rapport verzonden',
    search: 'Zoeken',
    telephone: 'Telefoon',
    telephone_use: 'Bel {{value}}',
    times: {
      morning: 'Ochtend',
      midday: 'Middag',
      evening: 'Avond',
      night: 'Nacht'
    },
    timezone: 'Tijdzone',
    types: {
      ...nonLanguageTypes,
      'BV-I': 'Blind/Visueel gehandicapten',
      'BV-D': 'Doven en slechthorenden',
      'D-HOH': 'Slechthorenden/Doven',
      LGBTQ: 'LGBTQIAA+',
      QSL: 'Quebec gebarentaal',
      RSL: 'Russische gebarentaal'
    },
    video_use: 'Doe mee met {{value}}',
    website: 'Website'
  }
};
