This is a meeting finder for listing online meetings. You can see it in production at the [Online Intergroup of AA](https://aa-intergroup.org/oiaa/meetings/) and elsewhere on the web. There is a demo version at [https://online-meeting-list.netlify.com](https://online-meeting-list.netlify.com).

## Next Steps

- [x] Search working
- [x] Tags working
- [x] Timezone picker working
- [x] Mobile view for filter
- [x] Highlight search results and active tags
- [x] Bookmarkable search / tag state
- [x] No results screen
- [x] Clear search button
- [x] Fail gracefully when encountering bad data

## Managing Data

The data for the demo in managed in [this Google Sheet](https://docs.google.com/spreadsheets/d/1wER2LP3dT_6_LEQ8fSY1rv2bGzIZ2aaMBi_0Bt1aN3I/edit#gid=0). Some notes:

- It's helpful to use the `Format > Clear Formatting` command, since styling doesn't carry over to the app.
- It's a good practice to remove the meeting times and phone numbers from the Notes column, this prevents the inevitable scenario where it gets updated in one place but not another
- The Timezone column is necessary because time zones don't stay in sync due to daylight savings. Best to store them in their local time and allow the app to translate them for the user on the fly.
- Use soft returns (control-return on a Mac) to separate times in the Times column and indicate paragraph breaks in the Notes column
- In cases where the format or types vary between times of the same meeting, that can either be mentioned in the Notes column, or separate entries could be created. For example, if the Friday night ocurrence of a weekly meeting is Women-only, then it's probably best to create a new row for just that Friday meeting.

## Technical Overview

This project is written in [TypeScript](https://www.typescriptlang.org/) and was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). UI elements by [Chakra](https://chakra-ui.com/). Uses [Moment.js](https://momentjs.com) for time conversions and [React Infinite Scroller](https://cassetterocks.github.io/react-infinite-scroller) for rendering performance.

## Install and Run

In the project directory, first run `yarn` once to install the dependencies, then `yarn start` to start the app in development mode.

## Add Your Data

1. Make a copy of [this Google Sheet](https://docs.google.com/spreadsheets/d/1wER2LP3dT_6_LEQ8fSY1rv2bGzIZ2aaMBi_0Bt1aN3I/edit#gid=0)
1. Open the spreadsheet and publish it to the web (under the file menu)
1. Copy the Sheet ID. You get this from the URL when you're editing the sheet. For example, if the URL is `https://docs.google.com/spreadsheets/d/1wER2LP3dT_6_LEQ8fSY1rv2bGzIZ2aaMBi_0Bt1aN3I/edit#gid=0`, then your ID is `1wER2LP3dT_6_LEQ8fSY1rv2bGzIZ2aaMBi_0Bt1aN3I`.
1. Create a new file in the project directory called `.env`, and add your sheet ID here

```
REACT_APP_GOOGLE_SHEET_ID="1wER2LP3dT_6_LEQ8fSY1rv2bGzIZ2aaMBi_0Bt1aN3I"
REACT_APP_GOOGLE_SHEET_PAGE="1"
```

1. Re-run `yarn start` on the command line

## Contributing

1. Create an issue that describes the problem you are solving. Screenshots are helpful.
1. Create a branch with your code. (Style note: please help keep properties in order!)
1. Create a pull request that references the issue. Please name [@joshreisner](https://github.com/joshreisner) as a reviewer.

## Deployments

The demo is hosted on Netlify. Commits to the `master` branch are automatically built and deployed.
