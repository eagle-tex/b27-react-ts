import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { HttpResponse, http } from 'msw';

import { BASE_URL } from '@/api/axiosConfig.ts';
import App from '@/App.tsx';
// import { testLog } from './utils/debugLogger.ts';
// import fr from '@/locale/fr/translation.json';
import { server } from '@/mocks/server.ts';

// const frTranslations = fr.signup;
// const {
// email: emailFr,
// password: passwordFr,
// passwordMismatch: passwordMismatchFr,
// passwordRepeat: passwordRepeatFr,
// signup: signupFr,
// success: successFr,
// username: usernameFr,
// } = frTranslations;

beforeEach(() => {
  server.use(
    http.post(`${BASE_URL}/api/v1/users/token/:token`, () => {
      return HttpResponse.json(null, { status: 200 });
    })
  );
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => server.close());

describe('Routing', () => {
  function setup(path: string) {
    window.history.pushState({}, '', path);
    render(<App />);
  }

  it.each`
    testNumber | path               | pageTestId           | page
    ${30}      | ${'/'}             | ${'home-page'}       | ${'HomePage'}
    ${31}      | ${'/signup'}       | ${'signup-page'}     | ${'SignupPage'}
    ${34}      | ${'/login'}        | ${'login-page'}      | ${'LoginPage'}
    ${39}      | ${'/user/1'}       | ${'user-page'}       | ${'UserPage'}
    ${40}      | ${'/user/2'}       | ${'user-page'}       | ${'UserPage'}
    ${54}      | ${'/activate/123'} | ${'activation-page'} | ${'AccountActivationPage'}
    ${55}      | ${'/activate/456'} | ${'activation-page'} | ${'AccountActivationPage'}
  `(
    '0$testNumber - displays $page when path is $path',
    ({ pageTestId, path }) => {
      setup(path as string);
      const page = screen.queryByTestId(pageTestId as string);

      expect(page).toBeInTheDocument();
    }
  );

  it.each`
    testNumber | path               | pageTestId           | page
    ${32}      | ${'/'}             | ${'signup-page'}     | ${'SignupPage'}
    ${35}      | ${'/'}             | ${'login-page'}      | ${'LoginPage'}
    ${41}      | ${'/'}             | ${'user-page'}       | ${'UserPage'}
    ${56}      | ${'/'}             | ${'activation-page'} | ${'AccountActivationPage'}
    ${33}      | ${'/signup'}       | ${'home-page'}       | ${'HomePage'}
    ${36}      | ${'/signup'}       | ${'login-page'}      | ${'LoginPage'}
    ${42}      | ${'/signup'}       | ${'user-page'}       | ${'UserPage'}
    ${57}      | ${'/signup'}       | ${'activation-page'} | ${'AccountActivationPage'}
    ${37}      | ${'/login'}        | ${'home-page'}       | ${'HomePage'}
    ${38}      | ${'/login'}        | ${'signup-page'}     | ${'SignupPage'}
    ${43}      | ${'/login'}        | ${'user-page'}       | ${'UserPage'}
    ${58}      | ${'/login'}        | ${'activation-page'} | ${'AccountActivationPage'}
    ${44}      | ${'/user/1'}       | ${'home-page'}       | ${'HomePage'}
    ${45}      | ${'/user/1'}       | ${'signup-page'}     | ${'SignupPage'}
    ${46}      | ${'/user/1'}       | ${'login-page'}      | ${'LoginPage'}
    ${59}      | ${'/user/1'}       | ${'activation-page'} | ${'AccountActivationPage'}
    ${60}      | ${'/activate/123'} | ${'home-page'}       | ${'HomePage'}
    ${61}      | ${'/activate/123'} | ${'signup-page'}     | ${'SignupPage'}
    ${62}      | ${'/activate/123'} | ${'login-page'}      | ${'LoginPage'}
    ${63}      | ${'/activate/123'} | ${'user-page'}       | ${'AccountActivationPage'}
  `(
    '0$testNumber - does not display $page when path is $path',
    ({ pageTestId, path }) => {
      setup(path as string);
      const page = screen.queryByTestId(pageTestId as string);

      expect(page).not.toBeInTheDocument();
    }
  );

  it.each`
    testNumber | targetPage
    ${47}      | ${'Home'}
    ${48}      | ${'Signup'}
    ${51}      | ${'Login'}
  `('0$testNumber - has link to $targetPage on NavBar', ({ targetPage }) => {
    setup('/'); // any path would do ('/signup' or '/login', ...)
    const link = screen.getByRole('link', {
      description: targetPage as string,
    });

    expect(link).toBeInTheDocument();
  });

  it.each`
    testNumber | initialPath  | clickingTo  | visiblePageId    | visiblePage
    ${49}      | ${'/'}       | ${'Signup'} | ${'signup-page'} | ${'Signup Page'}
    ${50}      | ${'/signup'} | ${'Home'}   | ${'home-page'}   | ${'Home Page'}
    ${52}      | ${'/signup'} | ${'Login'}  | ${'login-page'}  | ${'Login Page'}
  `(
    '0$testNumber - displays $visiblePage after clicking $clickingTo link',
    async ({ clickingTo, initialPath, visiblePageId }) => {
      const user = userEvent.setup();
      setup(initialPath as string);
      const link = screen.getByRole('link', {
        description: clickingTo as string,
      });

      await user.click(link);

      expect(screen.getByTestId(visiblePageId as string)).toBeInTheDocument();
    }
  );

  it('053 - displays Home page when clicking brand logo', async () => {
    const user = userEvent.setup();
    setup('/login');
    const logo = screen.queryByAltText('Logo');
    await user.click(logo as HTMLElement);

    expect(screen.getByTestId('home-page')).toBeInTheDocument();
  });
});
