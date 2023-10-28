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
      const { container } = render(<SignUpPage />);
      const input = container.querySelector('input');
      expect(input).toBeInTheDocument();
    });

    it('003 - has email input', () => {
      const { container } = render(<SignUpPage />);
      const inputs = container.querySelectorAll('input');
      expect(inputs.length).toBe(2);
    });
  });
});
