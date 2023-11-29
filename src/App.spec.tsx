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

  it('032 - displays signup page at /signup', () => {
    window.history.pushState({}, '', '/signup');
    render(<App />);
    const signupPage = screen.queryByTestId('signup-page');

    expect(signupPage).toBeInTheDocument();
  });

  it('033 - does not display home page when at /signup', () => {
    window.history.pushState({}, '', '/signup');
    render(<App />);
    const homePage = screen.queryByTestId('home-page');

    expect(homePage).not.toBeInTheDocument();
  });
});
