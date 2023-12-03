import { render, screen } from '@testing-library/react';
import { HttpResponse, http } from 'msw';

import { BASE_URL } from '@/api/axiosConfig.ts';
import fr from '@/locale/fr/translation.json';
import { server } from '@/mocks/server.ts';

import AccountActivationPage from './AccountActivationPage.tsx';

const frTranslations = fr.account;
const { activated: activatedFr, activationFailure: activationFailureFr } =
  frTranslations;

let counter = 0;

beforeEach(() => {
  server.use(
    http.post(`${BASE_URL}/api/v1/users/token/:token`, ({ params }) => {
      if (params.token === '5678') {
        return HttpResponse.json({ status: 400 });
      }
      counter += 1;
      return HttpResponse.json({ status: 200 });
    })
  );

  counter = 0;
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => server.close());

describe('Account Activation Page', () => {
  function setup(token: string) {
    const match = { params: { token } };
    render(<AccountActivationPage match={match} />);
  }

  it('064 - displays activation success message when token is valid', async () => {
    setup('1234');
    const message = await screen.findByText(activatedFr);

    expect(message).toBeInTheDocument();
  });

  it('065 - sends activation request to backend', async () => {
    setup('1234');
    await screen.findByText(activatedFr);

    expect(counter).toBe(1);
  });

  it('066 - displays activation failure message when token is invalid', async () => {
    setup('5678');
    const message = await screen.findByText(activationFailureFr);

    expect(message).toBeInTheDocument();
  });
});
