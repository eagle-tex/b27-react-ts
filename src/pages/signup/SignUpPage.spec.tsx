import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DefaultBodyType, HttpResponse, delay, http } from 'msw';
// import { setupServer } from 'msw/node';

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
    let requestBody: DefaultBodyType;
    let counter = 0;

    beforeEach(() => {
      server.use(
        http.post(`${BASE_URL}/api/v1/users`, async ({ request }) => {
          requestBody = await request.json();
          counter += 1;
          await delay(100);
          return HttpResponse.json(requestBody, { status: 201 });
        })
      );

      counter = 0;
    });

    afterEach(() => {
      // This will remove any runtime request handlers
      // after each test, ensuring isolated network behavior.
      server.resetHandlers();
    });

    afterAll(() => server.close());

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
      await setup();

      await user.click(signupButton as HTMLElement);

      expect(requestBody).toStrictEqual(requestBody);
    });

    it('012 - disables button when there is an ongoing API call', async () => {
      await setup();
      expect(signupButton).toBeEnabled();

      await user.click(signupButton as HTMLElement);

      expect(counter).toBe(1);
      expect(signupButton).toBeDisabled();
    });

    it('013 - displays spinner after clicking the submit button', async () => {
      await setup();
      expect(screen.queryByRole('status')).not.toBeInTheDocument();

      await user.click(signupButton as HTMLElement);
      const spinner = screen.getByRole('status');

      expect(spinner).toBeInTheDocument();
    });

    it('014 - displays account creation message after successful signup request', async () => {
      await setup();
      const message =
        'Veuillez vérifier votre e-mail pour activer votre compte';
      expect(screen.queryByText(message)).not.toBeInTheDocument();

      await user.click(signupButton as HTMLElement);
      const text = await screen.findByText(message);

      expect(text).toBeInTheDocument();
    });

    it('015 - hides sign up form after successful sign up request', async () => {
      await setup();
      const form = screen.getByTestId('form-signup');

      await user.click(signupButton as HTMLElement);

      // await waitForElementToBeRemoved(form);
      await waitFor(() => {
        expect(form).not.toBeInTheDocument();
      });
    });

    it('016 - displays validation message for username', async () => {
      server.use(
        http.post(`${BASE_URL}/api/v1/users`, async (/* { request } */) => {
          // requestBody = await request.json();
          await delay(100);
          return HttpResponse.json(
            { validationErrors: { username: 'Username cannot be null' } },
            { status: 400 }
          );
        })
      );
      await setup();

      await user.click(signupButton as HTMLElement);
      const usernameValidationError = await screen.findByText(
        'Username cannot be null'
      );

      expect(usernameValidationError).toBeInTheDocument();
    });

    it('017 - hides spinner and enables button after receiving response', async () => {
      server.use(
        http.post(`${BASE_URL}/api/v1/users`, async (/* { request } */) => {
          await delay(100);
          return HttpResponse.json(
            { validationErrors: { username: 'Username cannot be null' } },
            { status: 400 }
          );
        })
      );
      await setup();

      await user.click(signupButton as HTMLElement);
      await screen.findByText('Username cannot be null');

      expect(screen.queryByRole('status')).not.toBeInTheDocument();
      expect(signupButton).toBeEnabled();
    });

    it('018 - displays validation message for email', async () => {
      server.use(
        http.post(`${BASE_URL}/api/v1/users`, (/* { request } */) => {
          // await delay(100);
          console.log('Mocked MSW response in #18');
          return HttpResponse.json(
            { validationErrors: { email: 'E-mail cannot be null' } },
            { status: 400 }
          );
        })
      );
      await setup();

      await user.click(signupButton as HTMLElement);
      const emailValidationError = await screen.findByText(
        'E-mail cannot be null'
      );

      expect(emailValidationError).toBeInTheDocument();
    });
  });
});
