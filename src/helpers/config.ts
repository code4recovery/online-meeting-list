//demo data spreadsheet for error testing
export const dataUrl = `https://spreadsheets.google.com/feeds/list/${
  process.env.REACT_APP_GOOGLE_SHEET_ID ||
  '1wER2LP3dT_6_LEQ8fSY1rv2bGzIZ2aaMBi_0Bt1aN3I'
}/${process.env.REACT_APP_GOOGLE_SHEET_PAGE || '1'}/public/values?alt=json`;

console.log(dataUrl);

//todo internationalize
export const days = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
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
