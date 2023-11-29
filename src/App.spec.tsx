import { render, screen } from '@testing-library/react';

import App from './App.tsx';

describe('Routing', () => {
  it('030 - displays homepage at /', () => {
    render(<App />);
    const homePage = screen.getByTestId('home-page');

    expect(homePage).toBeInTheDocument();
  });

  it('031 - does not display SignupPage when at /', () => {
    render(<App />);
    const signupPage = screen.queryByTestId('signup-page');

    expect(signupPage).not.toBeInTheDocument();
  });
});
