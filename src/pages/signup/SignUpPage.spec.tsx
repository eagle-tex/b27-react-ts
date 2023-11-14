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
    it('001 - Renders "Sign up"', () => {
      render(<SignUpPage />);
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
        'Sign up'
      );
    });

    it('002 - has username input', () => {
      render(<SignUpPage />);
      const input = screen.getByLabelText('Username');
      expect(input).toBeInTheDocument();
    });

    it('003 - has email input', () => {
      render(<SignUpPage />);
      const emailInput = screen.getByLabelText('Email');
      expect(emailInput).toBeInTheDocument();
    });

    it('004 - has password input', () => {
      render(<SignUpPage />);
      const passwordInput = screen.getByLabelText('Password');
      expect(passwordInput).toBeInTheDocument();
    });

    it('005 - password input has password type', () => {
      render(<SignUpPage />);
      const passwordInput = screen.getByLabelText('Password');
      expect(passwordInput).toHaveAttribute('type', 'password');
    });

    it('006 - has password repeat input', () => {
      render(<SignUpPage />);
      const passwordRepeatInput = screen.getByLabelText('Confirm password');
      expect(passwordRepeatInput).toBeInTheDocument();
    });

    it('007 - password repeat input has password type', () => {
      render(<SignUpPage />);
      const passwordRepeatInput = screen.getByLabelText('Confirm password');
      expect(passwordRepeatInput).toHaveAttribute('type', 'password');
    });

    it('008 - has "Sign up" button', () => {
      render(<SignUpPage />);
      const signupButton = screen.queryByRole('button', {
        name: 'Sign up',
      });
      expect(signupButton).toBeInTheDocument();
    });

    it('009 - disables the button initially', () => {
      render(<SignUpPage />);
      const signupButton = screen.queryByRole('button', {
        name: 'Sign up',
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

    let usernameInput: HTMLElement | null;
    let emailInput: HTMLElement | null;
    let passwordInput: HTMLElement | null;
    let passwordRepeatInput: HTMLElement | null;
    let signupButton: HTMLElement | null;
    const user = userEvent.setup({ skipHover: true });

    const setup = async () => {
      render(<SignUpPage />);
      usernameInput = screen.getByLabelText('Username');
      emailInput = screen.getByLabelText('Email');
      passwordInput = screen.getByLabelText('Password');
      passwordRepeatInput = screen.getByLabelText('Confirm password');

      await user.type(usernameInput, 'user1');
      await user.type(emailInput, 'user1@mail.com');
      await user.type(passwordInput, 'P4ssword');
      await user.type(passwordRepeatInput, 'P4ssword');

      signupButton = screen.queryByRole('button', {
        name: 'Sign up',
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
      const message = 'Please check your e-mail to activate your account';
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

    const generateValidationError = (field: string, message: string) => {
      return http.post(
        `${BASE_URL}/api/v1/users`,
        async (/* { request } */) => {
          // requestBody = await request.json();
          await delay(10);
          return HttpResponse.json(
            { validationErrors: { [field]: message } },
            { status: 400 }
          );
        }
      );
    };

    interface ITestFields {
      field: string;
      message: string;
      label: string;
    }

    it.each`
      testNumber | field         | message
      ${'016'}   | ${'username'} | ${'Username cannot be null'}
      ${'018'}   | ${'email'}    | ${'E-mail cannot be null'}
      ${'019'}   | ${'password'} | ${'Password cannot be null'}
    `(
      '$testNumber - displays $message for $field',
      async ({ field, message }: ITestFields) => {
        server.use(generateValidationError(field, message));
        await setup();

        await user.click(signupButton as HTMLElement);
        const validationError = await screen.findByText(message);

        expect(validationError).toBeInTheDocument();
      }
    );

    it('017 - hides spinner and enables button after receiving response', async () => {
      server.use(
        generateValidationError('username', 'Username cannot be null')
      );
      await setup();

      await user.click(signupButton as HTMLElement);
      await screen.findByText('Username cannot be null');

      expect(screen.queryByRole('status')).not.toBeInTheDocument();
      expect(signupButton).toBeEnabled();
    });

    it('020 - displays mismatch message for password repeat input', async () => {
      await setup();
      await user.type(passwordInput as HTMLElement, 'P4ssword');
      await user.type(passwordRepeatInput as HTMLElement, 'AnotherP4ssword');

      const validationError = screen.queryByText('Password mismatch');

      expect(validationError).toBeInTheDocument();
    });

    it('021 - clears validation error after username field is updated', async () => {
      server.use(
        generateValidationError('username', 'Username cannot be null')
      );
      await setup();

      await user.click(signupButton as HTMLElement);
      const validationError = await screen.findByText(
        'Username cannot be null'
      );
      await user.type(usernameInput as HTMLElement, 'user1-updated');

      expect(validationError).not.toBeInTheDocument();
    });
  });
});
