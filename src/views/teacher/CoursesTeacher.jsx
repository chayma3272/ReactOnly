import React, { useState } from 'react';

export default function CoursesTeacher() {
  const [courses, setCourses] = useState([
    { 
      id: 1, 
      title: 'Développement Web', 
      description: 'Apprenez les bases du développement web avec HTML, CSS et JavaScript',
      category: 'Développement',
      level: 'Débutant',
      students: 120, 
      status: 'active', 
      rating: 4.8, 
      lessons: 20, 
      completed: 15,
      price: 49.99,
      image: '/assets/web-dev.jpg',
      createdAt: '2024-01-15'
    },
    { 
      id: 2, 
      title: 'Data Science', 
      description: 'Maîtrisez Python, Pandas et les algorithmes de machine learning',
      category: 'Data Science',
      level: 'Intermédiaire',
      students: 85, 
      status: 'active', 
      rating: 4.6, 
      lessons: 18, 
      completed: 12,
      price: 79.99,
      image: '/assets/data-science.jpg',
      createdAt: '2024-02-10'
    },
    { 
      id: 3, 
      title: 'Intelligence Artificielle', 
      description: 'Découvrez les concepts fondamentaux de l\'IA et du deep learning',
      category: 'IA',
      level: 'Avancé',
      students: 95, 
      status: 'draft', 
      rating: 4.9, 
      lessons: 22, 
      completed: 0,
      price: 99.99,
      image: '/assets/ai.jpg',
      createdAt: '2024-03-05'
    },
    { 
      id: 4, 
      title: 'Marketing Digital', 
      description: 'Stratégies de marketing digital et croissance d\'audience',
      category: 'Marketing',
      level: 'Débutant',
      students: 150, 
      status: 'active', 
      rating: 4.7, 
      lessons: 16, 
      completed: 16,
      price: 39.99,
      image: '/assets/marketing.jpg',
      createdAt: '2024-01-20'
    },
  ]);

  const [filter, setFilter] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [newCourse, setNewCourse] = useState({
    title: '',
    description: '',
    category: '',
    level: 'Débutant',
    price: 0,
    lessons: 0
  });

  // Filtrer les cours
  const filteredCourses = courses.filter(course => {
    if (filter === 'all') return true;
    return course.status === filter;
  });

  // Créer un nouveau cours
  const handleCreateCourse = () => {
    const course = {
      id: courses.length + 1,
      ...newCourse,
      students: 0,
      status: 'draft',
      rating: 0,
      completed: 0,
      createdAt: new Date().toISOString().split('T')[0],
      image: '/assets/default-course.jpg'
    };
    
    setCourses([...courses, course]);
    setShowCreateModal(false);
    setNewCourse({
      title: '',
      description: '',
      category: '',
      level: 'Débutant',
      price: 0,
      lessons: 0
    });
  };

  // Éditer un cours
  const handleEditCourse = (course) => {
    setSelectedCourse({...course});
    setShowEditModal(true);
  };

  // Voir un cours
  const handleViewCourse = (course) => {
    setSelectedCourse({...course});
    setShowViewModal(true);
  };

  // Sauvegarder les modifications
  const handleSaveEdit = () => {
    if (!selectedCourse) return;
    setCourses(courses.map(course => 
      course.id === selectedCourse.id ? selectedCourse : course
    ));
    setShowEditModal(false);
    setSelectedCourse(null);
  };

  // Dupliquer un cours
  const handleDuplicateCourse = (course) => {
    const duplicatedCourse = {
      ...course,
      id: courses.length + 1,
      title: `${course.title} (Copie)`,
      students: 0,
      status: 'draft',
      createdAt: new Date().toISOString().split('T')[0]
    };
    setCourses([...courses, duplicatedCourse]);
  };

  // Archiver un cours
  const handleArchiveCourse = (courseId) => {
    setCourses(courses.map(course => 
      course.id === courseId ? { ...course, status: 'archived' } : course
    ));
  };

  // Supprimer un cours
  const handleDeleteCourse = (courseId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce cours ?')) {
      setCourses(courses.filter(course => course.id !== courseId));
    }
  };

  // Publier un cours
  const handlePublishCourse = (courseId) => {
    setCourses(courses.map(course => 
      course.id === courseId ? { ...course, status: 'active' } : course
    ));
  };

  // Statistiques
  const totalCourses = courses.length;
  const activeCourses = courses.filter(c => c.status === 'active').length;
  const totalStudents = courses.reduce((acc, c) => acc + c.students, 0);
  const averageRating = courses.length > 0 
    ? (courses.reduce((acc, c) => acc + c.rating, 0) / courses.length).toFixed(1) 
    : '0.0';

  return (
    <div>
      {/* En-tête de la section */}
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <div>
          <h1 className="h2 fw-bold">Mes Cours</h1>
          <p className="text-muted mb-0">Gérez et créez vos cours</p>
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => setShowCreateModal(true)}
        >
          <i className="bi bi-plus-circle me-2"></i>Créer un Nouveau Cours
        </button>
      </div>

      {/* Filtres */}
      <div className="d-flex gap-2 mb-4">
        <button 
          className={`btn btn-sm ${filter === 'all' ? 'btn-primary' : 'btn-outline-secondary'}`}
          onClick={() => setFilter('all')}
        >
          Tous ({courses.length})
        </button>
        <button 
          className={`btn btn-sm ${filter === 'active' ? 'btn-primary' : 'btn-outline-secondary'}`}
          onClick={() => setFilter('active')}
        >
          Actifs ({courses.filter(c => c.status === 'active').length})
        </button>
        <button 
          className={`btn btn-sm ${filter === 'draft' ? 'btn-primary' : 'btn-outline-secondary'}`}
          onClick={() => setFilter('draft')}
        >
          Brouillons ({courses.filter(c => c.status === 'draft').length})
        </button>
        <button 
          className={`btn btn-sm ${filter === 'archived' ? 'btn-primary' : 'btn-outline-secondary'}`}
          onClick={() => setFilter('archived')}
        >
          Archivés ({courses.filter(c => c.status === 'archived').length})
        </button>
      </div>

      {/* Liste des cours */}
      <div className="row g-4">
        {filteredCourses.map(course => {
          const progressPercent = course.lessons > 0 
            ? Math.round((course.completed / course.lessons) * 100) 
            : 0;
          const progressWidth = course.lessons > 0 
            ? (course.completed / course.lessons) * 100 
            : 0;
          
          return (
            <div key={course.id} className="col-md-6 col-lg-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <span className={`badge ${
                      course.status === 'active' ? 'bg-success' : 
                      course.status === 'draft' ? 'bg-secondary' : 'bg-warning'
                    }`}>
                      {course.status === 'active' ? 'Actif' : 
                       course.status === 'draft' ? 'Brouillon' : 'Archivé'}
                    </span>
                    <div className="dropdown">
                      <button 
                        className="btn btn-sm btn-light border-0" 
                        type="button" 
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i className="bi bi-three-dots-vertical"></i>
                      </button>
                      <ul className="dropdown-menu">
                        <li>
                          <button 
                            className="dropdown-item" 
                            onClick={() => handleEditCourse(course)}
                          >
                            <i className="bi bi-pencil me-2"></i>Éditer
                          </button>
                        </li>
                        <li>
                          <button 
                            className="dropdown-item" 
                            onClick={() => handleDuplicateCourse(course)}
                          >
                            <i className="bi bi-files me-2"></i>Dupliquer
                          </button>
                        </li>
                        {course.status !== 'archived' && (
                          <li>
                            <button 
                              className="dropdown-item" 
                              onClick={() => handleArchiveCourse(course.id)}
                            >
                              <i className="bi bi-archive me-2"></i>Archiver
                            </button>
                          </li>
                        )}
                        {course.status === 'draft' && (
                          <li>
                            <button 
                              className="dropdown-item" 
                              onClick={() => handlePublishCourse(course.id)}
                            >
                              <i className="bi bi-check-circle me-2"></i>Publier
                            </button>
                          </li>
                        )}
                        <li><hr className="dropdown-divider" /></li>
                        <li>
                          <button 
                            className="dropdown-item text-danger" 
                            onClick={() => handleDeleteCourse(course.id)}
                          >
                            <i className="bi bi-trash me-2"></i>Supprimer
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <h5 className="fw-bold mb-2">{course.title}</h5>
                  <p className="text-muted small mb-3">{course.description}</p>
                  
                  {/* Métadonnées du cours */}
                  <div className="mb-3">
                    <div className="d-flex justify-content-between text-muted small mb-2">
                      <span><i className="bi bi-tag me-1"></i>{course.category}</span>
                      <span><i className="bi bi-bar-chart me-1"></i>{course.level}</span>
                    </div>
                    <div className="d-flex justify-content-between text-muted small mb-2">
                      <span><i className="bi bi-people me-1"></i>{course.students} étudiants</span>
                      <span><i className="bi bi-star-fill text-warning me-1"></i>{course.rating}</span>
                    </div>
                    <div className="d-flex justify-content-between text-muted small">
                      <span><i className="bi bi-play-circle me-1"></i>{course.lessons} leçons</span>
                      <span className="fw-bold text-success">{course.price} €</span>
                    </div>
                  </div>

                  {/* Barre de progression */}
                  {course.status === 'active' && course.lessons > 0 && (
                    <div className="mb-3">
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <small className="text-muted">Progression du cours</small>
                        <small className="fw-semibold">{progressPercent}%</small>
                      </div>
                      <div className="progress" style={{height: '6px'}}>
                        <div 
                          className="progress-bar bg-primary" 
                          style={{width: `${progressWidth}%`}}
                        ></div>
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="d-flex gap-2">
                    <button 
                      className="btn btn-outline-primary btn-sm flex-grow-1"
                      onClick={() => handleViewCourse(course)}
                    >
                      <i className="bi bi-eye me-1"></i>Voir
                    </button>
                    <button 
                      className="btn btn-outline-secondary btn-sm flex-grow-1"
                      onClick={() => handleEditCourse(course)}
                    >
                      <i className="bi bi-pencil me-1"></i>Éditer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Message si aucun cours */}
      {filteredCourses.length === 0 && (
        <div className="text-center py-5">
          <i className="bi bi-journal-x display-1 text-muted"></i>
          <h4 className="mt-3 text-muted">Aucun cours trouvé</h4>
          <p className="text-muted">Créez votre premier cours pour commencer</p>
          <button 
            className="btn btn-primary"
            onClick={() => setShowCreateModal(true)}
          >
            <i className="bi bi-plus-circle me-2"></i>Créer un cours
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
              <h4 className="fw-bold text-success">{activeCourses}</h4>
              <small className="text-muted">Cours Actifs</small>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 bg-info bg-opacity-10">
            <div className="card-body text-center">
              <h4 className="fw-bold text-info">{totalStudents}</h4>
              <small className="text-muted">Total Étudiants</small>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 bg-warning bg-opacity-10">
            <div className="card-body text-center">
              <h4 className="fw-bold text-warning">{averageRating}</h4>
              <small className="text-muted">Note Moyenne</small>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de création de cours */}
      {showCreateModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Créer un nouveau cours</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowCreateModal(false)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Titre du cours</label>
                  <input 
                    type="text" 
                    className="form-control"
                    value={newCourse.title}
                    onChange={(e) => setNewCourse({...newCourse, title: e.target.value})}
                    placeholder="Ex: Développement Web Complet"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea 
                    className="form-control"
                    rows="3"
                    value={newCourse.description}
                    onChange={(e) => setNewCourse({...newCourse, description: e.target.value})}
                    placeholder="Décrivez votre cours..."
                  ></textarea>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Catégorie</label>
                    <input 
                      type="text" 
                      className="form-control"
                      value={newCourse.category}
                      onChange={(e) => setNewCourse({...newCourse, category: e.target.value})}
                      placeholder="Ex: Développement, Design..."
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Niveau</label>
                    <select 
                      className="form-select"
                      value={newCourse.level}
                      onChange={(e) => setNewCourse({...newCourse, level: e.target.value})}
                    >
                      <option value="Débutant">Débutant</option>
                      <option value="Intermédiaire">Intermédiaire</option>
                      <option value="Avancé">Avancé</option>
                    </select>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Prix (€)</label>
                    <input 
                      type="number" 
                      className="form-control"
                      value={newCourse.price}
                      onChange={(e) => setNewCourse({...newCourse, price: parseFloat(e.target.value) || 0})}
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Nombre de leçons</label>
                    <input 
                      type="number" 
                      className="form-control"
                      value={newCourse.lessons}
                      onChange={(e) => setNewCourse({...newCourse, lessons: parseInt(e.target.value) || 0})}
                      min="0"
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setShowCreateModal(false)}
                >
                  Annuler
                </button>
                <button 
                  type="button" 
                  className="btn btn-primary" 
                  onClick={handleCreateCourse}
                >
                  Créer le cours
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal d'édition de cours */}
      {showEditModal && selectedCourse && (
        <div className="modal fade show d-block" tabIndex="-1" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Éditer le cours</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowEditModal(false)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Titre du cours</label>
                  <input 
                    type="text" 
                    className="form-control"
                    value={selectedCourse.title}
                    onChange={(e) => setSelectedCourse({...selectedCourse, title: e.target.value})}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea 
                    className="form-control"
                    rows="3"
                    value={selectedCourse.description}
                    onChange={(e) => setSelectedCourse({...selectedCourse, description: e.target.value})}
                  ></textarea>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Catégorie</label>
                    <input 
                      type="text" 
                      className="form-control"
                      value={selectedCourse.category}
                      onChange={(e) => setSelectedCourse({...selectedCourse, category: e.target.value})}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Niveau</label>
                    <select 
                      className="form-select"
                      value={selectedCourse.level}
                      onChange={(e) => setSelectedCourse({...selectedCourse, level: e.target.value})}
                    >
                      <option value="Débutant">Débutant</option>
                      <option value="Intermédiaire">Intermédiaire</option>
                      <option value="Avancé">Avancé</option>
                    </select>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Prix (€)</label>
                    <input 
                      type="number" 
                      className="form-control"
                      value={selectedCourse.price}
                      onChange={(e) => setSelectedCourse({...selectedCourse, price: parseFloat(e.target.value) || 0})}
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Statut</label>
                    <select 
                      className="form-select"
                      value={selectedCourse.status}
                      onChange={(e) => setSelectedCourse({...selectedCourse, status: e.target.value})}
                    >
                      <option value="draft">Brouillon</option>
                      <option value="active">Actif</option>
                      <option value="archived">Archivé</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={() => setShowEditModal(false)}
                >
                  Annuler
                </button>
                <button 
                  type="button" 
                  className="btn btn-primary" 
                  onClick={handleSaveEdit}
                >
                  Sauvegarder
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

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
                    <h4 className="fw-bold text-primary">{selectedCourse.title}</h4>
                    <p className="text-muted mb-4">{selectedCourse.description}</p>
                    
                    <div className="row mb-4">
                      <div className="col-6">
                        <div className="card bg-light border-0">
                          <div className="card-body text-center">
                            <h5 className="fw-bold text-primary">{selectedCourse.students}</h5>
                            <small className="text-muted">Étudiants inscrits</small>
                          </div>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="card bg-light border-0">
                          <div className="card-body text-center">
                            <h5 className="fw-bold text-success">{selectedCourse.rating}/5</h5>
                            <small className="text-muted">Note moyenne</small>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h6 className="fw-semibold mb-3">Informations du cours</h6>
                      <div className="row">
                        <div className="col-6 mb-2">
                          <strong>Catégorie:</strong> {selectedCourse.category}
                        </div>
                        <div className="col-6 mb-2">
                          <strong>Niveau:</strong> {selectedCourse.level}
                        </div>
                        <div className="col-6 mb-2">
                          <strong>Prix:</strong> {selectedCourse.price} €
                        </div>
                        <div className="col-6 mb-2">
                          <strong>Leçons:</strong> {selectedCourse.lessons}
                        </div>
                        <div className="col-6 mb-2">
                          <strong>Statut:</strong> 
                          <span className={`badge ms-2 ${
                            selectedCourse.status === 'active' ? 'bg-success' : 
                            selectedCourse.status === 'draft' ? 'bg-secondary' : 'bg-warning'
                          }`}>
                            {selectedCourse.status === 'active' ? 'Actif' : 
                             selectedCourse.status === 'draft' ? 'Brouillon' : 'Archivé'}
                          </span>
                        </div>
                        <div className="col-6 mb-2">
                          <strong>Créé le:</strong> {selectedCourse.createdAt}
                        </div>
                      </div>
                    </div>

                    {/* Barre de progression détaillée */}
                    {selectedCourse.status === 'active' && selectedCourse.lessons > 0 && (
                      <div className="mb-4">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <h6 className="fw-semibold mb-0">Progression du cours</h6>
                          <span className="fw-bold text-primary">
                            {Math.round((selectedCourse.completed / selectedCourse.lessons) * 100)}%
                          </span>
                        </div>
                        <div className="progress" style={{height: '8px'}}>
                          <div 
                            className="progress-bar bg-primary" 
                            style={{width: `${(selectedCourse.completed / selectedCourse.lessons) * 100}%`}}
                          ></div>
                        </div>
                        <div className="text-center mt-1">
                          <small className="text-muted">
                            {selectedCourse.completed} sur {selectedCourse.lessons} leçons complétées
                          </small>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="col-md-4">
                    <div className="card bg-light border-0">
                      <div className="card-body">
                        <h6 className="fw-semibold mb-3">Actions rapides</h6>
                        <div className="d-grid gap-2">
                          <button 
                            className="btn btn-primary"
                            onClick={() => {
                              setShowViewModal(false);
                              handleEditCourse(selectedCourse);
                            }}
                          >
                            <i className="bi bi-pencil me-2"></i>Éditer le cours
                          </button>
                          <button 
                            className="btn btn-outline-secondary"
                            onClick={() => handleDuplicateCourse(selectedCourse)}
                          >
                            <i className="bi bi-files me-2"></i>Dupliquer
                          </button>
                          {selectedCourse.status === 'draft' && (
                            <button 
                              className="btn btn-success"
                              onClick={() => {
                                handlePublishCourse(selectedCourse.id);
                                setShowViewModal(false);
                              }}
                            >
                              <i className="bi bi-check-circle me-2"></i>Publier
                            </button>
                          )}
                          <button 
                            className="btn btn-outline-danger"
                            onClick={() => {
                              if (window.confirm('Êtes-vous sûr de vouloir supprimer ce cours ?')) {
                                handleDeleteCourse(selectedCourse.id);
                                setShowViewModal(false);
                              }
                            }}
                          >
                            <i className="bi bi-trash me-2"></i>Supprimer
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
                <button 
                  type="button" 
                  className="btn btn-primary"
                  onClick={() => {
                    setShowViewModal(false);
                    handleEditCourse(selectedCourse);
                  }}
                >
                  <i className="bi bi-pencil me-2"></i>Modifier
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}