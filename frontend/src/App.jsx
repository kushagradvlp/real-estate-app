import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navbar, Home, Listings } from "./components/Navbar.jsx";
import PropertyDetails from "./components/PropertyDetails.jsx";
import Chatbot from "./components/Chatbot.jsx";
import Auth from "./components/UserAuthentication.jsx";
import Dashboard from "./components/Dashboard.jsx";
import './index.css'; // Your global styles, including Tailwind


const App = () => {
  return (
    <div className="h-screen w-screen flex flex-col">
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/property/:id" element={<PropertyDetails />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Auth />} />
      </Routes>
    </Router>
    </div>
  );
};

export default App;
