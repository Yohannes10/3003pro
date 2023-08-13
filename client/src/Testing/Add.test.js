import React from 'react';
import { render, screen } from '@testing-library/react';
import Add from "../components/CRUD/Add";
import '@testing-library/jest-dom/extend-expect';

test('renders Add component', () => {
  const { asFragment } = render(<Add addTask={() => {}} />);
  const addButton = screen.getByText('Add Goal');
  expect(addButton).toBeInTheDocument();

  // Perform snapshot testing
  expect(asFragment()).toMatchSnapshot();
});
