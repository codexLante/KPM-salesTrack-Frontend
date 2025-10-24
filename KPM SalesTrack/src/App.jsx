// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./ADMIN/pages/login";
import SignUp from "./ADMIN/pages/SignUp";

// Admin imports
import AdminLayout from "./ADMIN/index";
import Dashboard from "./ADMIN/pages/dashboard"; 
import EmployeeManagement from "./ADMIN/pages/EmployeeManagement";
import ClientManagement from "./ADMIN/pages/ClientManagement";
import TaskAssignment from "./ADMIN/pages/TaskAssignment";
import ReportsAnalytics from "./ADMIN/pages/ReportsAnalytics";

// Sales imports
import SalesLayout from "./SALES/index";
import SalesDashboard from "./SALES/pages/SalesDashboard";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          
          {/* Protected Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRole="admin">
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="employees" element={<EmployeeManagement />} />
            <Route path="clients/*" element={<ClientManagement />} />
            <Route path="tasks/*" element={<TaskAssignment />} />
            <Route path="reports" element={<ReportsAnalytics />} />
          </Route>

          {/* Protected Sales Routes */}
          <Route
            path="/sales"
            element={
              <ProtectedRoute allowedRole="salesman">
                <SalesLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<SalesDashboard />} />
            <Route path="dashboard" element={<SalesDashboard />} />
            {/* Add more sales routes here later */}
          </Route>

          {/* 404 - Redirect to login */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;