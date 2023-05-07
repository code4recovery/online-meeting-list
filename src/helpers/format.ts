import { DateTime } from 'luxon';
import type { LanguageStrings } from './i18n';

export function formatTime(strings: LanguageStrings, time?: DateTime) {
  return !time
    ? strings.ongoing
    : strings.days[time.weekday === 7 ? 0 : time.weekday] +
        ' ' +
        time.toFormat('t').toLocaleLowerCase();
}
