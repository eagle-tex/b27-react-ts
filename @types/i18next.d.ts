// import { defaultNS, fallbackNS } from '@/locale/i18n.ts';

import resources from './resources.ts';

declare module 'i18next' {
  interface CustomTypeOptions {
    // defaultNS: typeof defaultNS;
    // fallbackNS: typeof fallbackNS;
    resources: typeof resources;
  }
}
