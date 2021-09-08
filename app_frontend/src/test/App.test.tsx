import React from 'react';
import { render, screen } from '@testing-library/react';
// @ts-ignore
import App from '../App.tsx';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Hello/i);
  expect(linkElement).toBeInTheDocument();
});
