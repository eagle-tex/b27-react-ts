// import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom/client';

import i18next from '@/locales/i18n.ts';

import App from './App.tsx';

// import { server } from './mocks/server.ts';
//
// if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
//   server.listen();
// }

async function deferRender() {
  if (process.env.NODE_ENV !== 'development') {
    return;
  }

  const { worker } = await import('./mocks/browser.ts');

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  await worker.start();
}

const root = ReactDOM.createRoot(document.getElementById('root')!);
// ReactDOM.createRoot(document.getElementById('root')!).render(
deferRender()
  .then(() => {
    root.render(
      <React.StrictMode>
        {/* <ChakraProvider> */}
        <App />
        {/* </ChakraProvider> */}
      </React.StrictMode>
    );
  })
  .catch((err) => console.log(err));

console.log(i18next.t('ns1:title'));
console.log(i18next.t('title'));
console.log(i18next.t('ns1:description.part1'));
console.log(i18next.t('ns1:description.part2'));
console.log(i18next.t('ns2:description.part2'));
console.log(i18next.t('description.part2', { ns: 'ns2' }));

// interpolation
i18next.t('inter', { val: 'xx' });

// // @ts-expect-error
// i18next.t('inter', { valWrong: 'xx' });

// works because of fallbackNS
i18next.t('fallbackKey');
