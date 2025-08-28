import { getTypesForLanguage } from '@code4recovery/spec';

import { languageCodes } from '../helpers';

const types = getTypesForLanguage('es');

const languageTypes = Object.fromEntries(
  Object.entries(types).filter(([key]) => languageCodes.includes(key))
);

const nonLanguageTypes = Object.fromEntries(
  Object.entries(types).filter(([key]) => !languageCodes.includes(key))
);

export const es = {
  english_name: 'Spanish',
  name: 'Español',
  rtl: false,
  strings: {
    back_to_meetings: 'Regreso a las reuniones',
    calendar: 'Calendario',
    clear_search: 'Borrar búsqueda',
    close: 'Cerrar',
    days: [
      'Domingo',
      'Lunes',
      'Martes',
      'Miércoles',
      'Jueves',
      'Viernes',
      'Sábado'
    ],
    edit: 'Solicitar edición',
    email: 'Correo electrónico',
    email_use: 'Correo electrónico {{value}}',
    filters: 'Filtros',
    forum: 'Foro',
    language: 'Idioma',
    languages: {
      ...languageTypes,
      BG: 'Búlgaro',
      MT: 'Maltés',
      NE: 'Nepalí'
    },
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
    search: 'Buscar',
    telephone: 'Teléfono',
    telephone_use: 'Llame a {{value}}',
    times: {
      morning: 'Mañana',
      midday: 'Mediodía',
      evening: 'Tarde',
      night: 'Noche'
    },
    timezone: 'Zona horaria',
    types: {
      ...nonLanguageTypes,
      'BV-I': 'Ciegos / Deficientes Visuales',
      'D-HOH': 'Sordo/dificultades auditivas',
      'LO-I': 'Solitarios / aislacionistas',
      LGBTQ: 'LGBTQIAA+',
      QSL: 'Lengua de señas de Quebec',
      RSL: 'Lenguaje de señas Ruso'
    },
    video_use: 'Únete a {{value}}',
    website: 'Sitio web'
  }
};
