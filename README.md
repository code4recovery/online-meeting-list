This is a new meeting finder for the [Online Intergroup of AA](http://aa-intergroup.org/). There is a demo at [https://oiaa.netlify.com](https://oiaa.netlify.com) and an embedded version at [https://aa-intergroup.org/oiaa/meetings/](https://aa-intergroup.org/oiaa/meetings/).

## Next Steps

- [x] Search working
- [x] Tags working
- [x] Timezone picker working
- [x] Mobile view for filter
- [x] Highlight search results and active tags
- [x] Bookmarkable search / tag state
- [ ] No results screen
- [ ] ~Filter as "OR" _inside_ categories, but "AND" _between_ categories; eg Saturday OR Sunday AND Phone~
- [ ] ~Clear search button~

## Managing Data

The data for this project in managed in [this Google Sheet](https://docs.google.com/spreadsheets/d/1tYV4wBZkY_3hp0tresN6iZBCwOyqkK-dz4UAWQPI1Vs/edit#gid=0). Some notes:

- It's helpful to use the `Format > Clear Formatting` command, since styling doesn't carry over to the app.
- It's a good practice to remove the meeting times and phone numbers from the Notes column, this prevents the inevitable scenario where it gets updated in one place but not another
- The Timezone column is necessary because time zones don't stay in sync due to daylight savings. Best to store them in their local time and allow the app to translate them for the user on the fly.
- Use soft returns (control-return on a Mac) to separate times in the Times column and indicate paragraph breaks in the Notes column
- In cases where the format or types vary between times of the same meeting, that can either be mentioned in the Notes column, or separate entries could be created. For example, if the Friday night ocurrence of a weekly meeting is Women-only, then it's probably best to create a new row for just that Friday meeting.

## Technical Overview

This project is written in [TypeScript](https://www.typescriptlang.org/) and was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). UI elements by [Chakra](https://chakra-ui.com/). Uses [Moment.js](https://momentjs.com) for time conversions and [React Infinite Scroller](https://cassetterocks.github.io/react-infinite-scroller) for rendering performance.

## Install and Run

In the project directory, first run `yarn` once to install the dependencies, then `yarn start` to start the app in development mode.

## Contributing

1. Create an issue that describes the problem you are solving. Screenshots are helpful.
1. Create a branch with your code. (Style note: please help keep properties in order!)
1. Create a pull request that references the issue. Please name [@joshreisner](https://github.com/joshreisner) as a reviewer.

## Deployments

The demo is hosted on Netlify. Commits to the `master` branch are automatically built and deployed.
