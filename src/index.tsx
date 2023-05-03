import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, defer, RouterProvider } from 'react-router-dom';
import moment from 'moment-timezone';

import { App } from './App';
import './index.css';
import { getLanguage, load, parseSearchWords } from './helpers';
import { Error as ErrorBoundary, Meetings, SingleMeeting } from './components';

const container = document.getElementById('root');
if (!container) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(container);

console.log('out here');

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      errorElement: <ErrorBoundary />,
      loader: ({ request }) => {
        if (!process.env.REACT_APP_JSON_URL) {
          throw new Error('REACT_APP_JSON_URL not specified');
        }

        console.log('top loader');

        const url = new URL(request.url);
        const query = url.searchParams;
        const searchWords = parseSearchWords(query.get('search')?.toString());
        const language = getLanguage();

        const tags = query.getAll('tags');

        return defer({
          language,
          searchWords,
          tags,
          timezone: moment.tz.guess(),
          load: load(process.env.REACT_APP_JSON_URL)
        });
      },
      children: [
        {
          path: '/',
          element: <Meetings />
        },
        {
          path: '/:id',
          element: <SingleMeeting />,
          loader: ({ params }) => params.id
        }
      ]
    }
  ],
  { basename: process.env.REACT_APP_BASE_URL }
);

root.render(
  <StrictMode>
    <RouterProvider router={router} />{' '}
  </StrictMode>
);
