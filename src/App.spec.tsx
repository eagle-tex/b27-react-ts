import { render, screen } from '@testing-library/react';

import App from './App.tsx';

describe('Routing', () => {
  it('030 - displays homepage at /', () => {
    render(<App />);
    const homePage = screen.getByTestId('home-page');

    expect(homePage).toBeInTheDocument();
  });
});
