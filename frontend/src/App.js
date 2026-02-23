import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./Styles/App.css";
import New from "./Components/NewReg";
import Completed from "./Components/Completed";
import AllTask from "./Components/AllTask";
import Sidebar from "./Components/sidebar";
import Myday from "./Components/Myday";
import Scheduled from "./Components/Scheduled";
import Login from "./Components/Login";
import Register from "./Components/Register";
import { useState } from "react";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  return (
    <BrowserRouter>
      {token && <Sidebar />}
      <Routes>
        {!token && (
          <>
            <Route path="/login" element={<Login setToken={setToken} />} />
            <Route path="/register" element={<Register />} />
          </>
        )}

        {token ? (
          <>
            <Route path="/" element={<AllTask />} />
            <Route path="/all-task" element={<AllTask />} />
            <Route path="/new" element={<New />} />
            <Route path="/completed" element={<Completed />} />
            <Route path="/my-day" element={<Myday />} />
            <Route path="/scheduled" element={<Scheduled />} />
          </>
        ) : (
          <Route path="*" element={<Login setToken={setToken} />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
