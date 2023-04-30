import { createContext, useContext } from 'react';

import type { State } from './types';

export const AppState = createContext<{
  state: State;
  setState: (state: State) => void;
}>({
  state: {
    filteredMeetings: [],
    filters: {},
    language: 'en',
    limit: 0,
    loaded: false,
    meetings: [],
    searchWords: [],
    tags: [],
    timezone: ''
  },
  setState: () => {}
});

export const useAppState = () => useContext(AppState);
