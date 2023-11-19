import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '@/locale/en/translation.json';
import fr from '@/locale/fr/translation.json';

// await i18next.use(initReactI18next).init({
await i18n.use(initReactI18next).init({
  lng: 'fr', // if you're using a language detector, do not define the lng option
  fallbackLng: 'fr',
  // debug: true,
  resources: {
    en: {
      translation: en,
    },
    fr: {
      translation: fr,
    },
  },
  interpolation: {
    escapeValue: false,
  },
  // if you see an error like: "Argument of type 'DefaultTFuncReturn' is not assignable to parameter of type xyz"
  // set returnNull to false (and also in the i18next.d.ts options)
  // returnNull: false,
});

export default i18n;
