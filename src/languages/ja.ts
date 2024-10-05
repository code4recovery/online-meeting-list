import { getTypesForLanguage } from '@code4recovery/spec';

import { languageCodes } from '../helpers';

const types = getTypesForLanguage('ja');

const languageTypes = Object.fromEntries(
  Object.entries(types).filter(([key]) => languageCodes.includes(key))
);

const nonLanguageTypes = Object.fromEntries(
  Object.entries(types).filter(([key]) => !languageCodes.includes(key))
);

export const ja = {
  english_name: 'Japanese',
  name: '日本語',
  rtl: false,
  strings: {
    calendar: 'カレンダー',
    clear_search: '明確な検索',
    close: 'シャット',
    days: ['日曜日', '月曜', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'],
    edit: '編集リクエスト',
    email: 'Eメール',
    email_use: 'メール{{value}}',
    filters: 'フィルタ',
    forum: 'フォーラム',
    language: '言語',
    languages: {
      ...languageTypes,
      BG: 'ブルガリア語',
      MT: 'マルタ語',
      NE: 'ネパール語'
    },
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
    search: '探す',
    telephone: '電話',
    telephone_use: '{{value}}を呼び出す',
    times: {
      morning: '朝',
      midday: '真昼',
      evening: '夕方',
      night: '夜'
    },
    timezone: 'タイムゾーン',
    types: {
      ...nonLanguageTypes,
      'BV-I': '盲目/視覚障害者',
      'D-HOH': '聴覚障害者/難聴',
      'LO-I': '孤独/孤立主義者',
      LGBTQ: 'LGBTQIAA+',
      QSL: 'ケベック手話',
      RSL: 'ロシア手話'
    },
    video_use: '{{value}}に参加する',
    website: 'Webサイト'
  }
};
