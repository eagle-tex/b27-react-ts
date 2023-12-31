import {
  act,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DefaultBodyType, HttpResponse, delay, http } from 'msw';
// import { setupServer } from 'msw/node';

import { BASE_URL } from '@/api/axiosConfig.ts';
// import { mockedUser } from '@/mocks/handlers.ts';
import LanguageSelector from '@/components/LanguageSelector.tsx';
import i18n from '@/i18n/config.ts';
import en from '@/locale/en/translation.json';
import fr from '@/locale/fr/translation.json';
import { server } from '@/mocks/server.ts';

import SignupPage from './SignupPage.tsx';

const frTranslations = fr.signup;
const {
  email: emailFr,
  password: passwordFr,
  passwordMismatch: passwordMismatchFr,
  passwordRepeat: passwordRepeatFr,
  signup: signupFr,
  success: successFr,
  username: usernameFr,
} = frTranslations;

describe('Sign Up Page', () => {
  let requestBody: DefaultBodyType;
  let counter = 0;
  let acceptLanguageHeader: string | null;

  beforeEach(() => {
    server.use(
      http.post(`${BASE_URL}/api/v1/users`, async ({ request }) => {
        requestBody = await request.json();
        counter += 1;
        acceptLanguageHeader = request.headers.get('Accept-Language');
        await delay(25);
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

  describe('Layout', () => {
    function renderSignupAndLanguage() {
      render(<SignupPage />);
      render(<LanguageSelector />);
    }

    it(`001 - Renders "${signupFr}"`, () => {
      renderSignupAndLanguage();
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
        signupFr
      );
    });

    it('002 - has username input', () => {
      renderSignupAndLanguage();
      const input = screen.getByLabelText(usernameFr);
      expect(input).toBeInTheDocument();
    });

    it('003 - has email input', () => {
      renderSignupAndLanguage();
      const emailInput = screen.getByLabelText(emailFr);
      expect(emailInput).toBeInTheDocument();
    });

    it('004 - has password input', () => {
      renderSignupAndLanguage();
      const passwordInput = screen.getByLabelText(passwordFr);
      expect(passwordInput).toBeInTheDocument();
    });

    it('005 - password input has password type', () => {
      renderSignupAndLanguage();
      const passwordInput = screen.getByLabelText(passwordFr);
      expect(passwordInput).toHaveAttribute('type', 'password');
    });

    it('006 - has password repeat input', () => {
      renderSignupAndLanguage();
      const passwordRepeatInput = screen.getByLabelText(passwordRepeatFr);
      expect(passwordRepeatInput).toBeInTheDocument();
    });

    it('007 - password repeat input has password type', () => {
      renderSignupAndLanguage();
      const passwordRepeatInput = screen.getByLabelText(passwordRepeatFr);
      expect(passwordRepeatInput).toHaveAttribute('type', 'password');
    });

    it(`008 - has "${signupFr}" button`, () => {
      renderSignupAndLanguage();
      const signupButton = screen.queryByRole('button', {
        name: signupFr,
      });
      expect(signupButton).toBeInTheDocument();
    });

    it('009 - disables the button initially', () => {
      renderSignupAndLanguage();
      const signupButton = screen.queryByRole('button', {
        name: signupFr,
      });
      expect(signupButton).toBeDisabled();
    });
  });

  describe('Interactions', () => {
    let usernameInput: HTMLElement | null;
    let emailInput: HTMLElement | null;
    let passwordInput: HTMLElement | null;
    let passwordRepeatInput: HTMLElement | null;
    let signupButton: HTMLElement | null;
    const user = userEvent.setup({ skipHover: true });

    const setup = async () => {
      render(<SignupPage />);
      render(<LanguageSelector />);
      usernameInput = screen.getByLabelText(usernameFr);
      emailInput = screen.getByLabelText(emailFr);
      passwordInput = screen.getByLabelText(passwordFr);
      passwordRepeatInput = screen.getByLabelText(passwordRepeatFr);

      await user.type(usernameInput, 'user1');
      await user.type(emailInput, 'user1@mail.com');
      await user.type(passwordInput, 'P4ssword');
      await user.type(passwordRepeatInput, 'P4ssword');

      signupButton = screen.queryByRole('button', {
        name: signupFr,
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
      const message = successFr;
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
      ${16}      | ${'username'} | ${'Username cannot be null'}
      ${18}      | ${'email'}    | ${'E-mail cannot be null'}
      ${19}      | ${'password'} | ${'Password cannot be null'}
    `(
      '0$testNumber - displays $message for $field',
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

      // const validationError = screen.queryByText('Password mismatch');
      const validationError = screen.queryByText(passwordMismatchFr);

      expect(validationError).toBeInTheDocument();
    });

    it.each`
      testNumber | field         | message                      | label
      ${21}      | ${'username'} | ${'Username cannot be null'} | ${usernameFr}
      ${22}      | ${'email'}    | ${'E-mail cannot be null'}   | ${emailFr}
      ${23}      | ${'password'} | ${'Password cannot be null'} | ${passwordFr}
    `(
      '0$testNumber - clears validation error after $field field is updated',
      async ({ field, label, message }: ITestFields) => {
        server.use(generateValidationError(field, message));
        await setup();

        await user.click(signupButton as HTMLElement);
        const validationError = await screen.findByText(message);
        await user.type(screen.getByLabelText(label), 'updated');

        expect(validationError).not.toBeInTheDocument();
      }
    );
  });

  describe('Internationalization', () => {
    const enTranslations = en.signup;
    const {
      email: emailEn,
      password: passwordEn,
      passwordMismatch: passwordMismatchEn,
      passwordRepeat: passwordRepeatEn,
      signup: signupEn,
      // success: successEn,
      username: usernameEn,
    } = enTranslations;

    let englishToggle: HTMLElement | null;
    let frenchToggle: HTMLElement | null;
    let passwordInput: HTMLElement | null;
    let passwordRepeatInput: HTMLElement | null;

    function renderSignupAndLanguage() {
      render(<SignupPage />);
      render(<LanguageSelector />);
      englishToggle = screen.getByTitle('English');
      frenchToggle = screen.getByTitle('French');
      passwordInput = screen.getByLabelText(passwordFr);
      passwordRepeatInput = screen.getByLabelText(passwordRepeatFr);
    }

    afterEach(() => {
      return act(async () => {
        await i18n.changeLanguage('fr');
      });
    });

    it('024 - initially displays all text in French', () => {
      renderSignupAndLanguage();

      expect(
        screen.getByRole('heading', { name: signupFr })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: signupFr })
      ).toBeInTheDocument();
      expect(screen.getByLabelText(usernameFr)).toBeInTheDocument();
      expect(screen.getByLabelText(emailFr)).toBeInTheDocument();
      expect(screen.getByLabelText(passwordFr)).toBeInTheDocument();
      expect(screen.getByLabelText(passwordRepeatFr)).toBeInTheDocument();
    });

    it('025 - displays all text in English after changing the language', async () => {
      const user = userEvent.setup();
      renderSignupAndLanguage();

      await user.click(englishToggle as HTMLElement);

      expect(
        screen.getByRole('heading', { name: signupEn })
      ).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: signupEn })
      ).toBeInTheDocument();
      expect(screen.getByLabelText(usernameEn)).toBeInTheDocument();
      expect(screen.getByLabelText(emailEn)).toBeInTheDocument();
      expect(screen.getByLabelText(passwordEn)).toBeInTheDocument();
      expect(screen.getByLabelText(passwordRepeatEn)).toBeInTheDocument();
    });

    it('026 - displays all text in French after changing back from English', async () => {
      const user = userEvent.setup();
      renderSignupAndLanguage();

      await user.click(frenchToggle as HTMLElement);
      await user.click(englishToggle as HTMLElement);
    });

    it('027 - displays password mismatch validation in English', async () => {
      const user = userEvent.setup();
      renderSignupAndLanguage();

      await user.click(englishToggle as HTMLElement);
      passwordInput = screen.getByLabelText(passwordEn);
      await user.type(passwordInput, 'P4ssword');
      passwordRepeatInput = screen.getByLabelText(passwordRepeatEn);
      await user.type(passwordRepeatInput, 'DifferentP4ssword');
      const validationMessageInEnglish = screen.queryByText(passwordMismatchEn);

      expect(validationMessageInEnglish).toBeInTheDocument();
    });

    it('028 - sets Accept-Language header to "fr" for outgoing request', async () => {
      const user = userEvent.setup();
      renderSignupAndLanguage();

      await user.type(passwordInput as HTMLElement, 'P4ssword');
      await user.type(passwordRepeatInput as HTMLElement, 'P4ssword');
      const signupButton = screen.getByRole('button', { name: signupFr });
      const form = screen.queryByTestId('form-signup');
      await user.click(signupButton);
      await waitForElementToBeRemoved(form);

      expect(acceptLanguageHeader).toBe('fr');
    });

    it('029 - sets Accept-Language header to "en" for outgoing request after selecting English language', async () => {
      const user = userEvent.setup();
      renderSignupAndLanguage();

      await user.type(passwordInput as HTMLElement, 'P4ssword');
      await user.type(passwordRepeatInput as HTMLElement, 'P4ssword');
      const signupButton = screen.getByRole('button', { name: signupFr });
      await user.click(englishToggle as HTMLElement);
      const form = screen.queryByTestId('form-signup');
      await user.click(signupButton);
      await waitForElementToBeRemoved(form);

      expect(acceptLanguageHeader).toBe('en');
    });
  });
});
