import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import "react-datepicker/dist/react-datepicker.css";
import Rating from "react-rating-stars-component"; // Import the Rating component
import Delete from "./Delete";
import "./TaskList.css"

const TaskList = ({
  tasks,
  handleDeleteTask,
  handleEditTask,
  handleToggleTask,
}) => {
  const [ratings, setRatings] = useState({});
  const [departmentalGoals, setDepartmentalGoals] = useState({});

  const handleRatingChange = (taskId, rating) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [taskId]: rating,
    }));
  };

  useEffect(() => {
    console.log("Tasks Prop Updated in TaskList:", tasks);
  }, [tasks]);

  console.log("Tasks in TaskList component:", tasks);

  useEffect(() => {
    console.log("Received Tasks in TaskList:", tasks); // Console log for tasks
    // Fetch departmental goals from the server and update the state
    const fetchDepartmentalGoals = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/departmental-goals"
        );
        if (response.ok) {
          const data = await response.json();
          setDepartmentalGoals(data);
          console.log("Fetched Departmental Goals:", data); // Add this console.log statement
          // Convert the array of departmental goals into an object with goal ID as keys
          const goalsObject = data.reduce((acc, goal) => {
            acc[goal._id] = goal;
            return acc;
          }, {});
          setDepartmentalGoals(goalsObject);
          console.log("Received Tasks in TaskList:", tasks); // Add this console.log statement
          console.log("Fetched Departmental Goals:", goalsObject); // Add this console.log statement
        }
      } catch (error) {
        console.error("Error fetching departmental goals:", error);
      }
    };
    fetchDepartmentalGoals();
  }, []);
  console.log("Received Tasks Prop in TaskList:", tasks);

  if (!tasks || tasks.length === 0) {
    return <h2>Task List is empty</h2>;
  }

  return (
    <div data-testid="task-list-container"> {/* Add data-testid here */}
    <div className="row">
      <div className="row justify-content-center align-items-center">
        {tasks.map((task) => (
          <div className="col-md-4 p-2 my-2" key={task._id}>
            <div className="card rounded-0">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h5>{task.title}</h5>
                <Button
                  onClick={() => handleEditTask(task._id)}
                  className="btn btn-sm"
                >
                  <i className="material-icons"></i>
                  Edit
                </Button>
              </div>
              <div className="card-body">
                {/* Render the departmental goal information */}
              {/*   <p>
                  Departmental Goal:{" "}
                  {departmentalGoals[task.departmentalGoal]?.title}
                </p>
 */}
                <Form.Check
                  type="checkbox"
                  checked={task.completed}
                  onChange={() =>
                    handleToggleTask(task._id, { completed: !task.completed })
                  }
                  style={{
                    border: "2px solid #007bff", // Change border color to blue
                    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.2)", // Add a shadow effect
                    borderRadius: "px", // Add a border radius
                    padding: "4px", // Add some padding for a cleaner look
                    width: "25px",
                  }}
                />
                <p>Description: {task.description}</p>
                <p>Date: {task.date}</p>
                <div>
                  <label>Please Rate Your Performance</label>
                  <Rating
                    count={5}
                    size={24}
                    value={ratings[task._id] || 0}
                    onChange={(newRating) =>
                      handleRatingChange(task._id, newRating)
                    }
                    half={false}
                  />
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                  <Button
                    onClick={() => handleDeleteTask(task._id)}
                    className="btn btn-sm delete-button" 
                  >
                    Delete
                  </Button>
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
   </div>
  );
};

export default TaskList;
