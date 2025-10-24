// src/ADMIN/pages/SignUp.jsx
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "../../contexts/AuthContext";

export default function SignUp() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "",
    password: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // TODO: Add your actual signup logic here (API call, validation, etc.)
    // For now, we'll just store the data locally
    
    const userData = {
      email: formData.email,
      firstName: formData.firstName,
      lastName: formData.lastName,
      phone: formData.phone,
      role: formData.role
    };
    
    // Store user data in context and localStorage
    signup(userData);
    
    // Redirect based on role
    if (formData.role === "admin") {
      navigate('/admin');
    } else if (formData.role === "salesman") {
      navigate('/sales');
    } else {
      // If no role selected, show error or default to login
      alert("Please select a role");
    }
  };

  const handleGoogleSignup = () => {
    // TODO: Add Google OAuth logic here
    // For now, just navigate to login
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1e3a8a]">
      <div className="relative w-full max-w-md rounded-xl bg-white p-8 pt-12 shadow-lg">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 flex items-center space-x-2 rounded-b-md bg-[#1e3a8a] px-6 py-2 shadow-md">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500 text-sm font-bold text-white">
            📊
          </div>
          <span className="font-semibold text-white">SalesTrack</span>
        </div>

        <h2 className="mb-4 mt-10 text-center text-lg font-semibold">
          Sign up to manage your field sales operations
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex space-x-3">
            <div className="w-1/2">
              <label className="mb-1 block text-sm font-semibold">First Name</label>
              <input
                type="text"
                className="w-full rounded-md border bg-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your first name"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                required
              />
            </div>
            <div className="w-1/2">
              <label className="mb-1 block text-sm font-semibold">Last Name</label>
              <input
                type="text"
                className="w-full rounded-md border bg-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your last name"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                required
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold">Email</label>
            <input
              type="email"
              className="w-full rounded-md border bg-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold">Phone Number</label>
            <input
              type="tel"
              pattern="[0-9+]*"
              className="w-full rounded-md border bg-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="+254 795432443"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold">Role</label>
            <select
              className="w-full rounded-md border bg-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              required
            >
              <option value="">Select a role</option>
              <option value="admin">Admin</option>
              <option value="salesman">Salesman</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold">Password</label>
            <input
              type="password"
              className="w-full rounded-md border bg-gray-100 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>

          <button
            type="submit"
            className="mt-2 w-full rounded-full bg-[#1e3a8a] py-2 font-semibold text-white transition hover:bg-blue-800"
          >
            Sign Up
          </button>
        </form>

        <div className="my-6 flex items-center">
          <hr className="flex-1 border-gray-300" />
          <span className="mx-3 text-sm text-gray-600">Or continue with</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        <div className="flex justify-center">
          <button 
            onClick={handleGoogleSignup}
            className="flex items-center space-x-2 rounded-md border px-6 py-2 transition hover:bg-gray-100"
          >
            <FcGoogle size={22} />
            <span className="font-medium">Google</span>
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <span
            className="cursor-pointer text-blue-600 hover:underline"
            onClick={() => navigate("/")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}