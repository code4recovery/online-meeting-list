import { createContext, useContext } from 'react';

import * as languages from '../languages';

export type Language = keyof typeof languages;

export const defaultLanguage = 'en';

export type LanguageStrings =
  (typeof languages)[keyof typeof languages]['strings'];

export const i18n = createContext<{
  language: Language;
  rtl: boolean;
  strings: LanguageStrings;
}>({
  language: defaultLanguage,
  rtl: false,
  strings: languages[defaultLanguage].strings
});

export const useI18n = () => useContext(i18n);

// find first supported language in language stack
export function getLanguage(): Language {
  const supportedLanguages = navigator.languages
    .map(lang => lang.toLowerCase().split('-')[0])
    .filter(lang => lang in languages);
  return supportedLanguages.length
    ? (supportedLanguages[0] as Language)
    : defaultLanguage;
}
