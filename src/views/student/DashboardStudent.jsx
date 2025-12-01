/**
 * COMPOSANT: DashboardStudent
 * 
 * DESCRIPTION:
 * Ce composant est le tableau de bord principal de l'interface étudiante.
 * Il gère la navigation entre les différentes sections et affiche un aperçu
 * de la progression de l'étudiant.
 * 
 * ARCHITECTURE:
 * - Utilise useState pour gérer l'état du menu actif
 * - Utilise un système de navigation par onglets (tabs) sans router
 * - Affiche différents contenus selon le menu sélectionné
 * 
 * SECTIONS:
 * 1. Dashboard (par défaut): Vue d'ensemble avec statistiques, cours en cours, activités
 * 2. Courses: Liste complète des cours de l'étudiant
 * 3. Analytics: Tableau de bord analytique avec statistiques détaillées
 * 4. Settings: Paramètres du compte étudiant
 * 
 * ÉTAT (STATE):
 * - activeMenu: Détermine quelle section est actuellement affichée
 *   Valeurs possibles: 'dashboard', 'courses', 'analytics', 'settings'
 */
import React, { useState } from 'react'
import StudentMenuBar from '../../components/StudentMenuBar'
import StudentHeader from '../../components/StudentHeader'
import CoursesStudent from './CoursesStudent'
import SettingsStudent from './SettingsStudent'
import AnalyticsDashboard from './AnalyticsDashboard'


export default function DashboardStudent() {
  /**
   * ÉTAT: activeMenu
   * 
   * Gère le menu actuellement sélectionné dans la sidebar.
   * 'dashboard' est la valeur par défaut (page d'accueil).
   * 
   * Quand l'utilisateur clique sur un élément du menu:
   * - setActiveMenu() est appelé avec le nouvel ID
   * - Le composant se re-rend avec le nouveau contenu
   */
  const [activeMenu, setActiveMenu] = useState('dashboard');

  /**
   * DONNÉES: Statistiques principales
   * 
   * Tableau d'objets représentant les 4 cartes statistiques affichées en haut du dashboard.
   * Chaque objet contient:
   * - icon: Classe Bootstrap Icon pour l'icône
   * - label: Libellé de la statistique
   * - value: Valeur affichée (nombre, pourcentage, etc.)
   * - color: Couleur Bootstrap pour le style (primary, success, info, warning)
   * - change: Texte indiquant l'évolution (ex: "+1 ce mois")
   */
  const stats = [
    { icon: 'bi-book', label: 'Cours Inscrits', value: '5', color: 'primary', change: '+1 ce mois' },
    { icon: 'bi-check-circle', label: 'Cours Complétés', value: '2', color: 'success', change: '40% complété' },
    { icon: 'bi-clock-history', label: 'Temps d\'étude', value: '24h', color: 'info', change: 'Cette semaine' },
    { icon: 'bi-trophy', label: 'Certificats', value: '2', color: 'warning', change: '🎉 Excellent' },
  ];

  /**
   * DONNÉES: Cours en cours de progression
   * 
   * Liste des cours que l'étudiant suit actuellement.
   * Chaque cours contient:
   * - id: Identifiant unique
   * - title: Titre du cours
   * - progress: Pourcentage de progression (0-100)
   * - completion: Format "X/Y leçons" pour affichage
   * - nextLesson: Prochaine leçon à suivre
   * - deadline: Date limite pour terminer le cours
   */
  const currentCourses = [
    { id: 1, title: 'Développement Web', progress: 75, completion: '15/20 leçons', nextLesson: 'Leçon 16: React Hooks', deadline: 'Dans 3 jours' },
    { id: 2, title: 'Data Science', progress: 60, completion: '12/20 leçons', nextLesson: 'Leçon 13: Machine Learning', deadline: 'Dans 5 jours' },
    { id: 3, title: 'Intelligence Artificielle', progress: 45, completion: '9/20 leçons', nextLesson: 'Leçon 10: Neural Networks', deadline: 'Dans 7 jours' },
  ];

  /**
   * DONNÉES: Activités récentes
   * 
   * Liste des dernières activités de l'étudiant (feed d'activité).
   * Chaque activité contient:
   * - type: Type d'activité (completion, assignment, achievement, course)
   * - text: Description de l'activité
   * - time: Temps écoulé depuis l'activité (ex: "2h", "1j")
   * - icon: Icône Bootstrap correspondant au type
   * - color: Couleur pour l'icône et le fond
   */
  const recentActivities = [
    { type: 'completion', text: 'Vous avez terminé "Développement Web - Leçon 15"', time: '2h', icon: 'bi-check-circle-fill', color: 'success' },
    { type: 'assignment', text: 'Devoir soumis dans "Data Science"', time: '5h', icon: 'bi-file-text', color: 'primary' },
    { type: 'achievement', text: 'Nouveau badge obtenu: "Étudiant Assidu"', time: '1j', icon: 'bi-trophy-fill', color: 'warning' },
    { type: 'course', text: 'Nouveau cours disponible: "Marketing Digital"', time: '2j', icon: 'bi-book', color: 'info' },
  ];

  /**
   * FONCTION: renderContent()
   * 
   * DESCRIPTION:
   * Cette fonction détermine quel contenu afficher selon le menu sélectionné.
   * C'est le système de navigation principal du dashboard.
   * 
   * LOGIQUE:
   * - Utilise un switch statement pour router vers le bon composant
   * - Si aucun menu n'est sélectionné ou si c'est 'dashboard', affiche le contenu par défaut
   * - Sinon, affiche le composant correspondant (CoursesStudent, SettingsStudent, etc.)
   * 
   * RETOUR:
   * - Composant React correspondant au menu actif
   */
  const renderContent = () => {
    switch(activeMenu) {
      // Section "Mes Cours": Affiche la liste complète des cours
      case 'courses':
        return <CoursesStudent />;
      // Section "Paramètres": Affiche les paramètres du compte
      case 'settings':
        return <SettingsStudent />;
      // Section "Analytique": Affiche le tableau de bord analytique
      case 'analytics':
        return <AnalyticsDashboard />;
      // Par défaut: Affiche le dashboard principal avec statistiques
      default:
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
  };

  /**
   * RENDU PRINCIPAL
   * 
   * STRUCTURE:
   * 1. Menu latéral (StudentMenuBar): Barre de navigation fixe à gauche
   * 2. Zone de contenu principal: Header + contenu dynamique
   * 
   * LAYOUT:
   * - d-flex: Layout flexbox horizontal
   * - marginLeft: '280px' pour compenser la largeur du menu fixe
   * - Le contenu s'adapte dynamiquement selon activeMenu
   */
  return (
    <div className="d-flex">
      {/* 
        MENU LATÉRAL (SIDEBAR)
        - Composant StudentMenuBar avec les props activeMenu et setActiveMenu
        - Permet la navigation entre les sections
        - Position fixe, largeur 280px
      */}
      <StudentMenuBar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />
      
      {/* 
        CONTENU PRINCIPAL
        - flex-grow-1: Prend tout l'espace restant
        - marginLeft: '280px' pour laisser l'espace au menu fixe
      */}
      <div className="flex-grow-1" style={{ marginLeft: '280px' }}>
        {/* En-tête avec notifications et profil */}
        <StudentHeader />
        
        {/* 
          ZONE DE CONTENU DYNAMIQUE
          - renderContent() affiche le composant correspondant au menu actif
          - Fond gris clair pour différencier du header blanc
          - minHeight: S'assure que le contenu prend au moins la hauteur de l'écran
        */}
        <main className="p-4" style={{ backgroundColor: '#f8f9fa', minHeight: 'calc(100vh - 70px)' }}>
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

