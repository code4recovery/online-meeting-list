import { createContext, useContext } from 'react';

import { Meeting } from './types';

export type DataType = {
  filters: { [key: string]: string[] };
  filteredMeetings?: Meeting[];
  meetings: Meeting[];
};

export const Data = createContext<DataType>({
  filters: {},
  meetings: []
});

export const useData = () => useContext(Data);
