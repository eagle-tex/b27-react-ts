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
      const input = screen.getByLabelText('Identifiant');
      expect(input).toBeInTheDocument();
    });

    it('003 - has email input', () => {
      render(<SignUpPage />);
      const emailInput = screen.getByLabelText('Email');
      expect(emailInput).toBeInTheDocument();
    });

    it('004 - has password input', () => {
      render(<SignUpPage />);
      const passwordInput = screen.getByLabelText('Mot de passe');
      expect(passwordInput).toBeInTheDocument();
    });

    it('005 - password input has password type', () => {
      render(<SignUpPage />);
      const passwordInput = screen.getByLabelText('Mot de passe');
      expect(passwordInput).toHaveAttribute('type', 'password');
    });

    it('006 - has password repeat input', () => {
      render(<SignUpPage />);
      const passwordRepeatInput = screen.getByLabelText('Répéter mot de passe');
      expect(passwordRepeatInput).toBeInTheDocument();
    });

    it('007 - password repeat input has password type', () => {
      render(<SignUpPage />);
      const passwordRepeatInput = screen.getByLabelText('Répéter mot de passe');
      expect(passwordRepeatInput).toHaveAttribute('type', 'password');
    });
  });
});
