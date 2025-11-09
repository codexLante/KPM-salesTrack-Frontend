import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Mail, Lock, TrendingUp, Users, BarChart3, MapPin } from "lucide-react";
import axios from "axios";
import{FaChartBar} from 'react-icons/fa'

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    axios({ 
      method: "POST", 
      url: "https://salestrack-backend.onrender.com/users/login", 
      data: {
        email: formData.email,
        password: formData.password,
      }
    })
      .then((res) => {
        console.log(res);
        const token = res?.data?.token;
        const user = res?.data?.user;
        
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        
        const role = user.role.toLowerCase();

        if (role === "admin") {
          navigate("/admin");
        } else if (role === "sales") {
          navigate("/sales");
        } else {
          navigate("/");
        }
      })
      .catch((e) => {
        console.log(e);
        setError(e.response?.data?.error || "Login failed. Please check your credentials.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 p-12 flex-col justify-between relative overflow-hidden">
        {/* Animated background circles */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500 rounded-full opacity-10 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-400 rounded-full opacity-10 blur-3xl animate-pulse delay-1000"></div>
        
        {/* Logo */}
        <div className="relative z-10">
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-2xl shadow-lg">
                <FaChartBar className="text-white" />
            </div>
            <span className="text-white text-3xl font-bold">SalesTrack</span>
          </div>
          <p className="text-blue-100 text-lg">Field Sales Management System</p>
        </div>

        {/* Welcome Message */}
        <div className="relative z-10">
          <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
            Welcome Back,<br />
            <span className="text-blue-300">Sales Leader!</span>
          </h1>
          <p className="text-blue-100 text-xl mb-12">
            Manage your team, optimize routes, and boost productivity all in one place.
          </p>

          {/* Features Grid */}
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all">
              <TrendingUp className="text-green-400 mb-3" size={32} />
              <h3 className="text-white font-semibold mb-2">Track Performance</h3>
              <p className="text-blue-100 text-sm">Real-time sales metrics</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all">
              <Users className="text-blue-300 mb-3" size={32} />
              <h3 className="text-white font-semibold mb-2">Manage Teams</h3>
              <p className="text-blue-100 text-sm">Complete oversight</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all">
              <MapPin className="text-yellow-400 mb-3" size={32} />
              <h3 className="text-white font-semibold mb-2">Optimize Routes</h3>
              <p className="text-blue-100 text-sm">Save time & fuel</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all">
              <BarChart3 className="text-purple-400 mb-3" size={32} />
              <h3 className="text-white font-semibold mb-2">Analytics</h3>
              <p className="text-blue-100 text-sm">Data-driven insights</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 text-blue-200 text-sm">
          © 2025 SalesTrack. All rights reserved.
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center space-x-3 mb-8">
            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-xl">
              📊
            </div>
            <span className="text-blue-900 text-2xl font-bold">SalesTrack</span>
          </div>

          {/* Form Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome back!</h2>
            <p className="text-gray-600">Please enter your credentials to login</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 rounded-lg bg-red-50 border border-red-200 p-4 flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          )}

          {/* Login Form */}
          <form className="space-y-5" onSubmit={handleLogin}>
            {/* Email Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white transition-all"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white transition-all"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-900 to-blue-700 text-white font-semibold py-3 rounded-lg hover:from-blue-800 hover:to-blue-600 transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging in...
                </span>
              ) : (
                "Login"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-8">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-4 text-sm text-gray-500 font-medium">Or continue with</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Google Login */}
          <button className="w-full flex items-center justify-center space-x-3 border-2 border-gray-300 rounded-lg px-4 py-3 hover:bg-gray-100 hover:border-gray-400 transition-all group">
            <FcGoogle size={24} />
            <span className="font-medium text-gray-700 group-hover:text-gray-900">Continue with Google</span>
          </button>

          {/* Sign Up Link */}
          <p className="text-center text-sm text-gray-600 mt-8">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/signup")}
              className="text-blue-600 hover:text-blue-700 font-semibold hover:underline"
            >
              Sign up for free
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}