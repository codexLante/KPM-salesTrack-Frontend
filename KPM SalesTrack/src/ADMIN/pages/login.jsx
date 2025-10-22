import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaMicrosoft } from "react-icons/fa";

export default function Login() {
  const navigate = useNavigate();

 
  const handleLogin = (e) => {
    e.preventDefault();
    
    // TODO: Add your actual login logic here (API call, validation, etc.)
    // For now, we'll just redirect directly to employee management
    
    // After successful login, redirect to employee management
    navigate('/admin');
  };


  const handleGoogleLogin = () => {
    // TODO: Add Google OAuth logic here
    // For prototype, just redirect
    navigate('/admin');
  };

  // Handle Microsoft login
  // const handleMicrosoftLogin = () => {
  //   // TODO: Add Microsoft OAuth logic here
  //   // For prototype, just redirect
  //   navigate('/employee-management');
  // };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-900">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8 pt-12 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-blue-900 px-6 py-2 flex items-center space-x-2">
          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
            📊
          </div>
          <span className="text-white font-semibold">SalesTrack</span>
        </div>

        <h2 className="text-center font-semibold text-lg mt-6 mb-4">Welcome back!</h2>

        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block font-semibold text-sm mb-1">Email</label>
            <input
              type="email"
              className="w-full border rounded-md px-3 py-2 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block font-semibold text-sm mb-1">Password</label>
            <input
              type="password"
              className="w-full border rounded-md px-3 py-2 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-900 text-white font-semibold py-2 rounded-full hover:bg-blue-800 transition"
          >
            Login
          </button>
        </form>

        <div className="flex items-center my-6">
          <hr className="flex-1 border-gray-300" />
          <span className="mx-3 text-sm text-gray-600">Or continue with</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        <div className="flex justify-center space-x-4">
          <button 
            onClick={handleGoogleLogin}
            className="flex items-center space-x-2 border rounded-md px-4 py-2 hover:bg-gray-100 transition"
          >
            <FcGoogle size={20} />
            <span>Google</span>
          </button>

          {/* <button 
            onClick={handleMicrosoftLogin}
            className="flex items-center space-x-2 border rounded-md px-4 py-2 hover:bg-gray-100 transition"
          >
            <FaMicrosoft size={18} color="#0078D4" />
            <span>Microsoft</span>
          </button> */}
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