import { render, screen } from '@testing-library/react';

import fr from '@/locale/fr/translation.json';

import AccountActivationPage from './AccountActivationPage.tsx';

const frTranslations = fr.account;
const { activated: activatedFr } = frTranslations;

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
});
