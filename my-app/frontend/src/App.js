// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Section from "./components/Section";
import Footer from "./components/footer";
import Calendar from "./components/Calendar";
import "./App.css";
import Signup from "./components/Signup";
import Meeting from "./components/Meeting";
import Login from "./components/Login";
import Meetings from "./components/Meetings";
import About from "./components/About";

import { UserProvider } from './components/UserContext';


function App() {
  return (
    <UserProvider>
    <Router>
      <>
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Section />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/meeting" element={<Meeting />} />
            <Route path="/login" element={<Login />} />
            <Route path="/meetings" element={<Meetings/>} />
            <Route path="/about" element={<About/>} />
          </Routes>
        </div>
        <Footer />
      </>
    </Router>
    </UserProvider>

  );
}

export default App;
