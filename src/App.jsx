import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from "react";
import React from 'react';

import LandingPage from './views/LandingPage';
import Authentification from './views/Authentification';
import Inscription from './views/Inscription';

import DashboardTeacher from './views/teacher/DashboardTeacher';
import CoursesTeacher from './views/teacher/CoursesTeacher';
import StudentsTeacher from './views/teacher/StudentsTeacher';
import SettingsTeacher from './views/teacher/SettingsTeacher';

// Composants étudiants
import DashboardStudent from './views/student/DashboardStudent';
import CoursesStudent from './views/student/CoursesStudent';
import SettingsStudent from './views/student/SettingsStudent';
import AnalyticsDashboard from './views/student/AnalyticsDashboard';

import './App.css';

function App() {

  // backend test state
  const [message, setMessage] = useState("");

  // call backend once on load
  useEffect(() => {
    fetch("/api/test")
      .then(res => res.json())
      .then(data => setMessage(data.message))
      .catch(err => console.log("Backend error:", err));
  }, []);

  return (
    <Router>
      <div className="App">

        {/* Display backend connection message */}
        {message && (
          <div style={{ background: "#eef", padding: "10px", marginBottom: "10px" }}>
            Backend message: {message}
          </div>
        )}

        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<Authentification />} />
          <Route path="/inscription" element={<Inscription />} />

          {/* Teacher routes */}
          <Route path="/teacher/dashboard" element={<DashboardTeacher />} />
          <Route path="/teacher/courses" element={<CoursesTeacher />} />
          <Route path="/teacher/students" element={<StudentsTeacher />} />
          <Route path="/teacher/settings" element={<SettingsTeacher />} />
          
            
          {/* Routes étudiants (avec StudentLayout) */}
            <Route path="student/dashboard" element={<DashboardStudent />} />
            <Route path="student/courses" element={<CoursesStudent />} />
            <Route path="student/analytics" element={<AnalyticsDashboard />} />
            <Route path="student/settings" element={<SettingsStudent />} />
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
