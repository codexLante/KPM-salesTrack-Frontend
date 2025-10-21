// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./ADMIN/pages/login";
import SignUp from "./ADMIN/pages/SignUp";
import EmployeeManagement from "./ADMIN/pages/EmployeeManagement";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/employee-management" element={<EmployeeManagement />} />
      </Routes>
    </Router>
  );
}

export default App;