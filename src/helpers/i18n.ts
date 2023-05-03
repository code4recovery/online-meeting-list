import { createContext, useContext } from 'react';
import 'moment/min/locales';

import * as languages from '../languages';

export type Language = keyof typeof languages;

export const defaultLanguage = 'en' as Language;

export type LanguageStrings =
  (typeof languages)[keyof typeof languages]['strings'];

export const i18n = createContext<{
  language: Language;
  rtl: boolean;
  strings: LanguageStrings;
}>({
  language: 'en' as Language,
  rtl: false,
  strings: languages[defaultLanguage].strings
});

export const useI18n = () => useContext(i18n);

// find first langauge in language stack
export function getLanguage() {
  return (navigator.languages
    .map(lang => lang.toLowerCase().split('-')[0])
    .filter(lang => languageKeys.includes(lang))[0] ??
    'en') as keyof typeof languages;
}

const languageKeys = Object.keys(languages);

const englishLanguageNames = languageKeys.map(
  language => languages[language as keyof typeof languages].english_name
);

export const languageLookup: { [id: string]: string } = {};
languageKeys.forEach(key => {
  languageLookup[languages[key as keyof typeof languages].english_name] = key;
});

export function isLanguage(string: string): boolean {
  return englishLanguageNames.includes(string);
}

export function isLanguageCode(
  string: string | null
): string is keyof typeof languages {
  return !!string && languageKeys.includes(string);
}
