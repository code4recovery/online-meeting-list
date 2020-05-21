//demo data spreadsheet for error testing
export const dataUrl =
  window.location.hostname === 'localhost'
    ? 'https://spreadsheets.google.com/feeds/list/1Lw1BUTC6ZNixT1Q_EqVwk0cYcSgP4joBGsB9pM6Otqc/1/public/values?alt=json'
    : 'https://spreadsheets.google.com/feeds/list/1Lw1BUTC6ZNixT1Q_EqVwk0cYcSgP4joBGsB9pM6Otqc/1/public/values?alt=json';

//todo internationalize
export const days = [
  'domenica',
  'lunedì',
  'martedì',
  'mercoledì',
  'giovedì',
  'venerdì',
  'sabato'
];

//this is the number of meetings it displays before scrolling
export const meetingsPerPage = 10;

//any link is supported, but these are identified by service name
export const videoServices: { [key: string]: string[] } = {
  BlueJeans: ['bluejeans.com'],
  'Free Conference': ['freeconference.com'],
  FreeConferenceCall: ['freeconferencecall.com'],
  'Google Meet': ['meet.google.com'],
  GoToMeeting: ['gotomeet.me', 'gotomeeting.com'],
  Skype: ['skype.com'],
  WebEx: ['webex.com'],
  Zoho: ['zoho.com'],
  Zoom: ['zoom.com', 'zoom.us']
};
