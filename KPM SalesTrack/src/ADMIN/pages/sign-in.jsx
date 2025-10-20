import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaMicrosoft } from "react-icons/fa";

export default function SignIn() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1e3a8a]">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8 pt-12 relative">
        {/* Logo Box */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 translate-y-0 bg-[#1e3a8a] px-6 py-2 rounded-b-md flex items-center space-x-2 shadow-md">
          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
            📊
          </div>
          <span className="text-white font-semibold">SalesTrack</span>
        </div>

        {/* Heading */}
        <h2 className="text-center font-semibold text-lg mb-4 mt-10">
          Sign in to manage your field sales operations
        </h2>

        {/* Form */}
        <form className="space-y-4">
          <div className="flex space-x-3">
            <div className="w-1/2">
              <label className="block font-semibold text-sm mb-1">First Name:</label>
              <input
                type="text"
                className="w-full border rounded-md px-3 py-2 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="w-1/2">
              <label className="block font-semibold text-sm mb-1">Last Name:</label>
              <input
                type="text"
                className="w-full border rounded-md px-3 py-2 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-sm mb-1">Email:</label>
            <input
              type="email"
              className="w-full border rounded-md px-3 py-2 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-sm mb-1">Pasword:</label>
            <input
              type="password"
              className="w-full border rounded-md px-3 py-2 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#1e3a8a] text-white font-semibold py-2 rounded-full mt-2 hover:bg-blue-800 transition"
          >
            Sign In
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center my-6">
          <hr className="flex-1 border-gray-300" />
          <span className="mx-3 text-sm text-gray-600">Or continue with</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        {/* Social Buttons */}
        <div className="flex justify-center space-x-4">
          <button className="flex items-center space-x-2 border rounded-md px-4 py-2 hover:bg-gray-100 transition">
            <FcGoogle size={20} />
            <span>Google</span>
          </button>

          <button className="flex items-center space-x-2 border rounded-md px-4 py-2 hover:bg-gray-100 transition">
            <FaMicrosoft size={18} color="#0078D4" />
            <span>Microsoft</span>
          </button>
        </div>
      </div>
    </div>
  );
}
