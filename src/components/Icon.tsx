import {
  ArrowLeftIcon,
  BanknotesIcon,
  CalendarIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  ClockIcon,
  EnvelopeIcon,
  ExclamationTriangleIcon,
  FunnelIcon,
  LinkIcon,
  MagnifyingGlassIcon,
  PencilSquareIcon,
  PhoneIcon,
  VideoCameraIcon,
  XCircleIcon
} from '@heroicons/react/24/outline';

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
  if (name === 'cash') return <BanknotesIcon {...props} />;
  if (name === 'chevron-down') return <ChevronDownIcon {...props} />;
  if (name === 'chevron-up') return <ChevronUpIcon {...props} />;
  if (name === 'email') return <EnvelopeIcon {...props} />;
  if (name === 'error') return <ExclamationTriangleIcon {...props} />;
  if (name === 'filter') return <FunnelIcon {...props} />;
  if (name === 'link') return <LinkIcon {...props} />;
  if (name === 'pencil') return <PencilSquareIcon {...props} />;
  if (name === 'phone') return <PhoneIcon {...props} />;
  if (name === 'search') return <MagnifyingGlassIcon {...props} />;
  if (name === 'small-close') return <XCircleIcon {...props} />;
  if (name === 'time') return <ClockIcon {...props} />;
  if (name === 'video') return <VideoCameraIcon {...props} />;
  return <div />;
}
