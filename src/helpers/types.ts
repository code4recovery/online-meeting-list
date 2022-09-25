import { Moment } from 'moment-timezone';

import { Language } from './i18n';

export type DataRow = {
  name?: string;
  times?: string;
  timezone?: string;
  url?: string;
  phone?: string;
  access_code?: string;
  email?: string;
  notes?: string;
  types?: string;
  formats?: string;
  languages?: string;
  meeting_id?: string;
};

export type GoogleSheetData = { values: string[][] };

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
