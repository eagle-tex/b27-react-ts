import { render, screen } from '@testing-library/react';

import App from './App.tsx';

describe('Routing', () => {
  it.each`
    testNumber | path         | pageTestId       | page
    ${30}      | ${'/'}       | ${'home-page'}   | ${'HomePage'}
    ${31}      | ${'/signup'} | ${'signup-page'} | ${'SignupPage'}
    ${34}      | ${'/login'}  | ${'login-page'}  | ${'LoginPage'}
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
    ${33}      | ${'/signup'} | ${'home-page'}   | ${'HomePage'}
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
