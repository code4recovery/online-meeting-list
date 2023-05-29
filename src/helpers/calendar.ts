import { Group, Meeting } from './types';

// format google calendar link
export function formatGoogleCalendar(meeting: Meeting & { group: Group }) {
  if (!meeting.start || !meeting.end) return;

  const params = {
    action: 'TEMPLATE',
    dates: [meeting.start, meeting.end]
      .map(time => time.toFormat("yyyyLLdd'T'HHmmss"))
      .join('/'),
    text: meeting.name,
    trp: 'false',
    ctz: meeting.start.zoneName ?? '', // todo pass original event tz
    sprop: `website:${window.location.origin}`
  };

  const description = formatDescription(meeting);
  if (description) {
    Object.assign(params, { details: description.join('<br>') });
  }

  return `https://www.google.com/calendar/event?${new URLSearchParams(params)}`;
}

// format ICS file for add to calendar
export function formatIcs(meeting: Meeting & { group: Group }) {
  const fmt = "yyyyLLdd'T'HHmmss";

  if (!meeting.start || !meeting.end) return;

  // todo pass original event tz
  const event = [
    `SUMMARY:${meeting.name}`,
    `DTSTAMP:${meeting.start.setZone('UTC').toFormat(fmt)}Z`,
    `DTSTART;TZID=${meeting.start.zoneName}:${meeting.start.toFormat(fmt)}`,
    `DTEND;TZID=${meeting.end.zoneName}:${meeting.end.toFormat(fmt)}`
  ];

  const description = formatDescription(meeting);

  if (description.length) {
    event.push(`DESCRIPTION:${description.join('\n')}`);
  }

  // add group website
  if (meeting.group.website) {
    event.push(`URL:${meeting.group.website}`);
  }

  // format event string
  const blob = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'BEGIN:VEVENT',
    ...event.map(line => line.replaceAll('\n', '\\n').replaceAll(',', '\\,')),
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\n');

  if (iOS()) {
    // create data url for ios
    const uri = `data:text/calendar;charset=utf8,${blob}`;
    window.location = encodeURI(uri) as unknown as Location;
  } else {
    // create temporary link to download
    const url = window.URL.createObjectURL(new Blob([blob]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${meeting.name}.ics`);
    document.body.appendChild(link);
    link.click();
    link.parentNode?.removeChild(link);
  }
}

function iOS() {
  return (
    [
      'iPad Simulator',
      'iPhone Simulator',
      'iPod Simulator',
      'iPad',
      'iPhone',
      'iPod'
    ].includes(navigator.platform) ||
    // iPad on iOS 13 detection
    (navigator.userAgent.includes('Mac') && 'ontouchend' in document)
  );
}

// format outlook 365 link
export function formatOutlook365(meeting: Meeting & { group: Group }) {
  return `https://outlook.office.com/owa/?${formatOutlookQueryString(meeting)}`;
}

// format outlook live link
export function formatOutlookLive(meeting: Meeting & { group: Group }) {
  return `https://outlook.live.com/owa/?${formatOutlookQueryString(meeting)}`;
}

// format shared query string
function formatOutlookQueryString(meeting: Meeting & { group: Group }) {
  return new URLSearchParams({
    path: '/calendar/action/compose',
    rrv: 'addevent',
    startdt: meeting.start?.toFormat("yyyy-LL-dd'T'HH:mm:ss") ?? '', // todo pass original event tz
    enddt: meeting.end?.toFormat("yyyy-LL-dd'T'HH:mm:ss") ?? '', // todo pass original event tz
    subject: meeting.name,
    body: formatDescription(meeting).join('<br>')
  });
}

// build description field
function formatDescription(meeting: Meeting & { group: Group }) {
  // start building description
  const description = [];

  // add notes
  if (meeting.notes) {
    description.push(meeting.notes);
  }

  // add online info
  if (meeting.conference_provider) {
    if (meeting.conference_url_notes) {
      description.push(meeting.conference_url_notes);
    }
    description.push(
      '----( Video Call )----',
      meeting.conference_url,
      '---===---'
    );
  }

  if (meeting.conference_phone) {
    description.push(meeting.conference_phone);
    if (meeting.conference_phone_notes) {
      description.push(meeting.conference_phone_notes);
    }
  }

  return description.flat();
}
