import axios from "axios";

const baseUrl = `${process.env.REACT_APP_API_URL}/api/tasks`;

const getToken = () => {
  return localStorage.getItem("token");
};

const config = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

const getAll = () => {
  return axios.get(baseUrl, config()).then((response) => response.data);
};

const postData = (addtask) => {
  return axios
    .post(baseUrl, addtask, config())
    .then((response) => response.data);
};

const updateData = (taskId, updatedTask) => {
  return axios
    .put(`${baseUrl}/${taskId}`, updatedTask, config())
    .then((response) => response.data);
};

const deleteData = (taskId) => {
  return axios
    .delete(`${baseUrl}/${taskId}`, config())
    .then((response) => response.data);
};

export default {
  postData,
  getAll,
  updateData,
  deleteData,
};
