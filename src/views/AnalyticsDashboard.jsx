/**
 * COMPOSANT: AnalyticsDashboard
 * 
 * DESCRIPTION:
 * Ce composant affiche un tableau de bord analytique complet pour les enseignants.
 * Il présente des statistiques sur la présence, l'efficacité des cours et les feedbacks.
 * 
 * SECTIONS (Onglets):
 * 1. Taux de Présence: Statistiques de présence par cours avec tendances
 * 2. Efficacité des Cours: Taux de complétion, scores moyens, satisfaction
 * 3. Feedback des Étudiants: Commentaires et notes des étudiants par cours
 * 
 * STATISTIQUES GLOBALES:
 * - Taux de présence moyen
 * - Taux de complétion moyen
 * - Satisfaction moyenne
 * - Total d'étudiants
 * 
 * ÉTATS (STATE):
 * - selectedCourse: Cours sélectionné pour voir les détails (non utilisé actuellement)
 * - activeTab: Onglet actuellement affiché ('attendance', 'effectiveness', 'feedback')
 */

import React, { useState } from 'react'

export default function AnalyticsDashboard() {
  /**
   * DONNÉES: attendanceData
   * 
   * Statistiques de présence par cours.
   * Chaque objet contient:
   * - course: Nom du cours
   * - totalSessions: Nombre total de sessions
   * - attended: Nombre de sessions assistées
   * - rate: Taux de présence en pourcentage
   * - trend: Tendance ('up', 'down', 'stable')
   */
  const attendanceData = [
    { course: 'Développement Web', totalSessions: 20, attended: 18, rate: 90, trend: 'up' },
    { course: 'Data Science', totalSessions: 18, attended: 15, rate: 83, trend: 'up' },
    { course: 'Intelligence Artificielle', totalSessions: 22, attended: 19, rate: 86, trend: 'stable' },
    { course: 'Marketing Digital', totalSessions: 16, attended: 16, rate: 100, trend: 'up' },
    { course: 'Design UI/UX', totalSessions: 14, attended: 14, rate: 100, trend: 'stable' },
  ];

  /**
   * DONNÉES: courseEffectiveness
   * 
   * Statistiques d'efficacité par cours.
   * Chaque objet contient:
   * - course: Nom du cours
   * - completionRate: Taux de complétion en pourcentage
   * - avgScore: Score moyen des étudiants
   * - satisfaction: Note de satisfaction (sur 5)
   * - students: Nombre d'étudiants inscrits
   */
  const courseEffectiveness = [
    { course: 'Développement Web', completionRate: 75, avgScore: 88, satisfaction: 4.8, students: 120 },
    { course: 'Data Science', completionRate: 60, avgScore: 85, satisfaction: 4.6, students: 85 },
    { course: 'Intelligence Artificielle', completionRate: 45, avgScore: 82, satisfaction: 4.9, students: 95 },
    { course: 'Marketing Digital', completionRate: 100, avgScore: 92, satisfaction: 4.7, students: 150 },
    { course: 'Design UI/UX', completionRate: 100, avgScore: 94, satisfaction: 4.9, students: 110 },
  ];

  /**
   * DONNÉES: studentFeedback
   * 
   * Commentaires et notes des étudiants par cours.
   * Structure:
   * - course: Nom du cours
   * - rating: Note moyenne du cours (sur 5)
   * - comments: Tableau de commentaires individuels
   *   Chaque commentaire contient:
   *   - student: Nom de l'étudiant
   *   - text: Texte du commentaire
   *   - date: Date du commentaire
   *   - rating: Note individuelle (sur 5)
   */
  const studentFeedback = [
    { 
      course: 'Développement Web', 
      rating: 4.8, 
      comments: [
        { student: 'Sara D.', text: 'Excellent cours, très bien expliqué!', date: 'Il y a 2 jours', rating: 5 },
        { student: 'Mohamed K.', text: 'Le contenu est complet et pratique.', date: 'Il y a 5 jours', rating: 5 },
        { student: 'Leila M.', text: 'J\'ai beaucoup appris, merci!', date: 'Il y a 1 semaine', rating: 4 },
      ]
    },
    { 
      course: 'Data Science', 
      rating: 4.6, 
      comments: [
        { student: 'Yasmine B.', text: 'Très bon cours sur le machine learning.', date: 'Il y a 3 jours', rating: 5 },
        { student: 'Ahmed T.', text: 'Les exercices sont pertinents.', date: 'Il y a 1 semaine', rating: 4 },
      ]
    },
    { 
      course: 'Intelligence Artificielle', 
      rating: 4.9, 
      comments: [
        { student: 'Omar S.', text: 'Le meilleur cours que j\'ai suivi!', date: 'Il y a 1 jour', rating: 5 },
        { student: 'Fatma H.', text: 'Explications claires et détaillées.', date: 'Il y a 4 jours', rating: 5 },
      ]
    },
  ];

  /**
   * CALCULS: Statistiques globales
   * 
   * Ces statistiques sont calculées à partir des données ci-dessus:
   * - averageAttendance: Moyenne des taux de présence de tous les cours
   * - averageCompletion: Moyenne des taux de complétion
   * - averageSatisfaction: Moyenne des notes de satisfaction
   * - totalStudents: Somme de tous les étudiants de tous les cours
   * 
   * MÉTHODES UTILISÉES:
   * - reduce(): Additionne toutes les valeurs
   * - Math.round(): Arrondit à l'entier le plus proche
   * - toFixed(1): Arrondit à 1 décimale pour la satisfaction
   */
  const overallStats = {
    averageAttendance: Math.round(attendanceData.reduce((acc, c) => acc + c.rate, 0) / attendanceData.length),
    averageCompletion: Math.round(courseEffectiveness.reduce((acc, c) => acc + c.completionRate, 0) / courseEffectiveness.length),
    averageSatisfaction: (courseEffectiveness.reduce((acc, c) => acc + c.satisfaction, 0) / courseEffectiveness.length).toFixed(1),
    totalStudents: courseEffectiveness.reduce((acc, c) => acc + c.students, 0),
  };

  /**
   * ÉTAT: selectedCourse
   * 
   * Stocke le cours sélectionné pour voir les détails (non utilisé actuellement).
   */
  const [selectedCourse, setSelectedCourse] = useState(null);
  
  /**
   * ÉTAT: activeTab
   * 
   * Détermine quel onglet est actuellement affiché.
   * Valeurs possibles: 'attendance', 'effectiveness', 'feedback'
   * Par défaut: 'attendance' (Taux de Présence)
   */
  const [activeTab, setActiveTab] = useState('attendance');

  return (
    <div>
      {/* En-tête */}
      <div className="mb-4">
        <h3 className="fw-bold">Tableau de Bord Analytique</h3>
        <p className="text-muted">Analysez les performances et l'efficacité de vos cours</p>
      </div>

      {/* Statistiques globales */}
      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div className="rounded-3 bg-primary bg-opacity-10 p-3">
                  <i className="bi bi-person-check text-primary fs-4"></i>
                </div>
              </div>
              <h3 className="fw-bold mb-1">{overallStats.averageAttendance}%</h3>
              <p className="text-muted mb-2">Taux de Présence Moyen</p>
              <small className="text-success">
                <i className="bi bi-arrow-up"></i> +5% ce mois
              </small>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div className="rounded-3 bg-success bg-opacity-10 p-3">
                  <i className="bi bi-check-circle text-success fs-4"></i>
                </div>
              </div>
              <h3 className="fw-bold mb-1">{overallStats.averageCompletion}%</h3>
              <p className="text-muted mb-2">Taux de Complétion Moyen</p>
              <small className="text-success">
                <i className="bi bi-arrow-up"></i> +3% ce mois
              </small>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div className="rounded-3 bg-warning bg-opacity-10 p-3">
                  <i className="bi bi-star text-warning fs-4"></i>
                </div>
              </div>
              <h3 className="fw-bold mb-1">{overallStats.averageSatisfaction}</h3>
              <p className="text-muted mb-2">Satisfaction Moyenne</p>
              <small className="text-success">
                <i className="bi bi-arrow-up"></i> Excellent
              </small>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div className="rounded-3 bg-info bg-opacity-10 p-3">
                  <i className="bi bi-people text-info fs-4"></i>
                </div>
              </div>
              <h3 className="fw-bold mb-1">{overallStats.totalStudents}</h3>
              <p className="text-muted mb-2">Total Étudiants</p>
              <small className="text-success">
                <i className="bi bi-arrow-up"></i> +25 nouveaux
              </small>
            </div>
          </div>
        </div>
      </div>

      {/* Onglets */}
      <div className="card border-0 shadow-sm mb-4">
        <div className="card-header bg-white border-0">
          <ul className="nav nav-tabs border-0">
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'attendance' ? 'active' : ''}`}
                onClick={() => setActiveTab('attendance')}
              >
                <i className="bi bi-person-check me-2"></i>Taux de Présence
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'effectiveness' ? 'active' : ''}`}
                onClick={() => setActiveTab('effectiveness')}
              >
                <i className="bi bi-graph-up me-2"></i>Efficacité des Cours
              </button>
            </li>
            <li className="nav-item">
              <button 
                className={`nav-link ${activeTab === 'feedback' ? 'active' : ''}`}
                onClick={() => setActiveTab('feedback')}
              >
                <i className="bi bi-chat-dots me-2"></i>Feedback des Étudiants
              </button>
            </li>
          </ul>
        </div>
        <div className="card-body">
          {/* Onglet Taux de Présence */}
          {activeTab === 'attendance' && (
            <div>
              <h5 className="fw-bold mb-4">Taux de Présence par Cours</h5>
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead className="bg-light">
                    <tr>
                      <th>Cours</th>
                      <th>Sessions Total</th>
                      <th>Présences</th>
                      <th>Taux de Présence</th>
                      <th>Tendance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendanceData.map((course, idx) => (
                      <tr key={idx}>
                        <td className="fw-semibold">{course.course}</td>
                        <td>{course.totalSessions}</td>
                        <td>{course.attended}</td>
                        <td>
                          <div className="d-flex align-items-center gap-2">
                            <div className="progress" style={{width: '100px', height: '8px'}}>
                              <div 
                                className={`progress-bar ${
                                  course.rate >= 90 ? 'bg-success' : 
                                  course.rate >= 70 ? 'bg-warning' : 'bg-danger'
                                }`}
                                style={{width: `${course.rate}%`}}
                              ></div>
                            </div>
                            <span className="fw-semibold">{course.rate}%</span>
                          </div>
                        </td>
                        <td>
                          <span className={`badge ${
                            course.trend === 'up' ? 'bg-success' : 
                            course.trend === 'down' ? 'bg-danger' : 'bg-secondary'
                          }`}>
                            <i className={`bi bi-arrow-${course.trend === 'up' ? 'up' : course.trend === 'down' ? 'down' : 'minus'}`}></i>
                            {course.trend === 'up' ? 'En hausse' : course.trend === 'down' ? 'En baisse' : 'Stable'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Onglet Efficacité des Cours */}
          {activeTab === 'effectiveness' && (
            <div>
              <h5 className="fw-bold mb-4">Efficacité des Cours</h5>
              <div className="row g-4">
                {courseEffectiveness.map((course, idx) => (
                  <div key={idx} className="col-md-6">
                    <div className="card border-0 shadow-sm h-100">
                      <div className="card-body">
                        <h6 className="fw-bold mb-3">{course.course}</h6>
                        
                        <div className="mb-3">
                          <div className="d-flex justify-content-between mb-2">
                            <small className="text-muted">Taux de complétion</small>
                            <small className="fw-semibold">{course.completionRate}%</small>
                          </div>
                          <div className="progress" style={{height: '8px'}}>
                            <div 
                              className={`progress-bar ${
                                course.completionRate >= 80 ? 'bg-success' : 
                                course.completionRate >= 60 ? 'bg-warning' : 'bg-danger'
                              }`}
                              style={{width: `${course.completionRate}%`}}
                            ></div>
                          </div>
                        </div>

                        <div className="mb-3">
                          <div className="d-flex justify-content-between mb-2">
                            <small className="text-muted">Score moyen</small>
                            <small className="fw-semibold">{course.avgScore}%</small>
                          </div>
                          <div className="progress" style={{height: '8px'}}>
                            <div 
                              className={`progress-bar ${
                                course.avgScore >= 85 ? 'bg-success' : 
                                course.avgScore >= 70 ? 'bg-warning' : 'bg-danger'
                              }`}
                              style={{width: `${course.avgScore}%`}}
                            ></div>
                          </div>
                        </div>

                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <small className="text-muted">Satisfaction</small>
                          <div>
                            <i className="bi bi-star-fill text-warning"></i>
                            <span className="fw-semibold ms-1">{course.satisfaction}/5</span>
                          </div>
                        </div>

                        <div className="d-flex justify-content-between align-items-center">
                          <small className="text-muted">Étudiants</small>
                          <span className="badge bg-primary">{course.students} étudiants</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Onglet Feedback des Étudiants */}
          {activeTab === 'feedback' && (
            <div>
              <h5 className="fw-bold mb-4">Feedback des Étudiants</h5>
              {studentFeedback.map((course, idx) => (
                <div key={idx} className="card border-0 shadow-sm mb-4">
                  <div className="card-header bg-white border-0 py-3">
                    <div className="d-flex justify-content-between align-items-center">
                      <h6 className="mb-0 fw-bold">{course.course}</h6>
                      <div>
                        <i className="bi bi-star-fill text-warning"></i>
                        <span className="fw-semibold ms-1">{course.rating}/5</span>
                      </div>
                    </div>
                  </div>
                  <div className="card-body">
                    {course.comments.map((comment, commentIdx) => (
                      <div key={commentIdx} className="mb-3 pb-3 border-bottom">
                        <div className="d-flex justify-content-between align-items-start mb-2">
                          <div className="d-flex align-items-center gap-2">
                            <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold" 
                                 style={{width: '35px', height: '35px', fontSize: '0.85rem'}}>
                              {comment.student.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <div className="fw-semibold small">{comment.student}</div>
                              <small className="text-muted">{comment.date}</small>
                            </div>
                          </div>
                          <div>
                            {[...Array(5)].map((_, i) => (
                              <i 
                                key={i} 
                                className={`bi bi-star-fill ${i < comment.rating ? 'text-warning' : 'text-muted'}`}
                                style={{fontSize: '0.85rem'}}
                              ></i>
                            ))}
                          </div>
                        </div>
                        <p className="mb-0 small">{comment.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}



