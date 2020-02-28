This is a meeting finder concept for the [Online Intergroup of AA](http://aa-intergroup.org/). There is a demo at [https://oiaa.netlify.com](https://oiaa.netlify.com).

## Next Steps

- [x] Search working
- [x] Tags working
- [x] Timezone picker working
- [x] Mobile view for filter
- [x] Highlight search results and active tags
- [ ] Filter as "OR" _inside_ categories, but "AND" _between_ categories; eg Saturday OR Sunday AND Phone
- [ ] Bookmarkable search / tag state
- [ ] Clear search button

## Managing Data

The data for this project in managed in [this Google Sheet](https://docs.google.com/spreadsheets/d/1UwTJNdzpGHKL8Vuig37SBk_pYKlA9xJgjjfOGyAeD_4/edit#gid=0). Some notes:

- It's helpful to use the `Format > Clear Formatting` command, since styling doesn't carry over to the app.
- It's a good practice to remove the meeting times and phone numbers from the Notes column, this prevents the inevitable scenario where it gets updated in one place but not another
- The Timezone column is necessary because time zones don't stay in sync due to daylight savings. Best to store them in their local time and allow the app to translate them for the user on the fly.
- Use soft returns (control-return on a Mac) to separate times in the Times column and indicate paragraph breaks in the Notes column
- In cases where the format or types vary between times of the same meeting, that can either be mentioned in the Notes column, or separate entries could be created. For example, if the Friday night ocurrence of a weekly meeting is Women-only, then it's probably best to create a new row for just that Friday meeting.

## Technical Overview

This project is written in [TypeScript](https://www.typescriptlang.org/) and was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

UI elements are provided by [Chakra][https://chakra-ui.com/].

## Install and Run

In the project directory, first run `yarn` once to install the dependencies, then `yarn start` to start the app in development mode. A browser window at [http://localhost:3000/](http://localhost:3000/) should open automatically, and will reload as you make changes. Any lint errors will be visible in the console.

## Contributing

1. Create an issue that describes the problem you are solving. Screenshots are helpful.
1. Create a branch with your code. (Style note: please help keep properties in order!)
1. Create a pull request that references the issue. Please name `joshreisner` as a reviewer.

## Deployments

The project is hosted on Netlify. Commits to the `master` branch deploy automatically. Running `yarn build` is not necessary.
