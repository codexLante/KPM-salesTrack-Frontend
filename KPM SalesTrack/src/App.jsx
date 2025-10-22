import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./ADMIN/pages/login";
import SignUp from "./ADMIN/pages/SignUp";
import AdminLayout from "./ADMIN/index";
import Dashboard from "./ADMIN/pages/dashboard"; 
import EmployeeManagement from "./ADMIN/pages/EmployeeManagement";
import ClientManagement from "./ADMIN/pages/ClientManagement"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        
        {/* Protected Admin Routes - Nested */}
        <Route path="/admin" element={<AdminLayout />}>
          {/* Dashboard as the default/index route */}
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          
          {/* Other admin pages */}
          <Route path="employees" element={<EmployeeManagement />} />
          <Route path="clients" element={<ClientManagement/>}/>
          {/* Add more routes as you create pages */}
        </Route>

        {/* 404 - Redirect to login */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;