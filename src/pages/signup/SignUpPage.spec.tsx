import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HttpResponse, http } from 'msw';

import { BASE_URL } from '@/api/axiosConfig.ts';
import { mockedUser } from '@/mocks/handlers.ts';
import { server } from '@/mocks/server.ts';

import SignUpPage from './SignUpPage.tsx';

describe('Sign Up Page', () => {
  describe('Layout', () => {
    it('001 - Renders "Créer un compte"', () => {
      render(<SignUpPage />);
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
        'Créer un compte'
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

    it('008 - has "Créer un compte" button', () => {
      render(<SignUpPage />);
      const signupButton = screen.queryByRole('button', {
        name: 'Créer un compte',
      });
      expect(signupButton).toBeInTheDocument();
    });

    it('009 - disables the button initially', () => {
      render(<SignUpPage />);
      const signupButton = screen.queryByRole('button', {
        name: 'Créer un compte',
      });
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
      const signupButton = screen.queryByRole('button', {
        name: 'Créer un compte',
      });

      expect(signupButton).toBeEnabled();
    });

    it('011 - sends username, email and password to backend after clicking the submit button', async () => {
      const user = userEvent.setup();
      let postResponse;
      server.use(
        http.post(`${BASE_URL}/api/v1/users`, async ({ request }) => {
          postResponse = await request.json();
          return HttpResponse.json(postResponse, { status: 201 });
        })
      );
      render(<SignUpPage />);

      const usernameInput = screen.getByLabelText('Identifiant');
      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Mot de passe');
      const passwordRepeatInput = screen.getByLabelText(
        'Confirmer mot de passe'
      );
      const signupButton = screen.queryByRole('button', {
        name: 'Créer un compte',
      });
      await user.type(usernameInput, 'user1');
      await user.type(emailInput, 'user1@mail.com');
      await user.type(passwordInput, 'P4ssword');
      await user.type(passwordRepeatInput, 'P4ssword');

      await user.click(signupButton as HTMLElement);

      expect(postResponse).toStrictEqual(mockedUser);
    });

    it('012 - disables button when there is an ongoing API call', async () => {
      const user = userEvent.setup();
      // const user = userEvent.setup({ skipHover: true });

      // let counter = 0;
      server.use(
        http.post(`${BASE_URL}/api/v1/users`, () => {
          // counter += 1;
          return HttpResponse.json({ status: 201 });
        })
      );
      render(<SignUpPage />);

      const usernameInput = screen.getByLabelText('Identifiant');
      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Mot de passe');
      const passwordRepeatInput = screen.getByLabelText(
        'Confirmer mot de passe'
      );
      const signupButton = screen.getByRole('button', {
        name: 'Créer un compte',
      });
      await user.type(usernameInput, 'user1');
      await user.type(emailInput, 'user1@mail.com');
      await user.type(passwordInput, 'P4ssword');
      await user.type(passwordRepeatInput, 'P4ssword');

      expect(signupButton).toBeEnabled();

      await user.click(signupButton);

      expect(signupButton).toBeDisabled();
    });
  });
});
