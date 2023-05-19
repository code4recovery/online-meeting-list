import {
  ArrowLeftIcon,
  CalendarIcon,
  CashIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ClockIcon,
  ExclamationIcon,
  FilterIcon,
  LinkIcon,
  MailIcon,
  PencilAltIcon,
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
    | 'calendar'
    | 'cash'
    | 'chevron-down'
    | 'chevron-up'
    | 'email'
    | 'error'
    | 'filter'
    | 'language'
    | 'link'
    | 'pencil'
    | 'phone'
    | 'search'
    | 'small-close'
    | 'time'
    | 'video';
  size?: number;
}) {
  const props = { width: size, height: size };
  if (name === 'arrow-left') return <ArrowLeftIcon {...props} />;
  if (name === 'calendar') return <CalendarIcon {...props} />;
  if (name === 'cash') return <CashIcon {...props} />;
  if (name === 'chevron-down') return <ChevronDownIcon {...props} />;
  if (name === 'chevron-up') return <ChevronUpIcon {...props} />;
  if (name === 'email') return <MailIcon {...props} />;
  if (name === 'error') return <ExclamationIcon {...props} />;
  if (name === 'filter') return <FilterIcon {...props} />;
  if (name === 'language') return <TranslateIcon {...props} />;
  if (name === 'link') return <LinkIcon {...props} />;
  if (name === 'pencil') return <PencilAltIcon {...props} />;
  if (name === 'phone') return <PhoneIcon {...props} />;
  if (name === 'search') return <SearchIcon {...props} />;
  if (name === 'small-close') return <XCircleIcon {...props} />;
  if (name === 'time') return <ClockIcon {...props} />;
  if (name === 'video') return <VideoCameraIcon {...props} />;
  return <div />;
}
