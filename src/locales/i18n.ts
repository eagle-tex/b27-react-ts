// import i18n from 'i18next';
// import { initReactI18next } from 'react-i18next';
//
// i18n.use(initReactI18next).init({
//   resources: {
//     en: {
//       translation: {
//         signUp: 'Sign Up',
//         username: 'Username',
//         email: 'E-mail',
//         password: 'Password',
//         passwordRepeat: 'Password Repeat',
//       },
//     },
//     fr: {
//       translation: {
//         signUp: 'Créer un compte',
//         username: 'Nom utilisateur',
//         email: 'E-mail',
//         password: 'Mot de passe',
//         passwordRepeat: 'Répéter mot de passe',
//       },
//     },
//   },
//   lng: 'en',
//   fallbackLng: 'en',
//
//   interpolation: {
//     escapeValue: false,
//   },
// });

import i18next from 'i18next';

import enFallback from '@/locales/en/fallback.json';
import enNs1 from '@/locales/en/ns1.json';
import enNs2 from '@/locales/en/ns2.json';
import frNs1 from '@/locales/fr/ns1.json';
import frNs2 from '@/locales/fr/ns2.json';

export const defaultNS = 'ns1';
export const fallbackNS = 'fallback';

await i18next.init({
  debug: true,
  // lng: 'en',
  // fallbackLng: 'en',
  fallbackLng: 'fr',
  defaultNS,
  fallbackNS,
  resources: {
    en: {
      ns1: enNs1,
      ns2: enNs2,
      fallback: enFallback,
    },
    fr: {
      ns1: frNs1,
      ns2: frNs2,
    },
  },
});

// export default i18next;
// export const resources = {
//   en: {
//     ns1,
//     ns2,
//   },
// } as const;

export default i18next;
