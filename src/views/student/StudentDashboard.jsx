/**
 * COMPOSANT: StudentDashboard
 * 
 * DESCRIPTION:
 * Vue d'ensemble du dashboard étudiant avec statistiques, cours en cours et activités récentes.
 * C'est la page d'accueil par défaut de l'interface étudiante.
 */

import React from 'react'

export default function StudentDashboard() {
  // Statistiques principales
  const stats = [
    { icon: 'bi-book', label: 'Cours Inscrits', value: '5', color: 'primary', change: '+1 ce mois' },
    { icon: 'bi-check-circle', label: 'Cours Complétés', value: '2', color: 'success', change: '40% complété' },
    { icon: 'bi-clock-history', label: 'Temps d\'étude', value: '24h', color: 'info', change: 'Cette semaine' },
    { icon: 'bi-trophy', label: 'Certificats', value: '2', color: 'warning', change: '🎉 Excellent' },
  ];

  // Cours en cours
  const currentCourses = [
    { id: 1, title: 'Développement Web', progress: 75, completion: '15/20 leçons', nextLesson: 'Leçon 16: React Hooks', deadline: 'Dans 3 jours' },
    { id: 2, title: 'Data Science', progress: 60, completion: '12/20 leçons', nextLesson: 'Leçon 13: Machine Learning', deadline: 'Dans 5 jours' },
    { id: 3, title: 'Intelligence Artificielle', progress: 45, completion: '9/20 leçons', nextLesson: 'Leçon 10: Neural Networks', deadline: 'Dans 7 jours' },
  ];

  // Activités récentes
  const recentActivities = [
    { type: 'completion', text: 'Vous avez terminé "Développement Web - Leçon 15"', time: '2h', icon: 'bi-check-circle-fill', color: 'success' },
    { type: 'assignment', text: 'Devoir soumis dans "Data Science"', time: '5h', icon: 'bi-file-text', color: 'primary' },
    { type: 'achievement', text: 'Nouveau badge obtenu: "Étudiant Assidu"', time: '1j', icon: 'bi-trophy-fill', color: 'warning' },
    { type: 'course', text: 'Nouveau cours disponible: "Marketing Digital"', time: '2j', icon: 'bi-book', color: 'info' },
  ];

  return (
    <div>
      {/* En-tête de bienvenue */}
      <div className="mb-4">
        <h3 className="fw-bold">Bienvenue, Ali Ben 👋</h3>
        <p className="text-muted">Voici un aperçu de votre progression d'apprentissage</p>
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
              <h5 className="mb-0 fw-bold">Mes Cours en Cours</h5>
              <button className="btn btn-success btn-sm">
                <i className="bi bi-plus-circle me-2"></i>Explorer les Cours
              </button>
            </div>
            <div className="card-body">
              {currentCourses.map(course => (
                <div key={course.id} className="mb-4 pb-4 border-bottom">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <div>
                      <h6 className="fw-bold mb-1">{course.title}</h6>
                      <small className="text-muted">
                        <i className="bi bi-play-circle me-1"></i>
                        {course.completion} · Prochaine: {course.nextLesson}
                      </small>
                      <div className="mt-1">
                        <small className="text-danger">
                          <i className="bi bi-calendar-event me-1"></i>
                          Échéance: {course.deadline}
                        </small>
                      </div>
                    </div>
                    <div className="d-flex gap-2">
                      <button className="btn btn-sm btn-outline-success">
                        <i className="bi bi-play-fill"></i>
                      </button>
                      <button className="btn btn-sm btn-outline-secondary">
                        <i className="bi bi-eye"></i>
                      </button>
                    </div>
                  </div>
                  <div className="progress" style={{height: '8px'}}>
                    <div 
                      className="progress-bar bg-success" 
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
                  <div className={`rounded-circle bg-${activity.color} bg-opacity-10 d-flex align-items-center justify-content-center flex-shrink-0`}
                  style={{width: '40px', height: '40px'}}>
                    <i className={`bi ${activity.icon} text-${activity.color}`}></i>
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


