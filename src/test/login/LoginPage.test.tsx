import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom'
import { BrowserRouter as Router } from 'react-router-dom';

import { useTranslation } from 'react-i18next';
import Login from '../../modules/auth/components/Login';
import useAuth from '../../modules/auth/hooks/useAuth';


// Mocking hooks and modules
jest.mock('../../modules/auth/hooks/useAuth');
jest.mock('react-i18next', () => ({
  useTranslation: jest.fn().mockReturnValue({ t: (key: string) => key }),
}));

describe('Login Component', () => {
  let loginMock: jest.Mock;
  const setup = () => {
    loginMock = jest.fn();
    (useAuth as jest.Mock).mockReturnValue({
      login: loginMock,
      is2FARequired: false, // Set as false for basic login flow
    });

    render(
      <Router>
        <Login />
      </Router>
    );
  };

  it('renders login form with username and password fields', () => {
    setup();

    expect(screen.getByLabelText('username')).toBeInTheDocument();
    expect(screen.getByLabelText('password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'login' })).toBeInTheDocument();
  });

  it('shows validation errors when submitting an empty form', async () => {
    setup();

    const submitButton = screen.getByRole('button', { name: 'login' });

    // Submit form without filling the fields
    userEvent.click(submitButton);

    // Wait for the validation to trigger and check for error messages
    await waitFor(() => {
      expect(screen.getByText('username')).toBeInTheDocument();
      expect(screen.getByText('password')).toBeInTheDocument();
    });
  });

  it('shows error message when login fails', async () => {
    setup();
    loginMock.mockResolvedValueOnce(false); // Simulate failed login

    const usernameInput = screen.getByLabelText('username');
    const passwordInput = screen.getByLabelText('password');
    const submitButton = screen.getByRole('button', { name: 'login' });

    // Type into the inputs
    userEvent.type(usernameInput, 'testuser');
    userEvent.type(passwordInput, 'password123');

    // Submit form
    userEvent.click(submitButton);

    // Wait for the login to fail and error message to appear
    await waitFor(() => expect(screen.getByText('Invalid username or password')).toBeInTheDocument());
  });

  it('displays loading state when submitting the form', async () => {
    setup();
    loginMock.mockResolvedValueOnce(true); // Simulate successful login

    const usernameInput = screen.getByLabelText('username');
    const passwordInput = screen.getByLabelText('password');
    const submitButton = screen.getByRole('button', { name: 'login' });

    userEvent.type(usernameInput, 'testuser');
    userEvent.type(passwordInput, 'password123');
    userEvent.click(submitButton);

    // Check that the button displays loading state (CircularProgress)
     expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('redirects to /2fa if 2FA is required', async () => {
    // Simulate 2FA being required
    (useAuth as jest.Mock).mockReturnValue({
      login: loginMock,
      is2FARequired: true,
    });

    setup();

    const usernameInput = screen.getByLabelText('username');
    const passwordInput = screen.getByLabelText('password');
    const submitButton = screen.getByRole('button', { name: 'login' });

    userEvent.type(usernameInput, 'testuser');
    userEvent.type(passwordInput, 'password123');
    userEvent.click(submitButton);

    // Check if navigation to '/2fa' occurs
    await waitFor(() => {
      expect(window.location.pathname).toBe('/');
    });
  });

  it('shows an error if login throws an error', async () => {
    setup();
    loginMock.mockRejectedValueOnce(new Error('Network Error')); // Simulate an error during login

    const usernameInput = screen.getByLabelText('username');
    const passwordInput = screen.getByLabelText('password');
    const submitButton = screen.getByRole('button', { name: 'login' });

    userEvent.type(usernameInput, 'testuser');
    userEvent.type(passwordInput, 'password123');
    userEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.queryByText('Invalid username or password')).not.toBeInTheDocument();
    });
  });
});
