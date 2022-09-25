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
  report: string;
  report_comments: string;
  report_confirm: string;
  report_email: string;
  report_error: string;
  report_name: string;
  report_send: string;
  report_sending: string;
  report_sent: string;
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
      report: 'ችግርን ሪፖርት አድርግ',
      report_comments: 'አስተያየቶች',
      report_confirm: 'ስላሳወቅከን እናመሰግናለን። ቡድኑን እንከታተላለን!',
      report_email: 'የእርስዎ ኢሜይል',
      report_error: 'ስህተት',
      report_name: 'የአንተ ስም',
      report_send: 'ሪፖርት ላክ',
      report_sending: 'በመላክ ላይ',
      report_sent: 'ሪፖርት ተልኳል።',
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
      report: 'Rapportér problem',
      report_comments: 'Kommentarer',
      report_confirm: 'Tak, fordi du gav os besked. Vi følger op med gruppen!',
      report_email: 'Din email',
      report_error: 'Fejl',
      report_name: 'Dit navn',
      report_send: 'Send rapport',
      report_sending: 'Sender',
      report_sent: 'Rapport sendt',
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
      report: 'Problem melden',
      report_comments: 'Kommentare',
      report_confirm:
        'Danke, dass Sie uns das mitteilen. Wir werden mit der Gruppe weitermachen!',
      report_email: 'Deine E-Mail',
      report_error: 'Fehler',
      report_name: 'Ihren Namen',
      report_send: 'Bericht senden',
      report_sending: 'Senden',
      report_sent: 'Bericht gesendet',
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
      report: 'Αναφορά προβλήματος',
      report_comments: 'Σχόλια',
      report_confirm:
        'Σας ευχαριστούμε που μας ενημερώσατε. Θα συνεχίσουμε με την ομάδα!',
      report_email: 'Το ηλεκτρονικό σου ταχυδρομείο',
      report_error: 'Λάθος',
      report_name: 'Το όνομα σου',
      report_send: 'Αποστολή αναφοράς',
      report_sending: 'Αποστολή',
      report_sent: 'Η αναφορά στάλθηκε',
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
      report: 'Report Problem',
      report_comments: 'Comments',
      report_confirm:
        'Thanks for letting us know. We will follow up with the group!',
      report_email: 'Your Email',
      report_error: 'Error',
      report_name: 'Your Name',
      report_send: 'Send Report',
      report_sending: 'Sending',
      report_sent: 'Report Sent',
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
      report: 'Reportar problema',
      report_comments: 'Comentarios',
      report_confirm: 'Gracias por dejarnos saber. Seguiremos con el grupo!',
      report_email: 'Tu correo electrónico',
      report_error: 'Error',
      report_name: 'Su nombre',
      report_send: 'Enviar reporte',
      report_sending: 'Enviando',
      report_sent: 'Reporte enviado',
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
      report: 'مشکل را گزارش بدهید',
      report_comments: 'نظرات',
      report_confirm:
        'ممنون ازینکه ما را در جریان گذاشتید. با گروه پیگیری می کنیم!',
      report_email: 'ایمیل شما',
      report_error: 'خطا',
      report_name: 'اسم شما',
      report_send: 'ارسال گزارش',
      report_sending: 'در حال ارسال',
      report_sent: 'گزارش ارسال شد',
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
      report: 'Rapport envoyé',
      report_comments: 'Commentaires',
      report_confirm:
        'Merci de nous en informer. Nous ferons un suivi avec le groupe !',
      report_email: 'Votre e-mail',
      report_error: 'Erreur',
      report_name: 'Votre nom',
      report_send: 'Envoyer un rapport',
      report_sending: 'Envoi en cours',
      report_sent: 'Rapport envoyé',
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
      report: 'समस्या की सूचना दें',
      report_comments: 'टिप्पणियाँ',
      report_confirm:
        'हमारी जानकारी में लाने के लिये धन्यवाद। हम समूह के साथ पालन करेंगे!',
      report_email: 'तुम्हारा ईमेल',
      report_error: 'गलती',
      report_name: 'तुम्हारा  नाम',
      report_send: 'रिपोर्ट भेजो',
      report_sending: 'भेजना',
      report_sent: 'सूचना भेजी गई',
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
      report: 'Probléma bejelentése',
      report_comments: 'Hozzászólások',
      report_confirm:
        'Köszönjük, hogy tudatta velünk. Követni fogjuk a csoportot!',
      report_email: 'Az email címed',
      report_error: 'Hiba',
      report_name: 'A neved',
      report_send: 'Jelentés küldése',
      report_sending: 'Küldés',
      report_sent: 'Jelentés elküldve',
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
      report: 'Segnala problema',
      report_comments: 'Commenti',
      report_confirm: 'Grazie per averci fatto sapere. Seguiremo il gruppo!',
      report_email: 'La tua email',
      report_error: 'Errore',
      report_name: 'Il tuo nome',
      report_send: 'Spedisci il rapporto',
      report_sending: 'Invio',
      report_sent: 'Rapporto inviato',
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
      report: '問題を報告する',
      report_comments: 'コメント',
      report_confirm:
        '知らせてくれてありがとう。 グループでフォローしていきます！',
      report_email: 'あなたの電子メール',
      report_error: 'エラー',
      report_name: 'あなたの名前',
      report_send: 'レポートを送信',
      report_sending: '送信',
      report_sent: 'レポートを送信しました',
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
      report: '문제 보고',
      report_comments: '코멘트',
      report_confirm: '알려주셔서 감사합니다. 우리는 그룹을 따라갈 것입니다!',
      report_email: '귀하의 이메일',
      report_error: '오류',
      report_name: '당신의 이름',
      report_send: '보고서 보내기',
      report_sending: '배상',
      report_sent: '보고서 전송됨',
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
      report: 'ਸਮੱਸਿਆ ਦੀ ਰਿਪੋਰਟ ਕਰੋ',
      report_comments: 'ਟਿੱਪਣੀਆਂ',
      report_confirm: 'ਸਾਨੂੰ ਦੱਸਣ ਲਈ ਧੰਨਵਾਦ। ਅਸੀਂ ਸਮੂਹ ਨਾਲ ਪਾਲਣਾ ਕਰਾਂਗੇ!',
      report_email: 'ਤੁਹਾਡਾ ਈਮੇਲ',
      report_error: 'ਗਲਤੀ',
      report_name: 'ਤੁਹਾਡਾ ਨਾਮ',
      report_send: 'ਰਿਪੋਰਟ ਭੇਜੋ',
      report_sending: 'ਭੇਜ ਰਿਹਾ ਹੈ',
      report_sent: 'ਰਿਪੋਰਟ ਭੇਜੀ ਗਈ',
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
      report: 'Zgłoś problem',
      report_comments: 'Uwagi',
      report_confirm:
        'Dzięki za poinformowanie nas. Skontaktujemy się z grupą!',
      report_email: 'Twój email',
      report_error: 'Błąd',
      report_name: 'Twoje imię',
      report_send: 'Wyślij raport',
      report_sending: 'Wysyłanie',
      report_sent: 'Raport wysłany',
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
      friday: 'Sexta-feira',
      language: 'Língua',
      monday: 'Segunda-feira',
      no_results: 'Nenhum resultado corresponde aos filtros selecionados:',
      ongoing: 'Em andamento',
      report: 'Reportar problema',
      report_comments: 'Comentários',
      report_confirm: 'Obrigado por nos informar. Vamos acompanhar o grupo!',
      report_email: 'Seu endereço de email',
      report_error: 'Erro',
      report_name: 'Seu nome',
      report_send: 'Enviar relatório',
      report_sending: 'Enviando',
      report_sent: 'Relatório enviado',
      saturday: 'Sábado',
      search: 'Procurar',
      sunday: 'Domigo',
      telephone: 'Telefone',
      telephone_use: 'Ligue para {{value}}',
      thursday: 'Quinta-feira',
      timezone: 'Fuso horário',
      tuesday: 'Terça',
      video_use: 'Junte-se a {{value}}',
      wednesday: 'Quarta-feira'
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
      report: 'Отчет о проблемах',
      report_comments: 'Комментарии',
      report_confirm:
        'Спасибо за то, что дали нам знать. Будем следить за группой!',
      report_email: 'Ваш адрес электронной почты',
      report_error: 'Ошибка',
      report_name: 'Ваше имя',
      report_send: 'Отправить жалобу',
      report_sending: 'Отправка',
      report_sent: 'Отчет отправлен',
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
      report: 'Nahlásiť problém',
      report_comments: 'Komentáre',
      report_confirm:
        'Ďakujeme, že ste nám dali vedieť. Budeme pokračovať v skupine!',
      report_email: 'Tvoj email',
      report_error: 'Chyba',
      report_name: 'Tvoje meno',
      report_send: 'Poslať správu',
      report_sending: 'Odosielanie',
      report_sent: 'Správa odoslaná',
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
      report: 'Ripoti Tatizo',
      report_comments: 'Maoni',
      report_confirm: 'Asante kwa kutufahamisha. Tutafuatilia na kikundi!',
      report_email: 'Barua pepe yako',
      report_error: 'Hitilafu',
      report_name: 'Jina lako',
      report_send: 'Tuma Ripoti',
      report_sending: 'Inatuma',
      report_sent: 'Ripoti Imetumwa',
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
      report: 'Rapportera problem',
      report_comments: 'Kommentarer',
      report_confirm:
        'Tack för att du berättar för oss. Vi kommer att följa upp gruppen!',
      report_email: 'Din email',
      report_error: 'Fel',
      report_name: 'Ditt namn',
      report_send: 'Skicka rapport',
      report_sending: 'Sändning',
      report_sent: 'Rapport skickad',
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
