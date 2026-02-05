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
  const [error, setError] = useState("");

  const handleItemChange = (e) => {
    setNewItem(e.target.value);
  };

  const handleDueDateChange = (e) => {
    setDueDate(e.target.value);
  };

  const handleItemSubmit = (e) => {
    e.preventDefault();

    // ✅ VALIDATION
    if (!newItem.trim() && !dueDate) {
      setError("Task name and due date are required");
      return;
    }

    if (!newItem.trim()) {
      setError("Task name is required");
      return;
    }

    if (!dueDate) {
      setError("Due date is required");
      return;
    }

    // ✅ Clear error if valid
    setError("");
    setLoading(true);

    const taskNew = {
      tname: newItem,
      id: task.length + 1,
      date: dueDate,
    };

    services
      .postData(taskNew)
      .then((response) => {
        setTask(task.concat(response));
        setNewItem("");
        setDueDate("");
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error submitting form data:", err);
        setConfirmation("Error submitting data. Please try again");
        setLoading(false);
      });
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
  const today = new Date().toISOString().split("T")[0];

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
                min={today}
              />

              {showDueDateMessage && (
                <p className="due-date-message">DUE DATE</p>
              )}
            </div>

            {/* ✅ ERROR MESSAGE */}
            {error && (
              <p style={{ color: "red", marginTop: "10px" }}>{error}</p>
            )}

            <div className="new-contentt">
              <button type="submit" disabled={loading}>
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
