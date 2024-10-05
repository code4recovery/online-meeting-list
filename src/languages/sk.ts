import { getTypesForLanguage } from '@code4recovery/spec';

import { languageCodes } from '../helpers';

const types = getTypesForLanguage('sk');

const languageTypes = Object.fromEntries(
  Object.entries(types).filter(([key]) => languageCodes.includes(key))
);

const nonLanguageTypes = Object.fromEntries(
  Object.entries(types).filter(([key]) => !languageCodes.includes(key))
);

export const sk = {
  english_name: 'Slovak',
  name: 'Slovák',
  rtl: false,
  strings: {
    calendar: 'Kalendár',
    clear_search: 'Vymazať vyhľadávanie',
    close: 'Zavrieť',
    days: [
      'Nedeľa',
      'Pondelok',
      'Utorok',
      'Streda',
      'Štvrtok',
      'Piatok',
      'Sobota'
    ],
    edit: 'Požiadavka na úpravu',
    email: 'E-mail',
    email_use: 'E-mail {{value}}',
    filters: 'Filtre',
    forum: 'Fórum',
    language: 'Jazyk',
    languages: {
      ...languageTypes,
      BG: 'Bulharčina',
      MT: 'Maltčina',
      NE: 'Nepálčina'
    },
    no_results: 'Vybraným filtrom nezodpovedajú žiadne výsledky:',
    ongoing: 'Prebieha',
    report: 'Nahlásiť problém',
    report_comments: 'Komentáre',
    report_confirm:
      'Ďakujeme, že ste nám dali vedieť. Budeme pokračovať v skupine!',
    report_email: 'Tvoj email',
    report_error: 'Chyba',
    report_name: 'Tvoje meno',
    report_send: 'Poslať správu',
    report_sending: 'Odosielanie',
    report_sent: 'Správa odoslaná',
    search: 'Vyhľadávanie',
    telephone: 'Telefón',
    telephone_use: 'Volať {{value}}',
    times: {
      morning: 'Ráno',
      midday: 'Poludnie',
      evening: 'Večer',
      night: 'Noc'
    },
    timezone: 'Časové pásmo',
    types: {
      ...nonLanguageTypes,
      'BV-I': 'Nevidiaci / zrakovo postihnutí',
      'D-HOH': 'Nepočujúci / nedoslýchaví',
      'LO-I': 'Samotári/izolacionisti',
      LGBTQ: 'LGBTQIAA+',
      QSL: 'Quebec posunkový jazyk',
      RSL: 'Ruský posunkový jazyk'
    },
    video_use: 'Pripojte sa k {{value}}',
    website: 'Webová stránka'
  }
};
