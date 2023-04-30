import { Moment } from 'moment-timezone';
import { languages } from './i18n';

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
  slug: string;
  name: string;
  time?: Moment;
  buttons: MeetingLink[];
  notes?: string[];
  group_notes?: string[];
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
  filters: { [key: string]: string[] };
  filteredMeetings: Meeting[];
  limit: number;
  loaded: boolean;
  meeting?: string;
  meetings: Meeting[];
  searchWords: string[];
  tags: string[];
  timezone: string;
  language: keyof typeof languages;
};
