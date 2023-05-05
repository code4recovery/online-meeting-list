import { Moment } from 'moment-timezone';

export type Group = {
  id: string;
  name?: string;
  notes?: string[];
  email?: string;
  phone?: string;
  venmo?: string;
  paypal?: string;
  square?: string;
  meetings: Meeting[];
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
  group_id?: string;
  group_notes?: string;
  phone?: string;
  venmo?: string;
  paypal?: string;
  square?: string;
  updated?: string;
  edit_url?: string;
};

export type Meeting = {
  slug: string;
  name: string;
  time?: Moment;
  buttons: MeetingLink[];
  notes?: string[];
  group_id?: string;
  tags: string[];
  search: string;
  edit_url?: string;
};

export type MeetingLink = {
  icon: 'link' | 'email' | 'phone' | 'video';
  onClick: () => void;
  value: string;
};
