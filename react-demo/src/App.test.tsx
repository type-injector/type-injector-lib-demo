import { render, screen } from '@testing-library/react';
import App from './App';

test('renders hello react', async () => {
  render(<App />);
  const businessViewsWithoutToken = await screen.findAllByText(/Hello React/i);
  expect(businessViewsWithoutToken.length).toBe(3);

  const businessViewsWithToken = await screen.findAllByText(/Token[0-9]/i);
  expect(businessViewsWithToken.length).toBe(1);
});
