import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { Button } from "react-bootstrap";



const Edit = ({ task, handleUpdateTask, handleCancelEdit }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [date, setDate] = useState(task.date);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim() === "") return;
    handleUpdateTask({ title, description, date, completed: task.completed });
  };

  return (
    <div className="card card-body">
    <h4>Edit a Goal</h4>
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter updated task title"
        className="form-control"

      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter updated task description"
        className="form-control"
      ></textarea>
      <div className="form-group">
     <DatePicker
     type="date"
     value={date}
     onChange={(e) => setDate(e.target.value)}
     />
        </div>
      <button type="submit" className="btn btn-primary">Update Task</button>
      <button type="button" className="btn btn-primary" onClick={handleCancelEdit}>
        Cancel
      </button>
      </div>
      
    </form>
    </div>
  );
   
    
};

export default Edit;
