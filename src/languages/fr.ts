import { getTypesForLanguage } from '@code4recovery/spec';

import { languageCodes } from '../helpers';

const types = getTypesForLanguage('fr');

const languageTypes = Object.fromEntries(
  Object.entries(types).filter(([key]) => languageCodes.includes(key))
);

const nonLanguageTypes = Object.fromEntries(
  Object.entries(types).filter(([key]) => !languageCodes.includes(key))
);

export const fr = {
  english_name: 'French',
  name: 'Français',
  rtl: false,
  strings: {
    back_to_meetings: 'Retour aux réunions',
    calendar: 'Calendrier',
    clear_search: 'Effacer la recherche',
    close: 'Fermer',
    days: [
      'Dimanche',
      'Lundi',
      'Mardi',
      'Mercredi',
      'Jeudi',
      'Vendredi',
      'Samedi'
    ],
    edit: 'Demander une modification',
    email: 'E-mail',
    email_use: 'Courriel {{value}}',
    filters: 'Filtres',
    forum: 'Forum',
    language: 'Langue',
    languages: {
      ...languageTypes,
      BG: 'Bulgare',
      MT: 'Maltais',
      NE: 'Népalais'
    },
    no_results: 'Aucun résultat ne correspond aux filtres sélectionnés:',
    ongoing: 'En cours',
    report: 'Rapport envoyé',
    report_comments: 'Commentaires',
    report_confirm:
      'Merci de nous en informer. Nous ferons un suivi avec le groupe !',
    report_email: 'Votre e-mail',
    report_error: 'Erreur',
    report_name: 'Votre nom',
    report_send: 'Envoyer un rapport',
    report_sending: 'Envoi en cours',
    report_sent: 'Rapport envoyé',
    search: 'Rechercher',
    telephone: 'Téléphoner',
    telephone_use: 'Appeler {{value}}',
    times: {
      morning: 'Matin',
      midday: 'Midi',
      evening: 'Soir',
      night: 'Nuit'
    },
    timezone: 'Fuseau horaire',
    types: {
      ...nonLanguageTypes,
      'BV-I': 'Aveugle / Malvoyant',
      'D-HOH': 'Sourd / Malentendant',
      'LO-I': 'Solitaires / Isolationnistes',
      LGBTQ: 'LGBTQIAA+',
      QSL: 'Langue des signes québécoise',
      RSL: 'Langue des signes russe'
    },
    video_use: 'Rejoindre {{value}}',
    website: 'Site Internet'
  }
};
