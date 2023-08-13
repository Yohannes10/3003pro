import React from "react";

const Delete = ({ handleDeleteTask, taskId }) => {
  const handleDelete = () => {
    // Display an alert for confirmation
    const confirmed = window.confirm("Are you sure you want to delete this task?");
    if (confirmed) {
      // Call the provided handleDeleteTask function with the taskId parameter
      handleDeleteTask(taskId);
    }
  };

  return (
    <button onClick={handleDelete} className="delete-button">
      Delete
    </button>
  );
};

export default Delete;
