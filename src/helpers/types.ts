import { Moment } from 'moment-timezone';

import { Language } from './i18n';

export type Meeting = {
  name: string;
  time?: Moment;
  buttons: MeetingLink[];
  notes: string[];
  tags: string[];
  updated: string;
  search: string;
};

export type MeetingLink = {
  icon: 'link' | 'email' | 'phone' | 'video';
  onClick: () => void;
  value: string;
};

export type State = {
  filters: { [key: string]: Tag[] };
  limit: number;
  loading: boolean;
  meetings: Meeting[];
  search: string[];
  timezone: string;
  language: Language;
  languages: Language[];
};

export type Tag = { tag: string; checked: boolean };
