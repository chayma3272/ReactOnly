/**
 * COMPOSANT: App
 * 
 * DESCRIPTION:
 * Composant racine de l'application avec configuration du routing.
 * Utilise React Router pour gérer la navigation entre les différentes pages.
 * 
 * STRUCTURE DES ROUTES:
 * - Routes publiques: Landing, Authentification, Inscription
 * - Routes enseignants: Utilisent TeacherLayout avec Outlet
 * - Routes étudiants: Utilisent StudentLayout avec Outlet
 */

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './views/LandingPage';
import Authentification from './views/Authentification';
import Inscription from './views/Inscription';

// Layouts
import TeacherLayout from './layout/TeacherLayout';
import StudentLayout from './layout/StudentLayout';

// Composants enseignants
import TeacherDashboard from './views/teacher/TeacherDashboard';
import CoursesTeacher from './views/teacher/CoursesTeacher';
import StudentsTeacher from './views/teacher/StudentsTeacher';
import SettingsTeacher from './views/teacher/SettingsTeacher';
import AnalyticsTeacher from './views/teacher/AnalyticsTeacher';

// Composants étudiants
import StudentDashboard from './views/student/StudentDashboard';
import CoursesStudent from './views/student/CoursesStudent';
import SettingsStudent from './views/student/SettingsStudent';
import AnalyticsDashboard from './views/student/AnalyticsDashboard';

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Routes publiques (sans layout) */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<Authentification />} />
          <Route path="/inscription" element={<Inscription />} />
          
          {/* Routes enseignants (avec TeacherLayout) */}
          <Route path="/teacher" element={<TeacherLayout />}>
            {/* Redirection par défaut vers dashboard */}
            <Route index element={<Navigate to="/teacher/dashboard" replace />} />
            <Route path="dashboard" element={<TeacherDashboard />} />
            <Route path="courses" element={<CoursesTeacher />} />
            <Route path="students" element={<StudentsTeacher />} />
            <Route path="analytics" element={<AnalyticsTeacher />} />
            <Route path="settings" element={<SettingsTeacher />} />
          </Route>
          
          {/* Routes étudiants (avec StudentLayout) */}
          <Route path="/student" element={<StudentLayout />}>
            {/* Redirection par défaut vers dashboard */}
            <Route index element={<Navigate to="/student/dashboard" replace />} />
            <Route path="dashboard" element={<StudentDashboard />} />
            <Route path="courses" element={<CoursesStudent />} />
            <Route path="analytics" element={<AnalyticsDashboard />} />
            <Route path="settings" element={<SettingsStudent />} />
          </Route>
          
          {/* Route 404 - Redirige vers la page d'accueil si route non trouvée */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;