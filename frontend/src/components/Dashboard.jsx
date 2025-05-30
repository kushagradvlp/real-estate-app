import React from "react";
import { Link } from "react-router-dom";
import { BarChart, Home, MessageSquare, LogOut } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="flex h-screen w-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md p-6 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Dashboard</h2>
          <nav className="space-y-4">
            <Link to="/" className="flex items-center space-x-3 text-gray-700 hover:text-blue-600">
              <Home size={20} />
              <span>Home</span>
            </Link>
            <Link to="/listings" className="flex items-center space-x-3 text-gray-700 hover:text-blue-600">
              <BarChart size={20} />
              <span>Listings</span>
            </Link>
            <Link to="/chatbot" className="flex items-center space-x-3 text-gray-700 hover:text-blue-600">
              <MessageSquare size={20} />
              <span>Chatbot</span>
            </Link>
          </nav>
        </div>
        <button className="flex items-center space-x-3 text-red-600 hover:text-red-800">
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-10">
        <h1 className="text-4xl font-bold text-gray-800">Welcome to Your Dashboard</h1>
        <p className="text-lg text-gray-600 mt-2">Manage your listings, chat with users, and explore insights.</p>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-3 gap-6 mt-8">
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h2 className="text-xl font-semibold text-gray-700">Total Listings</h2>
            <p className="text-3xl font-bold text-blue-600 mt-2">15</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h2 className="text-xl font-semibold text-gray-700">Messages</h2>
            <p className="text-3xl font-bold text-blue-600 mt-2">28</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md text-center">
            <h2 className="text-xl font-semibold text-gray-700">Users</h2>
            <p className="text-3xl font-bold text-blue-600 mt-2">120</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
