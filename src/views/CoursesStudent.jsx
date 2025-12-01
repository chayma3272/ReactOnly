/**
 * COMPOSANT: CoursesStudent
 * 
 * DESCRIPTION:
 * Ce composant affiche la liste complète des cours de l'étudiant.
 * Il permet de voir tous les cours (en cours, complétés) avec leurs détails.
 * 
 * FONCTIONNALITÉS:
 * - Affichage de tous les cours avec cartes visuelles
 * - Filtrage par statut (Tous, En Cours, Complétés)
 * - Modal de détails pour chaque cours
 * - Statistiques globales (total, complétés, en cours, progression moyenne)
 * 
 * ÉTATS (STATE):
 * - courses: Liste de tous les cours de l'étudiant
 * - filter: Filtre actif ('all', 'en cours', 'complété')
 * - showViewModal: Contrôle l'affichage du modal de détails
 * - selectedCourse: Cours actuellement sélectionné pour voir les détails
 */

import React, { useState } from 'react';

export default function CoursesStudent() {
  /**
   * ÉTAT: courses
   * 
   * Liste de tous les cours de l'étudiant avec leurs informations complètes.
   * Chaque cours contient:
   * - id: Identifiant unique
   * - title: Titre du cours
   * - description: Description du cours
   * - category: Catégorie (Développement, Data Science, etc.)
   * - level: Niveau (Débutant, Intermédiaire, Avancé)
   * - progress: Pourcentage de progression (0-100)
   * - status: Statut ('en cours' ou 'complété')
   * - rating: Note moyenne du cours (sur 5)
   * - lessons: Nombre total de leçons
   * - completed: Nombre de leçons complétées
   * - instructor: Nom de l'instructeur
   * - enrolledDate: Date d'inscription
   * - lastAccessed: Dernière visite
   * - certificate: Boolean indiquant si un certificat est disponible
   */
  const [courses, setCourses] = useState([
    { 
      id: 1, 
      title: 'Développement Web', 
      description: 'Apprenez les bases du développement web avec HTML, CSS et JavaScript',
      category: 'Développement',
      level: 'Débutant',
      progress: 75, 
      status: 'en cours', 
      rating: 4.8, 
      lessons: 20, 
      completed: 15,
      instructor: 'Prof. Ahmed',
      enrolledDate: '2024-01-15',
      lastAccessed: 'Il y a 2h'
    },
    { 
      id: 2, 
      title: 'Data Science', 
      description: 'Maîtrisez Python, Pandas et les algorithmes de machine learning',
      category: 'Data Science',
      level: 'Intermédiaire',
      progress: 60, 
      status: 'en cours', 
      rating: 4.6, 
      lessons: 18, 
      completed: 12,
      instructor: 'Prof. Sara',
      enrolledDate: '2024-02-10',
      lastAccessed: 'Il y a 1j'
    },
    { 
      id: 3, 
      title: 'Intelligence Artificielle', 
      description: 'Découvrez les concepts fondamentaux de l\'IA et du deep learning',
      category: 'IA',
      level: 'Avancé',
      progress: 45, 
      status: 'en cours', 
      rating: 4.9, 
      lessons: 22, 
      completed: 9,
      instructor: 'Prof. Mohamed',
      enrolledDate: '2024-03-05',
      lastAccessed: 'Il y a 3j'
    },
    { 
      id: 4, 
      title: 'Marketing Digital', 
      description: 'Stratégies de marketing digital et croissance d\'audience',
      category: 'Marketing',
      level: 'Débutant',
      progress: 100, 
      status: 'complété', 
      rating: 4.7, 
      lessons: 16, 
      completed: 16,
      instructor: 'Prof. Leila',
      enrolledDate: '2024-01-20',
      lastAccessed: 'Il y a 1 semaine',
      certificate: true
    },
    { 
      id: 5, 
      title: 'Design UI/UX', 
      description: 'Créez des interfaces utilisateur magnifiques et intuitives',
      category: 'Design',
      level: 'Intermédiaire',
      progress: 100, 
      status: 'complété', 
      rating: 4.9, 
      lessons: 14, 
      completed: 14,
      instructor: 'Prof. Yasmine',
      enrolledDate: '2023-12-10',
      lastAccessed: 'Il y a 2 semaines',
      certificate: true
    },
  ]);

  /**
   * ÉTAT: filter
   * 
   * Détermine quel filtre est actif pour afficher les cours.
   * Valeurs possibles: 'all', 'en cours', 'complété'
   */
  const [filter, setFilter] = useState('all');
  
  /**
   * ÉTAT: showViewModal
   * 
   * Contrôle si le modal de détails du cours est affiché ou non.
   * true = modal visible, false = modal caché
   */
  const [showViewModal, setShowViewModal] = useState(false);
  
  /**
   * ÉTAT: selectedCourse
   * 
   * Stocke le cours actuellement sélectionné pour afficher ses détails.
   * null si aucun cours n'est sélectionné.
   */
  const [selectedCourse, setSelectedCourse] = useState(null);

  /**
   * FONCTION: filteredCourses
   * 
   * DESCRIPTION:
   * Filtre la liste des cours selon le filtre actif.
   * 
   * LOGIQUE:
   * - Si filter === 'all': retourne tous les cours
   * - Sinon: retourne uniquement les cours dont le statut correspond au filtre
   * 
   * RETOUR:
   * - Tableau de cours filtrés
   */
  const filteredCourses = courses.filter(course => {
    if (filter === 'all') return true;
    return course.status === filter;
  });

  /**
   * FONCTION: handleViewCourse
   * 
   * DESCRIPTION:
   * Gère l'ouverture du modal de détails d'un cours.
   * 
   * PARAMÈTRES:
   * - course: L'objet cours à afficher dans le modal
   * 
   * ACTIONS:
   * 1. Stocke le cours sélectionné dans selectedCourse
   * 2. Ouvre le modal en mettant showViewModal à true
   */
  const handleViewCourse = (course) => {
    setSelectedCourse({...course});
    setShowViewModal(true);
  };

  /**
   * CALCULS: Statistiques globales
   * 
   * Ces valeurs sont calculées à partir de la liste des cours:
   * - totalCourses: Nombre total de cours
   * - completedCourses: Nombre de cours complétés
   * - inProgressCourses: Nombre de cours en cours
   * - averageProgress: Progression moyenne de tous les cours (en pourcentage)
   */
  const totalCourses = courses.length;
  const completedCourses = courses.filter(c => c.status === 'complété').length;
  const inProgressCourses = courses.filter(c => c.status === 'en cours').length;
  const averageProgress = courses.length > 0 
    ? Math.round(courses.reduce((acc, c) => acc + c.progress, 0) / courses.length)
    : 0;

  return (
    <div>
      {/* En-tête de la section */}
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <div>
          <h1 className="h2 fw-bold">Mes Cours</h1>
          <p className="text-muted mb-0">Continuez votre apprentissage</p>
        </div>
        <button className="btn btn-success">
          <i className="bi bi-search me-2"></i>Explorer les Cours
        </button>
      </div>

      {/* Filtres */}
      <div className="d-flex gap-2 mb-4">
        <button 
          className={`btn btn-sm ${filter === 'all' ? 'btn-success' : 'btn-outline-secondary'}`}
          onClick={() => setFilter('all')}
        >
          Tous ({courses.length})
        </button>
        <button 
          className={`btn btn-sm ${filter === 'en cours' ? 'btn-success' : 'btn-outline-secondary'}`}
          onClick={() => setFilter('en cours')}
        >
          En Cours ({courses.filter(c => c.status === 'en cours').length})
        </button>
        <button 
          className={`btn btn-sm ${filter === 'complété' ? 'btn-success' : 'btn-outline-secondary'}`}
          onClick={() => setFilter('complété')}
        >
          Complétés ({courses.filter(c => c.status === 'complété').length})
        </button>
      </div>

      {/* Liste des cours */}
      <div className="row g-4">
        {filteredCourses.map(course => (
          <div key={course.id} className="col-md-6 col-lg-4">
            <div className="card border-0 shadow-sm h-100">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <span className={`badge ${
                    course.status === 'complété' ? 'bg-success' : 
                    course.status === 'en cours' ? 'bg-primary' : 'bg-secondary'
                  }`}>
                    {course.status === 'complété' ? 'Complété' : 
                     course.status === 'en cours' ? 'En Cours' : 'Non commencé'}
                  </span>
                  {course.certificate && (
                    <span className="badge bg-warning">
                      <i className="bi bi-trophy me-1"></i>Certifié
                    </span>
                  )}
                </div>

                <h5 className="fw-bold mb-2">{course.title}</h5>
                <p className="text-muted small mb-3">{course.description}</p>
                
                {/* Métadonnées du cours */}
                <div className="mb-3">
                  <div className="d-flex justify-content-between text-muted small mb-2">
                    <span><i className="bi bi-person me-1"></i>{course.instructor}</span>
                    <span><i className="bi bi-star-fill text-warning me-1"></i>{course.rating}</span>
                  </div>
                  <div className="d-flex justify-content-between text-muted small mb-2">
                    <span><i className="bi bi-tag me-1"></i>{course.category}</span>
                    <span><i className="bi bi-bar-chart me-1"></i>{course.level}</span>
                  </div>
                  <div className="d-flex justify-content-between text-muted small">
                    <span><i className="bi bi-play-circle me-1"></i>{course.completed}/{course.lessons} leçons</span>
                    <span><i className="bi bi-clock me-1"></i>{course.lastAccessed}</span>
                  </div>
                </div>

                {/* Barre de progression */}
                <div className="mb-3">
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <small className="text-muted">Progression</small>
                    <small className="fw-semibold">{course.progress}%</small>
                  </div>
                  <div className="progress" style={{height: '6px'}}>
                    <div 
                      className={`progress-bar ${
                        course.progress === 100 ? 'bg-success' : 'bg-primary'
                      }`} 
                      style={{width: `${course.progress}%`}}
                    ></div>
                  </div>
                </div>

                {/* Actions */}
                <div className="d-flex gap-2">
                  {course.status === 'en cours' ? (
                    <button 
                      className="btn btn-success btn-sm flex-grow-1"
                      onClick={() => handleViewCourse(course)}
                    >
                      <i className="bi bi-play-fill me-1"></i>Continuer
                    </button>
                  ) : (
                    <button 
                      className="btn btn-outline-success btn-sm flex-grow-1"
                      onClick={() => handleViewCourse(course)}
                    >
                      <i className="bi bi-eye me-1"></i>Revoir
                    </button>
                  )}
                  <button 
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => handleViewCourse(course)}
                  >
                    <i className="bi bi-info-circle"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Message si aucun cours */}
      {filteredCourses.length === 0 && (
        <div className="text-center py-5">
          <i className="bi bi-journal-x display-1 text-muted"></i>
          <h4 className="mt-3 text-muted">Aucun cours trouvé</h4>
          <p className="text-muted">Explorez notre catalogue pour trouver des cours intéressants</p>
          <button className="btn btn-success">
            <i className="bi bi-search me-2"></i>Explorer les Cours
          </button>
        </div>
      )}

      {/* Statistiques globales */}
      <div className="row g-3 mt-4">
        <div className="col-md-3">
          <div className="card border-0 bg-primary bg-opacity-10">
            <div className="card-body text-center">
              <h4 className="fw-bold text-primary">{totalCourses}</h4>
              <small className="text-muted">Total Cours</small>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 bg-success bg-opacity-10">
            <div className="card-body text-center">
              <h4 className="fw-bold text-success">{completedCourses}</h4>
              <small className="text-muted">Cours Complétés</small>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 bg-info bg-opacity-10">
            <div className="card-body text-center">
              <h4 className="fw-bold text-info">{inProgressCourses}</h4>
              <small className="text-muted">En Cours</small>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 bg-warning bg-opacity-10">
            <div className="card-body text-center">
              <h4 className="fw-bold text-warning">{averageProgress}%</h4>
              <small className="text-muted">Progression Moyenne</small>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de visualisation du cours */}
      {showViewModal && selectedCourse && (
        <div className="modal fade show d-block" tabIndex="-1" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Détails du cours</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowViewModal(false)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-8">
                    <h4 className="fw-bold text-success">{selectedCourse.title}</h4>
                    <p className="text-muted mb-4">{selectedCourse.description}</p>
                    
                    <div className="row mb-4">
                      <div className="col-6">
                        <div className="card bg-light border-0">
                          <div className="card-body text-center">
                            <h5 className="fw-bold text-primary">{selectedCourse.completed}/{selectedCourse.lessons}</h5>
                            <small className="text-muted">Leçons complétées</small>
                          </div>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="card bg-light border-0">
                          <div className="card-body text-center">
                            <h5 className="fw-bold text-success">{selectedCourse.progress}%</h5>
                            <small className="text-muted">Progression</small>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h6 className="fw-semibold mb-3">Informations du cours</h6>
                      <div className="row">
                        <div className="col-6 mb-2">
                          <strong>Instructeur:</strong> {selectedCourse.instructor}
                        </div>
                        <div className="col-6 mb-2">
                          <strong>Catégorie:</strong> {selectedCourse.category}
                        </div>
                        <div className="col-6 mb-2">
                          <strong>Niveau:</strong> {selectedCourse.level}
                        </div>
                        <div className="col-6 mb-2">
                          <strong>Note:</strong> 
                          <span className="ms-2">
                            <i className="bi bi-star-fill text-warning"></i> {selectedCourse.rating}/5
                          </span>
                        </div>
                        <div className="col-6 mb-2">
                          <strong>Inscrit le:</strong> {selectedCourse.enrolledDate}
                        </div>
                        <div className="col-6 mb-2">
                          <strong>Dernière visite:</strong> {selectedCourse.lastAccessed}
                        </div>
                      </div>
                    </div>

                    {/* Barre de progression détaillée */}
                    <div className="mb-4">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <h6 className="fw-semibold mb-0">Progression du cours</h6>
                        <span className="fw-bold text-success">{selectedCourse.progress}%</span>
                      </div>
                      <div className="progress" style={{height: '8px'}}>
                        <div 
                          className={`progress-bar ${
                            selectedCourse.progress === 100 ? 'bg-success' : 'bg-primary'
                          }`} 
                          style={{width: `${selectedCourse.progress}%`}}
                        ></div>
                      </div>
                      <div className="text-center mt-1">
                        <small className="text-muted">
                          {selectedCourse.completed} sur {selectedCourse.lessons} leçons complétées
                        </small>
                      </div>
                    </div>
                  </div>
                  
                  <div className="col-md-4">
                    <div className="card bg-light border-0">
                      <div className="card-body">
                        <h6 className="fw-semibold mb-3">Actions</h6>
                        <div className="d-grid gap-2">
                          {selectedCourse.status === 'en cours' ? (
                            <button className="btn btn-success">
                              <i className="bi bi-play-fill me-2"></i>Continuer le cours
                            </button>
                          ) : (
                            <button className="btn btn-outline-success">
                              <i className="bi bi-eye me-2"></i>Revoir le cours
                            </button>
                          )}
                          {selectedCourse.certificate && (
                            <button className="btn btn-warning">
                              <i className="bi bi-trophy me-2"></i>Télécharger le certificat
                            </button>
                          )}
                          <button className="btn btn-outline-secondary">
                            <i className="bi bi-download me-2"></i>Télécharger les ressources
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setShowViewModal(false)}
                >
                  Fermer
                </button>
                {selectedCourse.status === 'en cours' && (
                  <button className="btn btn-success">
                    <i className="bi bi-play-fill me-2"></i>Continuer
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

