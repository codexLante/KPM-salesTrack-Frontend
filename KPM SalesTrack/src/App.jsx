import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./ADMIN/pages/login";
import SignUp from "./ADMIN/pages/SignUp";
import AdminLayout from "./ADMIN/index";
import EmployeeManagement from "./ADMIN/pages/EmployeeManagement";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        
        {/* Protected Admin Routes - Nested */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<EmployeeManagement />} />
          <Route path="employees" element={<EmployeeManagement />} />
          {/* Add more routes as you create pages */}
        </Route>

        {/* 404 - Redirect to login */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;