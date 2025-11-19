import React, { useState } from 'react'
import MenuBar from '../../components/MenuBar'
import TeacherHeader from '../../components/TeacherHeader'
import CoursesTeacher from './CoursesTeacher'
import StudentsTeacher from './StudentsTeacher'
import SettingsTeacher from './SettingsTeacher'

export default function DashboardTeacher() {
  const [activeMenu, setActiveMenu] = useState('dashboard');

  // Statistiques
  const stats = [
    { icon: 'bi-book', label: 'Cours Actifs', value: '8', color: 'primary', change: '+2 ce mois' },
    { icon: 'bi-people', label: 'Étudiants', value: '342', color: 'success', change: '+15 nouveaux' },
    { icon: 'bi-clipboard-check', label: 'Devoirs', value: '24', color: 'warning', change: '12 à corriger' },
    { icon: 'bi-star', label: 'Note Moyenne', value: '4.8', color: 'info', change: '⭐ Excellent' },
  ];

  // Cours récents
  const recentCourses = [
    { id: 1, title: 'Développement Web', students: 120, progress: 75, completion: '15/20 leçons' },
    { id: 2, title: 'Data Science', students: 85, progress: 60, completion: '12/20 leçons' },
    { id: 3, title: 'Intelligence Artificielle', students: 95, progress: 45, completion: '9/20 leçons' },
  ];

  // Activités récentes
  const recentActivities = [
    { type: 'student', text: 'Ali Ben a terminé le cours "Développement Web"', time: '2h' },
    { type: 'assignment', text: 'Nouveau devoir soumis dans "Data Science"', time: '3h' },
    { type: 'question', text: 'Sara D. a posé une question', time: '5h' },
    { type: 'course', text: 'Votre cours "IA" a atteint 100 étudiants', time: '1j' },
  ];

  // Rendu du contenu selon le menu actif
  const renderContent = () => {
    switch(activeMenu) {
      case 'students':
        return <StudentsTeacher />;
      case 'courses':
        return <CoursesTeacher />;
      case 'settings':
        return <SettingsTeacher />;
      case 'analytics':
        return (
          <div className="text-center py-5">
            <i className="bi bi-bar-chart display-1 text-muted"></i>
            <h3 className="mt-3">Analytique</h3>
            <p className="text-muted">Section en cours de développement</p>
          </div>
        );
      default:
        return (
          <div>
            {/* En-tête de bienvenue */}
            <div className="mb-4">
              <h3 className="fw-bold">Bienvenue, Prof. Ahmed 👋</h3>
              <p className="text-muted">Voici un aperçu de votre activité d'enseignement</p>
            </div>

            {/* Cartes statistiques */}
            <div className="row g-3 mb-4">
              {stats.map((stat, idx) => (
                <div key={idx} className="col-md-6 col-lg-3">
                  <div className="card border-0 shadow-sm h-100">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-start mb-3">
                        <div className={`rounded-3 bg-${stat.color} bg-opacity-10 p-3`}>
                          <i className={`bi ${stat.icon} text-${stat.color} fs-4`}></i>
                        </div>
                      </div>
                      <h3 className="fw-bold mb-1">{stat.value}</h3>
                      <p className="text-muted mb-2">{stat.label}</p>
                      <small className="text-success">
                        <i className="bi bi-arrow-up"></i> {stat.change}
                      </small>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="row g-4">
              {/* Mes Cours */}
              <div className="col-lg-8">
                <div className="card border-0 shadow-sm">
                  <div className="card-header bg-white border-0 d-flex justify-content-between align-items-center py-3">
                    <h5 className="mb-0 fw-bold">Mes Cours</h5>
                    <button className="btn btn-primary btn-sm">
                      <i className="bi bi-plus-circle me-2"></i>Nouveau Cours
                    </button>
                  </div>
                  <div className="card-body">
                    {recentCourses.map(course => (
                      <div key={course.id} className="mb-4 pb-4 border-bottom">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <div>
                            <h6 className="fw-bold mb-1">{course.title}</h6>
                            <small className="text-muted">
                              <i className="bi bi-people me-1"></i>
                              {course.students} étudiants · {course.completion}
                            </small>
                          </div>
                          <div className="d-flex gap-2">
                            <button className="btn btn-sm btn-outline-primary">
                              <i className="bi bi-eye"></i>
                            </button>
                            <button className="btn btn-sm btn-outline-secondary">
                              <i className="bi bi-pencil"></i>
                            </button>
                          </div>
                        </div>
                        <div className="progress" style={{height: '8px'}}>
                          <div 
                            className="progress-bar bg-primary" 
                            style={{width: `${course.progress}%`}}
                          ></div>
                        </div>
                        <small className="text-muted">{course.progress}% complété</small>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Activités Récentes */}
              <div className="col-lg-4">
                <div className="card border-0 shadow-sm">
                  <div className="card-header bg-white border-0 py-3">
                    <h5 className="mb-0 fw-bold">Activités Récentes</h5>
                  </div>
                  <div className="card-body">
                    {recentActivities.map((activity, idx) => (
                      <div key={idx} className="d-flex gap-3 mb-3 pb-3 border-bottom">
                        <div className={`rounded-circle bg-${
                          activity.type === 'student' ? 'success' :
                          activity.type === 'assignment' ? 'warning' :
                          activity.type === 'question' ? 'info' : 'primary'
                        } bg-opacity-10 d-flex align-items-center justify-content-center flex-shrink-0`}
                        style={{width: '40px', height: '40px'}}>
                          <i className={`bi ${
                            activity.type === 'student' ? 'bi-person-check' :
                            activity.type === 'assignment' ? 'bi-file-text' :
                            activity.type === 'question' ? 'bi-question-circle' : 'bi-book'
                          }`}></i>
                        </div>
                        <div className="flex-grow-1">
                          <p className="mb-1 small">{activity.text}</p>
                          <small className="text-muted">Il y a {activity.time}</small>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="d-flex">
      {/* Menu latéral */}
      <MenuBar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
      
      {/* Contenu principal */}
      <div className="flex-grow-1" style={{ marginLeft: '280px' }}>
        <TeacherHeader />
        
        <main className="p-4" style={{ backgroundColor: '#f8f9fa', minHeight: 'calc(100vh - 70px)' }}>
          {renderContent()}
        </main>
      </div>
    </div>
  );
}