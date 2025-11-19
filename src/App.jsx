import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './views/LandingPage';
import Authentification from './views/Authentification';
import Inscription from './views/Inscription';
import DashboardTeacher from './views/teacher/DashboardTeacher';
import CoursesTeacher from './views/teacher/CoursesTeacher';
import StudentsTeacher from './views/teacher/StudentsTeacher';
import SettingsTeacher from './views/teacher/SettingsTeacher';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Routes publiques */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<Authentification />} />
          <Route path="/inscription" element={<Inscription />} />
          
          {/* Routes enseignants */}
          <Route path="/teacher/dashboard" element={<DashboardTeacher />} />
          <Route path="/teacher/courses" element={<CoursesTeacher />} />
          <Route path="/teacher/students" element={<StudentsTeacher />} />
          <Route path="/teacher/settings" element={<SettingsTeacher />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;