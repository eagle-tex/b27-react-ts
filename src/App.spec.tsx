import { render, screen } from '@testing-library/react';

import App from './App.tsx';

describe('Routing', () => {
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
      window.history.pushState({}, '', path as string);
      render(<App />);
      const page = screen.queryByTestId(pageTestId as string);

      expect(page).toBeInTheDocument();
    }
  );

  it.each`
    testNumber | path         | pageTestId       | page
    ${32}      | ${'/'}       | ${'signup-page'} | ${'SignupPage'}
    ${35}      | ${'/'}       | ${'login-page'}  | ${'LoginPage'}
    ${33}      | ${'/signup'} | ${'home-page'}   | ${'HomePage'}
    ${36}      | ${'/signup'} | ${'login-page'}  | ${'LoginPage'}
    ${37}      | ${'/login'}  | ${'home-page'}   | ${'HomePage'}
    ${38}      | ${'/login'}  | ${'signup-page'} | ${'SignupPage'}
  `(
    '0$testNumber - does not display $page when path is $path',
    ({ pageTestId, path }) => {
      window.history.pushState({}, '', path as string);
      render(<App />);
      const page = screen.queryByTestId(pageTestId as string);

      expect(page).not.toBeInTheDocument();
    }
  );
});
