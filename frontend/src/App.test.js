// filepath: src/App.test.js
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders User Management System link', () => {
  render(<App />);
  const linkElement = screen.getByText(/User Management System/i);
  expect(linkElement).toBeInTheDocument();
});