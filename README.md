This is a meeting finder designed to list online recovery meetings around the world. You can see it in production at the [Online Intergroup of AA](https://aa-intergroup.org/oiaa/meetings/) and elsewhere on the web. There is also a [demo version](https://online-meeting-list.netlify.app).

## Managing Data

The data for the demo in managed in [this Google Sheet](https://docs.google.com/spreadsheets/d/1wER2LP3dT_6_LEQ8fSY1rv2bGzIZ2aaMBi_0Bt1aN3I/edit#gid=0). Some notes:

- It's helpful to use the `Format > Clear Formatting` command, since styling doesn't carry over to the app.
- It's a good practice to remove the meeting times and phone numbers from the Notes column, this prevents it getting updated in one place but not another.
- The `Timezone` column is required because time zones don't stay in sync due to daylight savings. Here is a [full list of available options](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) (use _TZ Database Name_).
- Use soft returns or commas to separate `Times`, `Formats`, and `Types`. Use soft returns to indicate paragraph breaks in the Notes column.
- In cases where the format or types vary between times of the same meeting, that can either be mentioned in the `Notes` column, or separate entries could be created. For example, if the Friday night ocurrence of a weekly meeting is Women-only, then it's probably best to create a new row for the Friday meeting.
- Having a `Languages` column enables language support. When that column is present, the meeting finder will be translated into the user's browser language, and only show meetings in that language by default. The selected language can be changed via a dropdown in the filter area, like the timezone. If you don't want this behavior, but still want to note the meeting language, you can list the languages in the `Types` column (Online Intergroup of AA does it this way).

## Link Your Data

1. Get an API Key from the [Google Developers Console](https://console.cloud.google.com) with the Sheets API enabled
1. Make a copy of [this Google Sheet](https://docs.google.com/spreadsheets/d/1wER2LP3dT_6_LEQ8fSY1rv2bGzIZ2aaMBi_0Bt1aN3I/edit#gid=0)
1. Open your spreadsheet and set the visibility to "anyone with the link can view"
1. Add environment variables. One option is to create a file called `.env` in your root folder, and add your spreadsheet's URL (when you're in edit mode, not the URL displayed when you publish it to the web):

```
REACT_APP_GOOGLE_SHEET="https://docs.google.com/spreadsheets/d/<your-spreadsheet-url-goes-here>/edit#gid=0"
REACT_APP_GOOGLE_API_KEY="XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
```

Or, if you are using a service like [Netlify](https://www.netlify.com), you can skip that step and add these variables directly to your build settings.

## JSON Feed Alternative

If you would prefer to use a custom JSON feed rather than a Google Sheet, you can use the parameter:

```
REACT_APP_JSON_URL="https://your-website.org/meetings.json"
```

JSON should be in the format:

```
[
    {
        "name": "Saturday Night Speaker Meeting",
        "times": "Saturday 7:00 PM",
        "timezone": "America/Los_Angeles",
        "url": "https://zoom.us/j/1234567890",
        "phone": "",
        "access_code": "",
        "email": "groupemail@gmail.com",
        "types": "Open, Women",
        "formats": "Video",
        "languages": "English",
        "notes": "Weekly meeting at 7pm Pacific. Meeting ID: 123 456 7890\nPassword: 255804"
    }
]
```

## Email Feedback Form

Optionally you may enable a feedback form using [EmailJS](https://www.emailjs.com/). Sign up for a free account, create an email template, and add the following variables to your `.env` file environment variables:

```
REACT_APP_EMAIL_JS_SERVICE_ID="service_XXXXXXX"
REACT_APP_EMAIL_JS_TEMPLATE_ID="template_XXXXXXX"
REACT_APP_EMAIL_JS_PUBLIC_KEY="XXXXXXXXXXXXXXXXX"
```

Here is an example email template:

```
Hello

The following meeting has been reported

Reported by:

Name: {{reporterName}}:
Email: {{reporterEmail}}

Meeting details:

Name: {{name}}
Meeting ID:  {{id}}
Group Email: {{email}}

Comments:
{{reporterComments}}
```

## Install and Run Locally

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

This project is written in [TypeScript](https://www.typescriptlang.org/) and was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). UI elements by [Chakra](https://chakra-ui.com/). It uses [Moment.js](https://momentjs.com) for time conversions and [React Infinite Scroller](https://cassetterocks.github.io/react-infinite-scroller) for rendering performance.
