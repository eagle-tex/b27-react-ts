import { render, screen } from '@testing-library/react';

import SignUpPage from './SignUpPage.tsx';

describe('Sign Up Page', () => {
  describe('Layout', () => {
    it('Renders "Connexion"', () => {
      render(<SignUpPage />);

      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
        'Connexion'
      );
    });

    it('Renders "Connexion" - another way', () => {
      render(<SignUpPage />);
      const header = screen.queryByRole('heading', { name: 'Connexion' });

      expect(header).toBeInTheDocument();
    });
  });
});
