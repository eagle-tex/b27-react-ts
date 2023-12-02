import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '@/App.tsx';
// import { testLog } from './utils/debugLogger.ts';
import fr from '@/locale/fr/translation.json';

const frTranslations = fr.signup;
const {
  // email: emailFr,
  // password: passwordFr,
  // passwordMismatch: passwordMismatchFr,
  // passwordRepeat: passwordRepeatFr,
  signup: signupFr,
  // success: successFr,
  // username: usernameFr,
} = frTranslations;

describe('Routing', () => {
  function setup(path: string) {
    window.history.pushState({}, '', path);
    render(<App />);
  }

  it.each`
    testNumber | path         | pageTestId       | page
    ${30}      | ${'/'}       | ${'home-page'}   | ${'HomePage'}
    ${31}      | ${'/signup'} | ${'signup-page'} | ${'SignupPage'}
    ${34}      | ${'/login'}  | ${'login-page'}  | ${'LoginPage'}
    ${39}      | ${'/user/1'} | ${'user-page'}   | ${'UserPage'}
    ${40}      | ${'/user/2'} | ${'user-page'}   | ${'UserPage'}
  `(
    '0$testNumber - displays $page when path is $path',
    ({ pageTestId, path }) => {
      setup(path as string);
      const page = screen.queryByTestId(pageTestId as string);

      expect(page).toBeInTheDocument();
    }
  );

  it.each`
    testNumber | path         | pageTestId       | page
    ${32}      | ${'/'}       | ${'signup-page'} | ${'SignupPage'}
    ${35}      | ${'/'}       | ${'login-page'}  | ${'LoginPage'}
    ${41}      | ${'/'}       | ${'user-page'}   | ${'UserPage'}
    ${33}      | ${'/signup'} | ${'home-page'}   | ${'HomePage'}
    ${36}      | ${'/signup'} | ${'login-page'}  | ${'LoginPage'}
    ${42}      | ${'/signup'} | ${'user-page'}   | ${'UserPage'}
    ${37}      | ${'/login'}  | ${'home-page'}   | ${'HomePage'}
    ${38}      | ${'/login'}  | ${'signup-page'} | ${'SignupPage'}
    ${43}      | ${'/login'}  | ${'user-page'}   | ${'UserPage'}
    ${44}      | ${'/user/1'} | ${'home-page'}   | ${'HomePage'}
    ${45}      | ${'/user/1'} | ${'signup-page'} | ${'SignupPage'}
    ${46}      | ${'/user/1'} | ${'login-page'}  | ${'LoginPage'}
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
    ${48}      | ${signupFr}
  `('0$testNumber - has link to $targetPage on NavBar', ({ targetPage }) => {
    setup('/'); // any path would do ('/signup' or '/login', ...)
    const link = screen.getByRole('link', {
      description: targetPage as string,
    });

    expect(link).toBeInTheDocument();
  });

  it.each`
    testNumber | initialPath | clickingTo  | visiblePageId    | visiblePage
    ${49}      | ${'/'}      | ${signupFr} | ${'signup-page'} | ${'Signup Page'}
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
});
