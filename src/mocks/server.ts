/* eslint-disable import/no-extraneous-dependencies */
import { setupServer } from 'msw/node';

import { handlers } from './handlers.ts';

// This configures a Service Worker with the given request handlers.
export const server = setupServer(...handlers);
