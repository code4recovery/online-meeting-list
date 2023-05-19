This is a meeting finder designed to list online recovery meetings around the world. You can see it in production at the [Online Intergroup of AA](https://aa-intergroup.org/meetings/) and elsewhere on the web. There is also a [demo version](https://online-meeting-list.netlify.app).

## Managing Data

:warning: As of version `1.0.0`, data must be provided in [Meeting Guide-formatted JSON](https://github.com/code4recovery/spec/). Here are some options:

- [Central](https://github.com/code4recovery/central/) :point_left: this is what OIAA is using
- [12 Step Meeting List](https://wordpress.org/plugins/12-step-meeting-list/) WordPress plugin
- [Sheets](https://sheets.code4recovery.org/) (please note the old OIAA Google Sheets format is no longer supported)
- Custom solution

## Install and run locally

1. Clone this repository.
1. In the project directory, add a file called `.env` and add this line with your data feed URL:

   ```
   REACT_APP_JSON_URL="https://your-website.org/meetings.json"
   ```

1. Open your terminal and run `npm i && npm run dev` to start the app in development mode.

## Deploy to your Website

:warning: If you want to deploy to a subfolder, add this line to your .env file:

```
REACT_APP_BASE_URL="/meetings"
```

1. In your terminal run `npm i && npm run build`.
1. Copy the `/build/static` folder to your website.
1. Add the following HTML to your web page (replace `chunk` below with the correct file name):

```
<script defer src="/static/js/main.chunk.js"></script>
<div id="root"></div>
```

Your webserver needs to point inside pages to your main page. If you are using WordPress, create a page at `/meetings` and then add the following to your theme's `functions.php`, then re-save Settings > Permalinks:

```
add_action('init', function () {
    add_rewrite_rule('^meetings/(.*)?', 'index.php?pagename=meetings', 'top');
});
```

## Dark mode

By default, the app renders in light or dark mode depending on the user's browser preferences. This setting can be overridden with `light` or `dark`:

```
REACT_APP_COLOR_MODE="light";
```

Note: local storage may need to be cleared for changes to appear.

## Contributing

1. Create an issue that describes the problem you are solving. Screenshots are helpful.
1. Create a branch with your code. (Style note: please use [Prettier](https://prettier.io), and keep properties in alphabetical order)
1. Be sure your branch is current. Use `git pull origin && git merge main && npm i`
1. Create a pull request that references the issue. Please name [@joshreisner](https://github.com/joshreisner) as a reviewer.

## Technical Overview

This project is written in [TypeScript](https://www.typescriptlang.org/) and was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). UI elements by [Chakra](https://chakra-ui.com/). It uses [Luxon](https://moment.github.io/luxon/#/) for time conversions and [React Infinite Scroller](https://cassetterocks.github.io/react-infinite-scroller) for rendering performance.
