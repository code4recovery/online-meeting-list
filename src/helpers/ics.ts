import { DateTime } from 'luxon';

import { Group, Meeting } from './types';

//format ICS file for add to calendar
export function formatIcs(meeting: Meeting & { group: Group }) {
  const fmt = "yyyyLLdd'T'HHmmss";

  if (!meeting.start || !meeting.end) return;

  //make sure it's in the future
  if (meeting.start < DateTime.now()) {
    meeting.start = meeting.start.plus({ week: 1 });
    meeting.end = meeting.end.plus({ week: 1 });
  }

  //start building event
  const event = [
    `SUMMARY:${meeting.name}`,
    `DTSTAMP:${meeting.start.setZone('UTC').toFormat(fmt)}Z`,
    `DTSTART;TZID=${meeting.start.zoneName}:${meeting.start.toFormat(fmt)}`,
    `DTEND;TZID=${meeting.end.zoneName}:${meeting.end.toFormat(fmt)}`
  ];

  //start building description
  const description = [];

  //add notes
  if (meeting.notes) {
    description.push(meeting.notes);
  }

  //add online info
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

  if (description.length) {
    event.push(`DESCRIPTION:${description.join('\n')}`);
  }

  //add group website
  if (meeting.group.website) {
    event.push(`URL:${meeting.group.website}`);
  }

  //format event string
  const blob = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'BEGIN:VEVENT',
    ...event.map(line => line.replaceAll('\n', '\\n').replaceAll(',', '\\,')),
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\n');

  if (iOS()) {
    //create data url for ios
    const uri = `data:text/calendar;charset=utf8,${blob}`;
    window.location = encodeURI(uri) as unknown as Location;
  } else {
    //create temporary link to download
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
