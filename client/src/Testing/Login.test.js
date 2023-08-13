import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Login from "../components/Authentication/Login";
import { MemoryRouter } from 'react-router-dom';

test('renders Login component', () => {
  const { asFragment } = render(<MemoryRouter><Login handleLogin={() => {}} /></MemoryRouter>);

  expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
  expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
  expect(screen.getByText('Sign In')).toBeInTheDocument();

  // Perform snapshot testing
  expect(asFragment()).toMatchSnapshot();
});

test('handles form submission', () => {
  const mockHandleLogin = jest.fn();

  render(<MemoryRouter><Login handleLogin={mockHandleLogin} /></MemoryRouter>);

  const usernameInput = screen.getByPlaceholderText('Username');
  const passwordInput = screen.getByPlaceholderText('Password');

  fireEvent.change(usernameInput, { target: { value: 'testuser' } });
  fireEvent.change(passwordInput, { target: { value: 'testpassword' } });

  const signInButton = screen.getByText('Sign In');
  fireEvent.click(signInButton);

  expect(mockHandleLogin).toHaveBeenCalledWith('testuser', 'testpassword');
});
