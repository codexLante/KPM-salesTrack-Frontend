import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./ADMIN/pages/login";
import SignUp from "./ADMIN/pages/SignUp";

// Admin imports
import AdminLayout from "./ADMIN/index";
import Dashboard from "./ADMIN/pages/Dashboard/dashboard"; 
import EmployeeManagement from "./ADMIN/pages/EmployeeManagement/EmployeeManagement";
import ClientManagement from "./ADMIN/pages/ClientManagement/ClientManagement";
import TaskAssignment from "./ADMIN/pages/TaskAssignment/TaskAssignment";
import ReportsAnalytics from "./ADMIN/pages/ReportsAnalysis/ReportsAnalytics";
import Meetings from "./ADMIN/pages/Meetings/Meetings";
import RouteOptimizer from "./ADMIN/pages/RouteOptimizer/RouteOptimizer";

// Sales imports
import SalesLayout from "./SALES/index";
import SalesDashboard from "./SALES/pages/Dashboard/SalesDashboard";
import SalesMeetings from "./SALES/pages/Meetings/Meetings";
import MyClients from "./SALES/pages/clients/MyClients";
import Objectives from "./SALES/pages/Objective/Objectives";
import Tasks from "./SALES/pages/Tasks";

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
            <Route path="meetings" element={<Meetings />} />
            <Route path="route-optimizer" element={<RouteOptimizer />} />
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
            <Route path="meetings" element={<SalesMeetings />} />
            <Route path="clients" element={<MyClients />} />
            <Route path="objectives" element={<Objectives />} />
            <Route path="tasks" element={<Tasks />} />
          </Route>

          {/* 404 - Redirect to login */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;