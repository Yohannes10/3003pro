import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Import the jest-dom matchers
import TaskList from "../components/CRUD/TaskList"

// Define mock tasks for testing
const mockTasks = [
  {
    _id: '1',
    title: 'Task 1',
    description: 'Description 1',
    completed: false,
    date: '2023-08-11',
  },
  // Add more mock tasks as needed
];

// Define mock handler functions
const mockHandleDeleteTask = jest.fn();
const mockHandleEditTask = jest.fn();
const mockHandleToggleTask = jest.fn();

test('renders TaskList component with tasks', () => {
  render(
    <TaskList
      tasks={mockTasks}
      handleDeleteTask={mockHandleDeleteTask}
      handleEditTask={mockHandleEditTask}
      handleToggleTask={mockHandleToggleTask}
    />
  );

  // Check if task titles are rendered
  const taskTitles = mockTasks.map((task) => task.title);
  taskTitles.forEach((title) => {
    const titleElement = screen.getByText(title);
    expect(titleElement).toBeInTheDocument();
  });

  // Check if task descriptions are rendered
  const taskDescriptions = mockTasks.map((task) => task.description);
  taskDescriptions.forEach((description) => {
    const descriptionElement = screen.getByText(/Description 1/);
    expect(descriptionElement).toBeInTheDocument();
  });

  // Check if task checkboxes are rendered
  const taskCheckboxes = mockTasks.map((task) => task.completed);
  taskCheckboxes.forEach((completed) => {
    const checkboxElement = screen.getByRole('checkbox', { checked: completed });
    expect(checkboxElement).toBeInTheDocument();
  });

  // Perform snapshot testing
  expect(screen.getByTestId('task-list-container')).toMatchSnapshot();
});

test('handles checkbox toggle', () => {
  render(
    <TaskList
      tasks={mockTasks}
      handleDeleteTask={mockHandleDeleteTask}
      handleEditTask={mockHandleEditTask}
      handleToggleTask={mockHandleToggleTask}
    />
  );

  // Find the first checkbox and click it
  const firstCheckbox = screen.getAllByRole('checkbox')[0];
  fireEvent.click(firstCheckbox);

  // Verify that the handleToggleTask function was called with the correct taskId and completed status
  expect(mockHandleToggleTask).toHaveBeenCalledWith(mockTasks[0]._id, { completed: true });
});
