import { render, screen } from '@testing-library/react';
import { HttpResponse, http } from 'msw';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

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
      counter += 1;
      if (params.token === '5678') {
        return HttpResponse.json(null, { status: 400 });
      }
      return HttpResponse.json(null, { status: 200 });
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
    render(
      <MemoryRouter initialEntries={[`/activate/${token}`]}>
        <Routes>
          <Route path="/activate/:token" element={<AccountActivationPage />} />
        </Routes>
      </MemoryRouter>
    );
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

  it('067 - sends activation request after the token is changed', async () => {
    let token = '1234';
    setup(token);
    await screen.findByText(activatedFr);

    token = '5678';
    setup(token);
    await screen.findByText(activationFailureFr);

    expect(counter).toBe(2);
  });

  it('068 - displays spinner during activation API call', async () => {
    setup('5678');
    const spinner = screen.queryByRole('status');
    expect(spinner).toBeInTheDocument();

    await screen.findByText(activationFailureFr);
    expect(spinner).not.toBeInTheDocument();
  });
});
