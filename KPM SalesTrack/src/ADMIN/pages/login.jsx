import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";

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
      url: "http://127.0.0.1:5000/users/login", 
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
    <div className="min-h-screen flex items-center justify-center bg-blue-900">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8 pt-12 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-blue-900 px-6 py-2 flex items-center space-x-2 rounded-b-md shadow-md">
          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
            📊
          </div>
          <span className="text-white font-semibold">SalesTrack</span>
        </div>

        <h2 className="text-center font-semibold text-lg mt-6 mb-4">Welcome back!</h2>

        {error && (
          <div className="mb-4 rounded-md bg-red-50 border border-red-200 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block font-semibold text-sm mb-1">Email</label>
            <input
              type="email"
              className="w-full border rounded-md px-3 py-2 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              disabled={loading}
            />
          </div>

          <div>
            <label className="block font-semibold text-sm mb-1">Password</label>
            <input
              type="password"
              className="w-full border rounded-md px-3 py-2 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-900 text-white font-semibold py-2 rounded-full hover:bg-blue-800 transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="flex items-center my-6">
          <hr className="flex-1 border-gray-300" />
          <span className="mx-3 text-sm text-gray-600">Or continue with</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        <div className="flex justify-center">
          <button className="flex items-center space-x-2 border rounded-md px-4 py-2 hover:bg-gray-100">
            <FcGoogle size={20} />
            <span>Google</span>
          </button>
        </div>

        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have an account?{" "}
          <span
            className="text-blue-600 hover:underline cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}