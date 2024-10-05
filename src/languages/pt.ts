import { getTypesForLanguage } from '@code4recovery/spec';

import { languageCodes } from '../helpers';

const types = getTypesForLanguage('pt');

const languageTypes = Object.fromEntries(
  Object.entries(types).filter(([key]) => languageCodes.includes(key))
);

const nonLanguageTypes = Object.fromEntries(
  Object.entries(types).filter(([key]) => !languageCodes.includes(key))
);

export const pt = {
  english_name: 'Portuguese',
  name: 'Português',
  rtl: false,
  strings: {
    calendar: 'Calendário',
    clear_search: 'Limpar pesquisa',
    close: 'Perto',
    days: [
      'Domigo',
      'Segunda-feira',
      'Terça',
      'Quarta-feira',
      'Quinta-feira',
      'Sexta-feira',
      'Sábado'
    ],
    edit: 'Solicitar edição',
    email: 'E-mail',
    email_use: 'E-mail {{value}}',
    filters: 'Filtros',
    forum: 'Fórum',
    language: 'Língua',
    languages: {
      ...languageTypes,
      BG: 'Búlgaro',
      MT: 'Maltês',
      NE: 'Nepalês'
    },
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
    search: 'Procurar',
    telephone: 'Telefone',
    telephone_use: 'Ligue para {{value}}',
    times: {
      morning: 'Manhã',
      midday: 'Meio-dia',
      evening: 'Tarde',
      night: 'Noite'
    },
    timezone: 'Fuso horário',
    types: {
      ...nonLanguageTypes,
      'BV-I': 'Cegos / Deficientes Visuais',
      'D-HOH': 'Surdo/duro de audição',
      'LO-I': 'Solitários / Isolacionistas',
      LGBTQ: 'LGBTQIAA+',
      QSL: 'Quebec Sign Language',
      RSL: 'língua de sinais russa'
    },
    video_use: 'Junte-se a {{value}}',
    website: 'Local na rede Internet'
  }
};
