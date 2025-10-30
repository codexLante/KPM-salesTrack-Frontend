import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRoles }) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  // Check if user is logged in
  if (!token || !user.id) {
    return <Navigate to="/" replace />;
  }

  // Check if user has required role
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Redirect to their appropriate dashboard
    if (user.role === "admin") {
      return <Navigate to="/admin" replace />;
    } else if (user.role === "sales") {
      return <Navigate to="/sales" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return children;
}