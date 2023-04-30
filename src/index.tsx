import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { App } from './App';

import './index.css';
import { getLanguage, languages, load } from './helpers';
import { SingleMeeting } from './components';
import { Meetings } from './components/Meetings';

const container = document.getElementById('root');
if (!container) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(container);

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    loader: async () => {
      if (!process.env.REACT_APP_JSON_URL) {
        throw new Error('react app json not specified');
      }
      const result = await fetch(process.env.REACT_APP_JSON_URL);
      const json = await result.json();
      const language = getLanguage();
      return load(
        json,
        new URLSearchParams(window.location.search),
        language,
        languages[language].strings
      );
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
]);

root.render(
  <StrictMode>
    <RouterProvider router={router} />{' '}
  </StrictMode>
);
