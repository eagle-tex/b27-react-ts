import { server } from './src/mocks/server.ts';

beforeAll(() => {
  console.log('beforeAll in VITEST.SETUP');

  server.events.on('request:start', ({ request }) => {
    console.log('MSW intercepted:', request.method, request.url);
  });

  return server.listen({ onUnhandledRequest: 'warn' });
});

afterEach(() => {
  return server.resetHandlers();
});

afterAll(() => {
  return server.close();
});
