import React from 'react';
import ReactDOM from 'react-dom/client';

import '@/i18n/config.ts';
import App from '@/App.tsx';

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
        <App />
      </React.StrictMode>
    );
  })
  .catch((err) => console.log(err));
