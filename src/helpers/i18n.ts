import { createContext } from 'react';
import 'moment/min/locales';

export type Language =
  | 'am'
  | 'da'
  | 'de'
  | 'el'
  | 'en'
  | 'es'
  | 'fa'
  | 'fr'
  | 'hi'
  | 'hu'
  | 'it'
  | 'ja'
  | 'ko'
  | 'pa'
  | 'pl'
  | 'pt'
  | 'ru'
  | 'sk'
  | 'sv'
  | 'sw';

export type LanguageStrings = {
  clear_search: string;
  close: string;
  email: string;
  email_use: string;
  filters: string;
  friday: string;
  language: string;
  monday: string;
  no_results: string;
  ongoing: string;
  saturday: string;
  search: string;
  sunday: string;
  telephone: string;
  telephone_use: string;
  thursday: string;
  timezone: string;
  tuesday: string;
  video_use: string;
  wednesday: string;
};

export type LanguageDictionary = {
  [key in Language]: {
    english_name: string;
    name: string;
    rtl: boolean;
    strings: LanguageStrings;
  };
};

export const languages: LanguageDictionary = {
  am: {
    english_name: 'Amharic',
    name: 'አማርኛ',
    rtl: false,
    strings: {
      clear_search: 'ፍለጋን ያጽዱ',
      close: 'ገጠመ',
      email: 'ኢሜል',
      email_use: 'ኢሜል {{value}}',
      filters: 'ማጣሪያዎች',
      friday: 'አርብ',
      language: 'ቋንቋ',
      monday: 'ሰኞ',
      no_results: 'ከተመረጡት ማጣሪያዎች ጋር የሚዛመዱ ውጤቶች የሉም',
      ongoing: 'በመካሄድ ላይ',
      saturday: 'ቅዳሜ',
      search: 'ፈልግ',
      sunday: 'እሁድ',
      telephone: 'ስልክ',
      telephone_use: 'ወደ {{እሴት}} ይደውሉ',
      thursday: 'ሐሙስ',
      timezone: 'የጊዜ ክልል',
      tuesday: 'ማክሰኞ',
      video_use: '{{value}} ን ይቀላቀሉ',
      wednesday: 'እሮብ'
    }
  },
  da: {
    english_name: 'Danish',
    name: 'Dansk',
    rtl: false,
    strings: {
      clear_search: 'Ryd søgning',
      close: 'Tæt',
      email: 'E-mail',
      email_use: 'E-mail {{value}}',
      filters: 'Filtre',
      friday: 'Fredag',
      language: 'Sprog',
      monday: 'Mandag',
      no_results: 'Ingen resultater matcher de valgte filtre:',
      ongoing: 'Igangværende',
      saturday: 'Lørdag',
      search: 'Søg',
      sunday: 'Søndag',
      telephone: 'Telefon',
      telephone_use: 'Ring til {{value}}',
      thursday: 'Torsdag',
      timezone: 'Tidszone',
      tuesday: 'Tirsdag',
      video_use: 'Deltag i {{value}}',
      wednesday: 'Onsdag'
    }
  },
  de: {
    english_name: 'German',
    name: 'Deutsche',
    rtl: false,
    strings: {
      clear_search: 'Saubere Suche',
      close: 'Schließen',
      email: 'E-Mail',
      email_use: 'E-Mail {{value}}',
      filters: 'Filter',
      friday: 'Freitag',
      language: 'Sprache',
      monday: 'Montag',
      no_results:
        'Keine Ergebnisse stimmen mit den ausgewählten Filtern überein:',
      ongoing: 'Laufend',
      saturday: 'Samstag',
      search: 'Suche',
      sunday: 'Sonntag',
      telephone: 'Telefon',
      telephone_use: 'Rufen Sie {{value}} auf',
      thursday: 'Donnerstag',
      timezone: 'Zeitzone',
      tuesday: 'Dienstag',
      video_use: '{{value}} beitreten',
      wednesday: 'Mittwoch'
    }
  },
  el: {
    english_name: 'Greek',
    name: 'Ελληνικά',
    rtl: false,
    strings: {
      clear_search: 'Εκκαθάριση αναζήτησης',
      close: 'Κλείσε',
      email: 'ΗΛΕΚΤΡΟΝΙΚΗ ΔΙΕΥΘΥΝΣΗ',
      email_use: 'Διεύθυνση ηλεκτρονικού ταχυδρομείου {{value}}',
      filters: 'Φίλτρα',
      friday: 'Παρασκευή',
      language: 'Γλώσσα',
      monday: 'Δευτέρα',
      no_results: 'Κανένα αποτέλεσμα δεν ταιριάζει με τα επιλεγμένα φίλτρα:',
      ongoing: 'Σε εξέλιξη',
      saturday: 'Σάββατο',
      search: 'Αναζήτηση',
      sunday: 'Κυριακή',
      telephone: 'Τηλέφωνο',
      telephone_use: 'Κλήση {{value}}',
      thursday: 'Πέμπτη',
      timezone: 'Ζώνη ώρας',
      tuesday: 'Τρίτη',
      video_use: 'Γίνετε μέλος {{value}}',
      wednesday: 'Τετάρτη'
    }
  },
  en: {
    english_name: 'English',
    name: 'English',
    rtl: false,
    strings: {
      clear_search: 'Clear search',
      close: 'Close',
      email: 'Email',
      email_use: 'Email {{value}}',
      filters: 'Filters',
      friday: 'Friday',
      language: 'Language',
      monday: 'Monday',
      no_results: 'No results match the selected filters:',
      ongoing: 'Ongoing',
      saturday: 'Saturday',
      search: 'Search',
      sunday: 'Sunday',
      telephone: 'Phone',
      telephone_use: 'Call {{value}}',
      thursday: 'Thursday',
      timezone: 'Timezone',
      tuesday: 'Tuesday',
      video_use: 'Join {{value}}',
      wednesday: 'Wednesday'
    }
  },
  es: {
    english_name: 'Spanish',
    name: 'Español',
    rtl: false,
    strings: {
      clear_search: 'Borrar búsqueda',
      close: 'Cerrar',
      email: 'Correo electrónico',
      email_use: 'Correo electrónico {{value}}',
      filters: 'Filtros',
      friday: 'Viernes',
      language: 'Idioma',
      monday: 'Lunes',
      no_results: 'Ningún resultado coincide con los filtros seleccionados:',
      ongoing: 'En marcha',
      saturday: 'Sábado',
      search: 'Buscar',
      sunday: 'Domingo',
      telephone: 'Teléfono',
      telephone_use: 'Llame a {{value}}',
      thursday: 'Jueves',
      timezone: 'Zona horaria',
      tuesday: 'Martes',
      video_use: 'Únete a {{value}}',
      wednesday: 'Miércoles'
    }
  },
  fa: {
    english_name: 'Farsi',
    name: 'فارسی',
    rtl: true,
    strings: {
      clear_search: 'جستجو را پاک کنید',
      close: 'بستن',
      email: 'پست الکترونیک',
      email_use: 'ایمیل {{value}}',
      filters: 'فیلترها',
      friday: 'جمعه',
      language: 'زبان',
      monday: 'دوشنبه',
      no_results: 'هیچ نتیجه ای با فیلترهای انتخاب شده مطابقت ندارد:',
      ongoing: 'در دست اقدام',
      saturday: 'شنبه',
      search: 'جستجو کردن',
      sunday: 'یکشنبه',
      telephone: 'تلفن',
      telephone_use: 'تماس با {{value}}',
      thursday: 'پنج شنبه',
      timezone: 'منطقه زمانی',
      tuesday: 'سهشنبه',
      video_use: 'به {{value}} بپیوندید',
      wednesday: 'چهار شنبه'
    }
  },
  fr: {
    english_name: 'French',
    name: 'Français',
    rtl: false,
    strings: {
      clear_search: 'Effacer la recherche',
      close: 'Fermer',
      email: 'E-mail',
      email_use: 'Courriel {{value}}',
      filters: 'Filtres',
      friday: 'Vendredi',
      language: 'Langue',
      monday: 'Lundi',
      no_results: 'Aucun résultat ne correspond aux filtres sélectionnés:',
      ongoing: 'En cours',
      saturday: 'Samedi',
      search: 'Rechercher',
      sunday: 'Dimanche',
      telephone: 'Téléphoner',
      telephone_use: 'Appeler {{value}}',
      thursday: 'Jeudi',
      timezone: 'Fuseau horaire',
      tuesday: 'Mardi',
      video_use: 'Rejoindre {{value}}',
      wednesday: 'Mercredi'
    }
  },
  hi: {
    english_name: 'Hindi',
    name: 'हिंदी',
    rtl: false,
    strings: {
      clear_search: 'स्पष्ट खोज',
      close: 'बंद करे',
      email: 'ईमेल',
      email_use: 'ईमेल {{value}}',
      filters: 'फिल्टर',
      friday: 'शुक्रवार',
      language: 'भाषा: हिन्दी',
      monday: 'सोमवार',
      no_results: 'कोई परिणाम चयनित फ़िल्टर से मेल नहीं खाता:',
      ongoing: 'चल रही है',
      saturday: 'शनिवार',
      search: 'खोज',
      sunday: 'रविवार',
      telephone: 'फ़ोन',
      telephone_use: 'कॉल {{value}}',
      thursday: 'गुरूवार',
      timezone: 'समय क्षेत्र',
      tuesday: 'मंगलवार',
      video_use: '{{value}} से जुड़ें',
      wednesday: 'बुधवार'
    }
  },
  hu: {
    english_name: 'Hungarian',
    name: 'Magyar',
    rtl: false,
    strings: {
      clear_search: 'Törölje a keresést',
      close: 'Bezárás',
      email: 'Email',
      email_use: 'E-mail: {{value}}',
      filters: 'Szűrők',
      friday: 'Péntek',
      language: 'Nyelv',
      monday: 'Hétfő',
      no_results: 'Nincs találat a kiválasztott szűrőknek:',
      ongoing: 'Folyamatban lévő',
      saturday: 'Szombat',
      search: 'Keresés',
      sunday: 'Vasárnap',
      telephone: 'Telefon',
      telephone_use: 'Hívjon {{value}}',
      thursday: 'Csütörtök',
      timezone: 'Időzóna',
      tuesday: 'Kedd',
      video_use: 'Csatlakozás a következőhöz: {{value}}',
      wednesday: 'Szerda'
    }
  },
  it: {
    english_name: 'Italian',
    name: 'Italiano',
    rtl: false,
    strings: {
      clear_search: 'Cancella ricerca',
      close: 'Chiudi',
      email: 'E-mail',
      email_use: "Invia un'e-mail a {{value}}",
      filters: 'Filtri',
      friday: 'Venerdì',
      language: 'Linguaggio',
      monday: 'Lunedi',
      no_results: 'Nessun risultato corrisponde ai filtri selezionati:',
      ongoing: 'Incorso',
      saturday: 'Sabato',
      search: 'Ricerca',
      sunday: 'Domenica',
      telephone: 'Telefono',
      telephone_use: 'Chiama {{value}}',
      thursday: 'Giovedi',
      timezone: 'Fuso orario',
      tuesday: 'Martedì',
      video_use: 'Unisciti a {{value}}',
      wednesday: 'Mercoledì'
    }
  },
  ja: {
    english_name: 'Japanese',
    name: '日本語',
    rtl: false,
    strings: {
      clear_search: '明確な検索',
      close: 'シャット',
      email: 'Eメール',
      email_use: 'メール{{value}}',
      filters: 'フィルタ',
      friday: '金曜日',
      language: '言語',
      monday: '月曜',
      no_results: '選択したフィルターに一致する結果はありません。',
      ongoing: '進行中',
      saturday: '土曜日',
      search: '探す',
      sunday: '日曜日',
      telephone: '電話',
      telephone_use: '{{value}}を呼び出す',
      thursday: '木曜日',
      timezone: 'タイムゾーン',
      tuesday: '火曜日',
      video_use: '{{value}}に参加する',
      wednesday: '水曜日'
    }
  },
  ko: {
    english_name: 'Korean',
    name: '한국인',
    rtl: false,
    strings: {
      clear_search: '검색 지우기',
      close: '닫다',
      email: '이메일',
      email_use: '이메일 {{value}}',
      filters: '필터',
      friday: '금요일',
      language: '언어',
      monday: '월요일',
      no_results: '선택한 필터와 일치하는 결과가 없습니다.',
      ongoing: '전진',
      saturday: '토요일',
      search: '검색',
      sunday: '일요일',
      telephone: '전화',
      telephone_use: '{{value}} 호출',
      thursday: '목요일',
      timezone: '시간대',
      tuesday: '화요일',
      video_use: '{{value}} 가입',
      wednesday: '수요일'
    }
  },
  pa: {
    english_name: 'Punjabi',
    name: 'ਪੰਜਾਬੀ',
    rtl: false,
    strings: {
      clear_search: 'ਖੋਜ ਸਾਫ ਕਰੋ',
      close: 'ਬੰਦ ਕਰੋ',
      email: 'ਈ - ਮੇਲ',
      email_use: 'ਈਮੇਲ {{value}}',
      filters: 'ਫਿਲਟਰ',
      friday: 'ਸ਼ੁੱਕਰਵਾਰ',
      language: 'ਭਾਸ਼ਾ',
      monday: 'ਸੋਮਵਾਰ',
      no_results: 'ਚੁਣੇ ਗਏ ਫਿਲਟਰਾਂ ਨਾਲ ਕੋਈ ਨਤੀਜਾ ਨਹੀਂ ਮਿਲਦਾ:',
      ongoing: 'ਚਲ ਰਿਹਾ ਹੈ',
      saturday: 'ਸ਼ਨੀਵਾਰ',
      search: 'ਖੋਜ',
      sunday: 'ਐਤਵਾਰ',
      telephone: 'ਫੋਨ',
      telephone_use: 'ਕਾਲ ਕਰੋ {{value}}',
      thursday: 'ਵੀਰਵਾਰ ਨੂੰ',
      timezone: 'ਸਮਾਂ ਖੇਤਰ',
      tuesday: 'ਮੰਗਲਵਾਰ',
      video_use: '{{value}} ਵਿੱਚ ਸ਼ਾਮਲ ਹੋਵੋ',
      wednesday: 'ਬੁੱਧਵਾਰ'
    }
  },
  pl: {
    english_name: 'Polish',
    name: 'Polskie',
    rtl: false,
    strings: {
      clear_search: 'Wyczyść wyszukiwanie',
      close: 'Zamknąć',
      email: 'E-mail',
      email_use: 'Email {{value}}',
      filters: 'Filtry',
      friday: 'piątek',
      language: 'Język',
      monday: 'poniedziałek',
      no_results: 'Żadne wyniki nie pasują do wybranych filtrów:',
      ongoing: 'Trwający',
      saturday: 'sobota',
      search: 'Szukaj',
      sunday: 'niedziela',
      telephone: 'Telefon',
      telephone_use: 'Zadzwoń {{value}}',
      thursday: 'czwartek',
      timezone: 'Strefa czasowa',
      tuesday: 'wtorek',
      video_use: 'Dołącz do {{value}}',
      wednesday: 'środa'
    }
  },
  pt: {
    english_name: 'Portuguese',
    name: 'Português',
    rtl: false,
    strings: {
      clear_search: 'Limpar pesquisa',
      close: 'Perto',
      email: 'E-mail',
      email_use: 'E-mail {{value}}',
      filters: 'Filtros',
      friday: 'sexta-feira',
      language: 'Língua',
      monday: 'Segunda-feira',
      no_results: 'Nenhum resultado corresponde aos filtros selecionados:',
      ongoing: 'Em andamento',
      saturday: 'sábado',
      search: 'Procurar',
      sunday: 'Domigo',
      telephone: 'Telefone',
      telephone_use: 'Ligue para {{value}}',
      thursday: 'quinta-feira',
      timezone: 'Fuso horário',
      tuesday: 'Terça',
      video_use: 'Junte-se a {{value}}',
      wednesday: 'quarta-feira'
    }
  },
  ru: {
    english_name: 'Russian',
    name: 'русский',
    rtl: false,
    strings: {
      clear_search: 'Очистить поиск',
      close: 'Закрывать',
      email: 'Электронное письмо',
      email_use: 'Электронная почта {{value}}',
      filters: 'Фильтры',
      friday: 'Пятница',
      language: 'Язык',
      monday: 'понедельник',
      no_results: 'Нет результатов, соответствующих выбранным фильтрам:',
      ongoing: 'Непрерывный',
      saturday: 'Суббота',
      search: 'Поиск',
      sunday: 'Воскресенье',
      telephone: 'Телефон',
      telephone_use: 'Позвоните по телефону {{value}}',
      thursday: 'Четверг',
      timezone: 'Часовой пояс',
      tuesday: 'вторник',
      video_use: 'Присоединяйтесь к {{value}}',
      wednesday: 'среда'
    }
  },
  sk: {
    english_name: 'Slovak',
    name: 'Slovák',
    rtl: false,
    strings: {
      clear_search: 'Vymazať vyhľadávanie',
      close: 'Zavrieť',
      email: 'E-mail',
      email_use: 'E-mail {{value}}',
      filters: 'Filtre',
      friday: 'Piatok',
      language: 'Jazyk',
      monday: 'Pondelok',
      no_results: 'Vybraným filtrom nezodpovedajú žiadne výsledky:',
      ongoing: 'Prebieha',
      saturday: 'Sobota',
      search: 'Vyhľadávanie',
      sunday: 'Nedeľa',
      telephone: 'Telefón',
      telephone_use: 'Volať {{value}}',
      thursday: 'Štvrtok',
      timezone: 'Časové pásmo',
      tuesday: 'Utorok',
      video_use: 'Pripojte sa k {{value}}',
      wednesday: 'Streda'
    }
  },
  sv: {
    english_name: 'Swedish',
    name: 'Svenska',
    rtl: false,
    strings: {
      clear_search: 'Rensa sökningen',
      close: 'Stänga',
      email: 'E-post',
      email_use: 'Skicka e-post till {{value}}',
      filters: 'Filter',
      friday: 'Fredag',
      language: 'Språk',
      monday: 'Måndag',
      no_results: 'Inga resultat matchar de valda filtren:',
      ongoing: 'Pågående',
      saturday: 'Lördag',
      search: 'Sök',
      sunday: 'Söndag',
      telephone: 'Telefon',
      telephone_use: 'Ring {{value}}',
      thursday: 'Torsdag',
      timezone: 'Tidszon',
      tuesday: 'Tisdag',
      video_use: 'Gå med i {{value}}',
      wednesday: 'Onsdag'
    }
  },
  sw: {
    english_name: 'Swahili',
    name: 'Kiswahili',
    rtl: false,
    strings: {
      clear_search: 'Futa utafutaji',
      close: 'Funga',
      email: 'Barua pepe',
      email_use: 'Barua pepe {{value}}',
      filters: 'Vichujio',
      friday: 'Ijumaa',
      language: 'Lugha',
      monday: 'Jumatatu',
      no_results: 'Hakuna matokeo yanayolingana na vichujio vilivyochaguliwa:',
      ongoing: 'Inaendelea',
      saturday: 'Jumamosi',
      search: 'Tafuta',
      sunday: 'Jumapili',
      telephone: 'Simu',
      telephone_use: 'Piga simu kwa {{value}}',
      thursday: 'Alhamisi',
      timezone: 'Saa za eneo',
      tuesday: 'Jumanne',
      video_use: 'Jiunge na {{value}}',
      wednesday: 'Jumatano'
    }
  }
};

export const i18n = createContext<{
  language: Language;
  rtl: boolean;
  strings: LanguageStrings;
}>({
  language: 'en',
  rtl: false,
  strings: languages.en.strings
});

export function getLanguage(): Language {
  const [lang] = navigator.language.toLowerCase().split('-');
  const useLanguage = lang in languages ? lang : 'en';
  return useLanguage as Language;
}

const languageKeys = Object.keys(languages);

const englishLanguageNames = languageKeys.map(
  language => languages[language as Language].english_name
);

export const languageLookup: { [id: string]: Language } = {};
languageKeys.forEach(key => {
  languageLookup[languages[key as Language].english_name] = key as Language;
});

export function isLanguage(string: string): boolean {
  return englishLanguageNames.includes(string);
}

export function isLanguageCode(string: string | null): string is Language {
  return !!string && languageKeys.includes(string);
}
