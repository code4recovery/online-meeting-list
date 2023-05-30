import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, defer, RouterProvider } from 'react-router-dom';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { DateTime } from 'luxon';

import { App } from './App';
import './index.css';
import { getLanguage, load, parseSearchWords, theme } from './helpers';
import { Error as ErrorBoundary, Meetings, SingleMeeting } from './components';

const container = document.getElementById('root');
if (!container) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(container);

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

        const url = new URL(request.url);
        const query = url.searchParams;
        const searchWords = parseSearchWords(query.get('search')?.toString());
        const language = getLanguage();

        const tags = query.getAll('tags');

        return defer({
          language,
          searchWords,
          tags,
          timezone: DateTime.local().zoneName,
          load: load(process.env.REACT_APP_JSON_URL, language)
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
          loader: ({ params }) => params.id ?? ''
        }
      ]
    }
  ],
  { basename: process.env.REACT_APP_BASE_URL }
);

root.render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <RouterProvider router={router} />
    </ChakraProvider>
  </StrictMode>
);
