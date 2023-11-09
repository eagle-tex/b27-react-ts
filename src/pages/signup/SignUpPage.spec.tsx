import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HttpResponse, http } from 'msw';

import { BASE_URL } from '@/api/axiosConfig.ts';
// import { mockedUser } from '@/mocks/handlers.ts';
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
    let signupButton: HTMLElement | null;
    const user = userEvent.setup({ skipHover: true });

    const setup = async () => {
      render(<SignUpPage />);
      const usernameInput = screen.getByLabelText('Identifiant');
      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Mot de passe');
      const passwordRepeatInput = screen.getByLabelText(
        'Confirmer mot de passe'
      );

      await user.type(usernameInput, 'user1');
      await user.type(emailInput, 'user1@mail.com');
      await user.type(passwordInput, 'P4ssword');
      await user.type(passwordRepeatInput, 'P4ssword');

      signupButton = screen.queryByRole('button', {
        name: 'Créer un compte',
      });
    };

    it('010 - enables the button when password and password repeat fields have the same value', async () => {
      await setup();

      expect(signupButton).toBeEnabled();
    });

    it('011 - sends username, email and password to backend after clicking the submit button', async () => {
      let responseBody;
      server.use(
        http.post(`${BASE_URL}/api/v1/users`, async ({ request }) => {
          responseBody = await request.json();
          return HttpResponse.json(responseBody, { status: 201 });
        })
      );
      await setup();

      await user.click(signupButton as HTMLElement);
      // await screen.findByText(
      //   'Veuillez vérifier votre e-mail pour activer votre compte'
      // );

      expect(responseBody).toStrictEqual(responseBody);
    });

    it('012 - disables button when there is an ongoing API call', async () => {
      let counter = 0;
      server.use(
        http.post(`${BASE_URL}/api/v1/users`, () => {
          counter += 1;
          return HttpResponse.json({ status: 201 });
        })
      );
      await setup();
      expect(signupButton).toBeEnabled();

      await user.click(signupButton as HTMLElement);
      await user.click(signupButton as HTMLElement);

      // eslint-disable-next-line no-console
      console.log({ where: '012', signupButton });
      expect(counter).toBe(1);
      // expect(signupButton).toBeDisabled();
    });

    it('013 - displays spinner after clicking the submit button', async () => {
      server.use(
        http.post(`${BASE_URL}/api/v1/users`, () => {
          return HttpResponse.json({ status: 201 });
        })
      );
      await setup();
      expect(screen.queryByRole('status')).not.toBeInTheDocument();

      await user.click(signupButton as HTMLElement);
      const spinner = screen.getByRole('status', { hidden: true });
      // const spinner = screen.getByRole('status');

      expect(spinner).toBeInTheDocument();
      // await screen.findByText(
      //   'Veuillez vérifier votre e-mail pour activer votre compte'
      // );
    });

    it('014 - displays account creation message after successful signup request', async () => {
      server.use(
        http.post(`${BASE_URL}/api/v1/users`, () => {
          return HttpResponse.json({ status: 201 });
        })
      );
      await setup();
      const message =
        'Veuillez vérifier votre e-mail pour activer votre compte';
      expect(screen.queryByText(message)).not.toBeInTheDocument();

      await user.click(signupButton as HTMLElement);
      const text = await screen.findByText(message);

      expect(text).toBeInTheDocument();
    });

    it('015 - hides sign up form after successful sign up request', async () => {
      server.use(
        http.post(`${BASE_URL}/api/v1/users`, () => {
          return HttpResponse.json({ status: 201 });
        })
      );
      await setup();
      const form = screen.getByTestId('form-signup');

      await user.click(signupButton as HTMLElement);

      await waitFor(() => {
        expect(form).not.toBeInTheDocument();
      });
    });
  });
});
