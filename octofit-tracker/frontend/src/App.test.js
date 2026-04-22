import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

test('renders octofit navigation', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );

  expect(screen.getByText(/octofit tracker/i)).toBeInTheDocument();
  expect(screen.getByText(/activities/i)).toBeInTheDocument();
});
