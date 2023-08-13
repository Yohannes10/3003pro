import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "./Add.css";

const Add = ({ addTask }) => {
  const [content, setContent] = useState({
    title: "",
    description: "",
    date: new Date(),
    userSelected: "",
    users: [],
    _id: "",
  });

  const onChangeDate = (date) => setContent({ ...content, date });

  const onSubmit = (e) => {
    e.preventDefault();
    if (!content.title || content.title.trim() === "") {
      alert("Please enter a title for the task.");
      return;
    }
    addTask(content);
    setContent({
      title: "",
      description: "",
      date: new Date(),
    });
  };

  const onChange = (e) => {
    setContent({ ...content, [e.target.name]: e.target.value });
  };

  const [departmentalGoals, setDepartmentalGoals] = useState([]);

  useEffect(() => {
    // Fetch departmental goals from the server and update the state
    const fetchDepartmentalGoals = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/departmental-goals"
        );
        if (response.ok) {
          const data = await response.json();
          setDepartmentalGoals(data);
        }
      } catch (error) {
        console.error("Error fetching departmental goals:", error);
      }
    };
    fetchDepartmentalGoals();
  }, []);
  return (
    <div className="col-md-6 offset-md-3">
      <div className="card card-body">
        <h2>Create a Goal</h2>
        <div>
          <h4>
            {" "}
            Goals describe specific objectives you want to achieve in your job,
            for a specific period of time. Goals change on every period. Make
            sure you define goals in SMART terms —
            <span className="bold-first-letter">S</span>pecific,
            <span className="bold-first-letter">M</span>easurable,
            <span className="bold-first-letter">A</span>ttainable,
            <span className="bold-first-letter">R</span>ealistic, and
            <span className="bold-first-letter">T</span>ime-bound.
          </h4>
        </div>

        <form onSubmit={onSubmit}>
          <div className="mb-3">
            <div className="form-group">
              <select
                className="form-control"
                placeholder="Select a Departmental Goal"
                name="departmentalGoal"
                value={content.departmentalGoal}
                onChange={onChange}
                required
              >
                <option value="">Select a goal...</option>
                {departmentalGoals.map((goal) => (
                  <option key={goal._id} value={goal._id}>
                    {goal.title}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <input
                type="text"
                className="form-control"
                placeholder="Task title"
                name="title" // Add the name attribute for title
                value={content.title} // Correct variable name here
                onChange={onChange}
                required
                autoFocus
              />
            </div>

            <div>
              <input
                type="text"
                className="form-control"
                placeholder="Task description"
                name="description"
                value={content.description}
                onChange={onChange}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <DatePicker
              className="form-control"
              selected={content.date}
              onChange={onChangeDate}
            />
          </div>

          <Button type="submit" className="btn btn-primary">
            Add Goal
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Add;
