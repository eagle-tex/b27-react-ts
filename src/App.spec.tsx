import { render, screen } from '@testing-library/react';

import App from './App.tsx';

describe('Routing', () => {
  it.each`
    testNumber | path         | pageTestId       | page
    ${30}      | ${'/'}       | ${'home-page'}   | ${'HomePage'}
    ${32}      | ${'/signup'} | ${'signup-page'} | ${'SignupPage'}
  `(
    '0$testNumber - displays $page when path is $path',
    ({ pageTestId, path }) => {
      window.history.pushState({}, '', path as string);
      render(<App />);
      const page = screen.queryByTestId(pageTestId as string);

      expect(page).toBeInTheDocument();
    }
  );

  it('031 - does not display SignupPage when at /', () => {
    window.history.pushState({}, '', '/');
    render(<App />);
    const signupPage = screen.queryByTestId('signup-page');

    expect(signupPage).not.toBeInTheDocument();
  });

  it('033 - does not display home page when at /signup', () => {
    window.history.pushState({}, '', '/signup');
    render(<App />);
    const homePage = screen.queryByTestId('home-page');

    expect(homePage).not.toBeInTheDocument();
  });
});
