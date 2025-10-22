// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./ADMIN/pages/login";
import SignUp from "./ADMIN/pages/SignUp";
import AdminHub from "./ADMIN/index";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/admin" element={<AdminHub />} />
      </Routes>
    </Router>
  );
}

export default App;