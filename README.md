This is a meeting finder designed to list online recovery meetings around the world. You can see it in production at the [Online Intergroup of AA](https://aa-intergroup.org/meetings/) and elsewhere on the web. There is also a [demo version](https://online-meeting-list.netlify.app).

## Managing Data

:warning: As of version `1.0.0`, data must be provided in [Meeting Guide-formatted JSON](https://github.com/code4recovery/spec/). This can be genrated in the following ways:

- [Central](https://github.com/code4recovery/central/) :point_left: this is what OIAA is using
- [12 Step Meeting List](https://wordpress.org/plugins/12-step-meeting-list/) WordPress plugin
- [Sheets](https://sheets.code4recovery.org/) (please note the legacy OIAA Google Sheets format is no longer supported)
- Custom database

## Installation

In your env file, specify this variable:

```
REACT_APP_JSON_URL="https://your-website.org/meetings.json"
```

## Install and run locally

1. Clone this repository.
1. In the project directory, run `npm i` once to install the dependencies.
1. Run `npm start` to start the app in development mode.

## Deploy to your Website

1. In the project directory, run `npm run build`. This creates new minified javascript files.
1. Now copy just the javascript the files to your website.
1. Update your `<script src="">` tag with the new URL.

## Contributing

1. Create an issue that describes the problem you are solving. Screenshots are helpful.
1. Create a branch with your code. (Style note: please use [Prettier](https://prettier.io), and keep properties in alphabetical order)
1. Be sure your branch is current. Use `git pull origin && git merge main && npm i`
1. Create a pull request that references the issue. Please name [@joshreisner](https://github.com/joshreisner) as a reviewer.

## Technical Overview

This project is written in [TypeScript](https://www.typescriptlang.org/) and was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). UI elements by [Chakra](https://chakra-ui.com/). It uses [Luxon](https://moment.github.io/luxon/#/) for time conversions and [React Infinite Scroller](https://cassetterocks.github.io/react-infinite-scroller) for rendering performance.
