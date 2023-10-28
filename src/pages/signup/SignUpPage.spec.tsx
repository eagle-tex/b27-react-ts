import { render, screen } from '@testing-library/react';

import SignUpPage from './SignUpPage.tsx';

describe('Sign Up Page', () => {
  describe('Layout', () => {
    it('001 - Renders "Connexion"', () => {
      render(<SignUpPage />);
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
        'Connexion'
      );
    });

    it('002 - has username input', () => {
      render(<SignUpPage />);
      const input = screen.getByPlaceholderText('Identifiant');
      expect(input).toBeInTheDocument();
    });

    it('003 - has email input', () => {
      render(<SignUpPage />);
      const emailInput = screen.getByPlaceholderText('Email');
      expect(emailInput).toBeInTheDocument();
    });
  });
});
