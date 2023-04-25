import { Moment } from 'moment-timezone';

export type Language =
  | 'am'
  | 'da'
  | 'de'
  | 'el'
  | 'en'
  | 'es'
  | 'fa'
  | 'fr'
  | 'hi'
  | 'hu'
  | 'it'
  | 'ja'
  | 'ko'
  | 'pa'
  | 'pl'
  | 'pt'
  | 'ru'
  | 'sk'
  | 'sv'
  | 'sw';

export type LanguageStrings = {
  clear_search: string;
  close: string;
  days: string[];
  email: string;
  email_use: string;
  filters: string;
  language: string;
  no_results: string;
  ongoing: string;
  report: string;
  report_comments: string;
  report_confirm: string;
  report_email: string;
  report_error: string;
  report_name: string;
  report_send: string;
  report_sending: string;
  report_sent: string;
  search: string;
  telephone: string;
  telephone_use: string;
  timezone: string;
  types: { [key: string]: string };
  video_use: string;
};

export type LanguageDictionary = {
  [key in Language]: {
    english_name: string;
    name: string;
    rtl: boolean;
    strings: LanguageStrings;
  };
};

export type JSONRow = {
  slug: string;
  name?: string;
  time?: string;
  day?: number;
  timezone?: string;
  conference_url?: string;
  conference_phone?: string;
  email?: string;
  notes?: string;
  types?: string[];
  group?: string;
  group_notes?: string;
  updated?: string;
};

export type Meeting = {
  name: string;
  time?: Moment;
  buttons: MeetingLink[];
  notes: string[];
  tags: string[];
  search: string;
  id?: string;
  email?: string;
};

export type MeetingLink = {
  icon: 'link' | 'email' | 'phone' | 'video';
  onClick: () => void;
  value: string;
};

export type State = {
  filters: { [key: string]: Tag[] };
  limit: number;
  loaded: boolean;
  meetings: Meeting[];
  search: string;
  timezone: string;
  language: Language;
  languages: Language[];
};

export type Tag = { tag: string; checked: boolean };
