import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navbar, Home, Listings } from "./components/Navbar";
import PropertyDetails from "./components/PropertyDetails";
import Chatbot from "./components/Chatbot";
import Auth from "./components/UserAuthentication";


const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/property/:id" element={<PropertyDetails />} />
        <Route path="/chatbot" element={<Chatbot />} />
        <Route path="/dashboard" element={<h1>Dashboard</h1>} />
        <Route path="/login" element={<Auth />} />
      </Routes>
    </Router>
  );
};

export default App;
