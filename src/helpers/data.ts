import { createContext, useContext } from 'react';

import type { Group, Meeting } from './types';

export type DataType = {
  filters: { [key: string]: string[] };
  filteredMeetings?: Meeting[];
  meetings: Meeting[];
  groups: { [key: string]: Group };
};

export const Data = createContext<DataType>({
  filters: {},
  meetings: [],
  groups: {}
});

export const useData = () => useContext(Data);
