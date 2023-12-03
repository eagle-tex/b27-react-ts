import { render, screen } from '@testing-library/react';

import fr from '@/locale/fr/translation.json';

import AccountActivationPage from './AccountActivationPage.tsx';

const frTranslations = fr.account;
const { activated: activatedFr } = frTranslations;

describe('Account Activation Page', () => {
  it('064 - displays activation success message when token is valid', async () => {
    const match = { params: { token: '1234' } };

    render(<AccountActivationPage match={match} />);
    const message = await screen.findByText(activatedFr);

    console.log({ test: '064', match, activatedFr, message });

    expect(message).toBeInTheDocument();
  });
});
