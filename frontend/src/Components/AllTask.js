import React, { useState, useEffect } from "react";
import services from "../Services/dataServices";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Table, Button, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "../Styles/myday.css";

const AllTask = () => {
  const [taskdata, setTaskData] = useState([]);
  const [loadingTasks, setLoadingTasks] = useState([]);

  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  useEffect(() => {
    services
      .getAll()
      .then((response) => setTaskData(response))
      .catch((err) =>
        console.log(`Error while fetching data from DB : ${err}`),
      );
  }, []);

  const handleSubmission = (taskId) => {
    setLoadingTasks((prev) => [...prev, taskId]);

    const taskToUpdate = taskdata.find((task) => task.id === taskId);

    const updatedTask = {
      ...taskToUpdate,
      taccomplished: !taskToUpdate.taccomplished,
    };

    setTimeout(() => {
      services.updateData(taskId, updatedTask).then(() => {
        setTaskData((prev) =>
          prev.map((task) => (task.id === taskId ? updatedTask : task)),
        );
        setLoadingTasks((prev) => prev.filter((id) => id !== taskId));
      });
    }, 2000);
  };

  const handleDelete = (taskId) => {
    services.deleteData(taskId).then(() => {
      setTaskData((prev) => prev.filter((task) => task.id !== taskId));
    });
  };

  const isTaskLoading = (taskId) => loadingTasks.includes(taskId);

  return (
    <div className="days">
      <Container className="home-container">
        <h1>ALL TASKS</h1>

        <Table className="task-list" striped bordered hover>
          <thead>
            <tr>
              <th>Tasks</th>
              <th>Due-Date</th>
              <th>Submissions</th>
              <th>Delete</th>
            </tr>
          </thead>

          <tbody>
            {taskdata.map((task) => {
              const taskDate = new Date(task.date);
              taskDate.setHours(0, 0, 0, 0);

              const isExpired = taskDate < currentDate;

              return (
                <tr key={task.id}>
                  <td className="task-name">{task.tname}</td>
                  <td className="task-date">{taskDate.toLocaleDateString()}</td>
                  <td className="submission">
                    {isExpired ? (
                      <Button variant="danger" disabled>
                        Expired
                      </Button>
                    ) : (
                      <Button
                        variant="primary"
                        disabled={task.taccomplished}
                        onClick={() => handleSubmission(task.id)}
                      >
                        {isTaskLoading(task.id) ? (
                          <>
                            <span>Kud&nbsp; </span>
                            <Spinner animation="border" size="sm" />
                            <span>&nbsp;s</span>
                          </>
                        ) : task.taccomplished ? (
                          "Completed"
                        ) : (
                          "Mark as Submitted"
                        )}
                      </Button>
                    )}
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(task.id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default AllTask;
