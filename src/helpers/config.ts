//don't change this 👇 -- see README.md for help creating an .env file for your app
const sheetUrl = process.env.REACT_APP_GOOGLE_SHEET
  ? process.env.REACT_APP_GOOGLE_SHEET
  : 'https://docs.google.com/spreadsheets/d/1Flzy3t6Ph86HwtprT1KnXdB35AayC8iSJZ4Uyv223oM/edit?usp=sharing';

export const dataUrl = 
  process.env.REACT_APP_JSON_URL ||
  `https://sheets.googleapis.com/v4/spreadsheets/${
    sheetUrl.split('/')[5]
  }/values/A:ZZ?key=${process.env.REACT_APP_GOOGLE_API_KEY}`;

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

//number of meetings displayed (scroll to load more)
export const meetingsPerPage = 10;

//any link is supported, but these conference URLs identified by service name
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
