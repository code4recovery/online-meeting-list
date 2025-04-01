import { createContext, useContext } from 'react';

import { defaultLanguage, Language } from './i18n';
import { sanitizeQuotes } from './stringUtils';

export type InputType = {
  language: Language;
  searchWords: string[];
  tags: string[];
  timezone: string;
};

export const Input = createContext<{
  input: InputType;
  isAdmin: boolean;
  setInput: (input: InputType) => void;
}>({
  input: {
    language: defaultLanguage,
    searchWords: [],
    tags: [],
    timezone: ''
  },
  isAdmin: false,
  setInput: () => {}
});

export const useInput = () => useContext(Input);

export function parseSearchWords(search?: string) {
  if (!search) return [];
  return sanitizeQuotes(search)
    .toLocaleLowerCase()
    .split(' ')
    .map(term => term.trim())
    .filter(e => e);
}
