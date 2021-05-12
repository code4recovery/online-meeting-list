import React from 'react';
import {
  ChevronDownIcon,
  ChevronUpIcon,
  ClockIcon,
  LinkIcon,
  MailIcon,
  PhoneIcon,
  SearchIcon,
  TranslateIcon,
  VideoCameraIcon,
  XCircleIcon
} from '@heroicons/react/outline';

export type IconProps = {
  name:
    | 'chevron-down'
    | 'chevron-up'
    | 'email'
    | 'language'
    | 'link'
    | 'phone'
    | 'search'
    | 'small-close'
    | 'time'
    | 'video';
};

export function Icon({ name }: IconProps) {
  if (name === 'chevron-down')
    return <ChevronDownIcon width={18} height={18} />;
  if (name === 'chevron-up') return <ChevronUpIcon width={18} height={18} />;
  if (name === 'email') return <MailIcon width={18} height={18} />;
  if (name === 'language') return <TranslateIcon width={18} height={18} />;
  if (name === 'link') return <LinkIcon width={18} height={18} />;
  if (name === 'phone') return <PhoneIcon width={18} height={18} />;
  if (name === 'search') return <SearchIcon width={18} height={18} />;
  if (name === 'small-close') return <XCircleIcon width={18} height={18} />;
  if (name === 'time') return <ClockIcon width={18} height={18} />;
  if (name === 'video') return <VideoCameraIcon width={18} height={18} />;
  return <div />;
}
