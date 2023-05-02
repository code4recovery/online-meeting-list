import {
  ArrowLeftIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ClockIcon,
  ExclamationIcon,
  LinkIcon,
  MailIcon,
  PhoneIcon,
  SearchIcon,
  TranslateIcon,
  VideoCameraIcon,
  XCircleIcon
} from '@heroicons/react/outline';

export function Icon({
  name,
  size = 18
}: {
  name:
    | 'arrow-left'
    | 'chevron-down'
    | 'chevron-up'
    | 'email'
    | 'error'
    | 'language'
    | 'link'
    | 'phone'
    | 'search'
    | 'small-close'
    | 'time'
    | 'video';
  size?: number;
}) {
  const props = { width: size, height: size };
  if (name === 'arrow-left') return <ArrowLeftIcon {...props} />;
  if (name === 'chevron-down') return <ChevronDownIcon {...props} />;
  if (name === 'chevron-up') return <ChevronUpIcon {...props} />;
  if (name === 'email') return <MailIcon {...props} />;
  if (name === 'error') return <ExclamationIcon {...props} />;
  if (name === 'language') return <TranslateIcon {...props} />;
  if (name === 'link') return <LinkIcon {...props} />;
  if (name === 'phone') return <PhoneIcon {...props} />;
  if (name === 'search') return <SearchIcon {...props} />;
  if (name === 'small-close') return <XCircleIcon {...props} />;
  if (name === 'time') return <ClockIcon {...props} />;
  if (name === 'video') return <VideoCameraIcon {...props} />;
  return <div />;
}
