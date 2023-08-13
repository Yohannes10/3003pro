import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Register from '../components/Authentication/Register';

test('handles form submission', () => {
  const mockHandleRegister = jest.fn();

  const { asFragment } = render(
    <MemoryRouter>
      <Register handleRegister={mockHandleRegister} />
    </MemoryRouter>
  );

  const emailInput = screen.getByPlaceholderText('Email*');
  const usernameInput = screen.getByPlaceholderText('username*');
  const passwordInput = screen.getByPlaceholderText('password*');
  const confirmPasswordInput = screen.getByPlaceholderText('Confirm Password*');

  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  fireEvent.change(usernameInput, { target: { value: 'testuser' } });
  fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
  fireEvent.change(confirmPasswordInput, { target: { value: 'testpassword' } });

  const registerButton = screen.getByRole('button', { name: /register/i });
  fireEvent.click(registerButton);

  expect(mockHandleRegister).toHaveBeenCalledWith(
    'testuser',
    'testpassword',
    'test@example.com',
    'testpassword'
  );

  // Perform snapshot testing
  expect(asFragment()).toMatchSnapshot();
});
