// New.js
import React, { useState } from "react";
import "../Styles/newreg.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import services from "../Services/dataServices";

const New = () => {
  const [task, setTask] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [showDueDateMessage, setShowDueDateMessage] = useState(false);
  const [confirmation, setConfirmation] = useState(null);

  const handleItemChange = (e) => {
    setNewItem(e.target.value);
  };

  const handleDueDateChange = (e) => {
    setDueDate(e.target.value);
  };

  const handleItemSubmit = (e) => {
    e.preventDefault();
    try {
      const taskNew = {
        tname: newItem,
        id: task.length + 1,
        date: dueDate,
      };
      services.postData(taskNew).then((response) => {
        setTask(task.concat(response));
        setNewItem("");
        setDueDate("");
      });
      setLoading(true); // Set loading state to true
      // Simulate a loading delay (you can replace this with actual async logic)
      setTimeout(() => {
        console.log("New item:", newItem);
        console.log("Due date:", dueDate);
        setLoading(false); // Set loading state to false after handling the submission
        setNewItem("");
        setDueDate("");
      }, 2000);
    } catch (error) {
      // Simulated delay of 2 seconds
      setConfirmation(`Error submitting data. Please try again`);
      console.error("Error submitting form data:", error);
    }
  };

  const handleDueDateMouseEnter = () => {
    setShowDueDateMessage(true);
  };

  const handleDueDateMouseLeave = () => {
    setShowDueDateMessage(false);
  };

  const currentDate = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = currentDate.toLocaleDateString("en-US", options);

  return (
    <div className="days">
      <div className="new-container">
        <div className="new-content">
          <h2>Create New Task</h2>
          <p>{formattedDate}</p>

          <form onSubmit={handleItemSubmit}>
            <div className="input-wrapper">
              <input
                type="text"
                value={newItem}
                onChange={handleItemChange}
                placeholder="Enter task details"
              />

              <input
                type="date"
                value={dueDate}
                onChange={handleDueDateChange}
                onMouseEnter={handleDueDateMouseEnter}
                onMouseLeave={handleDueDateMouseLeave}
              />

              {showDueDateMessage && (
                <p className="due-date-message">DUE DATE</p>
              )}
            </div>

            <div className="new-contentt">
              <button type="submit">
                {loading ? (
                  <>
                    <span>TICK-T</span>
                    <FontAwesomeIcon icon={faClock} spin />
                    <span>CK</span>
                  </>
                ) : (
                  "Add New Task"
                )}
              </button>
            </div>
          </form>

          {confirmation && <p>{confirmation}</p>}
        </div>
      </div>
    </div>
  );
};

export default New;
