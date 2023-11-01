import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';

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
      const passwordRepeatInput = screen.getByLabelText(
        'Confirmer mot de passe'
      );
      expect(passwordRepeatInput).toBeInTheDocument();
    });

    it('007 - password repeat input has password type', () => {
      render(<SignUpPage />);
      const passwordRepeatInput = screen.getByLabelText(
        'Confirmer mot de passe'
      );
      expect(passwordRepeatInput).toHaveAttribute('type', 'password');
    });

    it('008 - has "Connexion" button', () => {
      render(<SignUpPage />);
      const signupButton = screen.queryByRole('button', { name: 'Connexion' });
      expect(signupButton).toBeInTheDocument();
    });

    it('009 - disables the button initially', () => {
      render(<SignUpPage />);
      const signupButton = screen.queryByRole('button', { name: 'Connexion' });
      expect(signupButton).toBeDisabled();
    });
  });

  describe('Interactions', () => {
    it('010 - enables the button when password and password repeat fields have the same value', async () => {
      const user = userEvent.setup();
      render(<SignUpPage />);
      const passwordInput = screen.getByLabelText('Mot de passe');
      const passwordRepeatInput = screen.getByLabelText(
        'Confirmer mot de passe'
      );

      await user.type(passwordInput, 'P4ssword');
      await user.type(passwordRepeatInput, 'P4ssword');
      const signupButton = screen.queryByRole('button', { name: 'Connexion' });

      expect(signupButton).toBeEnabled();
    });

    it('011 - sends username, email and password to backend after clicking the submit button', async () => {
      const user = userEvent.setup();
      render(<SignUpPage />);

      const usernameInput = screen.getByLabelText('Identifiant');
      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Mot de passe');
      const passwordRepeatInput = screen.getByLabelText(
        'Confirmer mot de passe'
      );
      const signupButton = screen.queryByRole('button', { name: 'Connexion' });
      await user.type(usernameInput, 'user1');
      await user.type(emailInput, 'user1@mail.com');
      await user.type(passwordInput, 'P4ssword');
      await user.type(passwordRepeatInput, 'P4ssword');

      const mockedUser = {
        username: 'user1',
        email: 'user1@mail.com',
        password: 'P4ssword',
      };

      vi.mock('axios');
      const mockedAxios = vi
        .mocked(axios, true)
        .post.mockResolvedValueOnce(mockedUser);

      await user.click(signupButton as HTMLElement);

      const firstCallOfMockFunction = mockedAxios.mock.calls[0];
      // console.log(firstCallOfMockFunction);
      let data: unknown;
      if (firstCallOfMockFunction) {
        data = firstCallOfMockFunction[1];
      }

      // console.log({ data });

      expect(mockedAxios).toHaveBeenCalledWith('/api/1.0/users', mockedUser);
      expect(data).toStrictEqual(mockedUser);
    });
  });
});
