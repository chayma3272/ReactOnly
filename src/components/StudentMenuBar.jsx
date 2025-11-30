/**
 * COMPOSANT: StudentMenuBar
 * 
 * DESCRIPTION:
 * Ce composant représente la barre de menu latérale (sidebar) de l'interface étudiante.
 * Il permet la navigation entre les différentes sections de l'application.
 * 
 * PROPS:
 * - activeMenu: L'ID du menu actuellement actif (ex: 'dashboard', 'courses', etc.)
 * - setActiveMenu: Fonction pour changer le menu actif
 * 
 * FONCTIONNALITÉS:
 * - Menu de navigation avec 4 sections principales
 * - Indication visuelle du menu actif (surbrillance)
 * - Logo et titre de l'application en haut
 * - Section profil utilisateur en bas avec bouton de déconnexion
 * 
 * NAVIGATION:
 * - Tableau de bord: Vue d'ensemble de la progression
 * - Mes Cours: Liste des cours de l'étudiant
 * - Analytique: Statistiques et analyses
 * - Paramètres: Configuration du compte
 */

/**
 * COMPOSANT: StudentMenuBar
 * 
 * DESCRIPTION:
 * Barre de menu latérale utilisant React Router pour la navigation.
 * Utilise Link et useLocation pour gérer la navigation et l'état actif.
 */

import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function StudentMenuBar() {
  /**
   * Configuration des éléments du menu avec leurs routes correspondantes
   * Chaque élément contient:
   * - path: Route React Router
   * - icon: Classe Bootstrap Icon pour l'icône
   * - label: Texte affiché dans le menu
   */
  const menuItems = [
    { path: '/student/dashboard', icon: 'bi-speedometer2', label: 'Tableau de bord' },
    { path: '/student/courses', icon: 'bi-book-half', label: 'Mes Cours' },
    { path: '/student/analytics', icon: 'bi-bar-chart', label: 'Analytique' },
    { path: '/student/settings', icon: 'bi-gear', label: 'Paramètres' },
  ];

  // useLocation pour détecter la route actuelle et mettre en surbrillance le menu actif
  const location = useLocation();

  return (
    // Barre latérale fixe avec fond vert (bg-success) pour différencier l'interface étudiante
    // width: 280px = largeur fixe, position: fixed = reste visible lors du scroll
    <div 
      className="bg-success text-white d-flex flex-column" 
      style={{ width: '280px', minHeight: '100vh', position: 'fixed', left: 0, top: 0 }}
    >
      <div className="p-4">
        {/* Section logo et titre de l'application */}
        <div className="text-center mb-4">
          {/* Icône de mortier (chapeau de diplômé) */}
          <i className="bi bi-mortarboard-fill fs-1 mb-2"></i>
          <h4 className="fw-bold mb-0">EduSmart</h4>
          {/* Indication que c'est l'espace étudiant */}
          <small className="opacity-75">Espace Étudiant</small>
        </div>

        {/* Séparateur visuel */}
        <hr className="bg-light opacity-25 my-4" />

        {/* Liste des éléments de navigation */}
        {/* map() parcourt tous les éléments du menu et crée un Link pour chacun */}
        <ul className="nav nav-pills flex-column gap-2">
          {menuItems.map(item => {
            // Vérifie si la route actuelle correspond à cet élément du menu
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path} className="nav-item">
                <Link
                  // Utilise Link de React Router pour la navigation
                  to={item.path}
                  // Condition pour appliquer le style "active" au menu sélectionné
                  // Si la route actuelle correspond: applique la classe 'active' avec fond clair
                  // Sinon: fond transparent
                  className={`nav-link text-white w-100 text-start border-0 ${
                    isActive ? 'active bg-light bg-opacity-25' : 'bg-opacity-10'
                  }`}
                  style={{ transition: 'all 0.3s', textDecoration: 'none' }}
                >
                  {/* Icône Bootstrap correspondant à l'élément du menu */}
                  <i className={`bi ${item.icon} me-3`}></i>
                  {/* Libellé de l'élément du menu */}
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Section profil utilisateur en bas de la sidebar */}
      {/* mt-auto = pousse cette section vers le bas */}
      <div className="mt-auto p-3 border-top border-light border-opacity-25">
        {/* Informations du profil */}
        <div className="d-flex align-items-center mb-3">
          {/* Avatar avec icône de personne */}
          <div className="rounded-circle bg-light bg-opacity-25 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
            <i className="bi bi-person text-white"></i>
          </div>
          {/* Nom et rôle de l'utilisateur */}
          <div className="ms-3">
            <div className="text-light fw-semibold small">Ali Ben</div>
            <small className="text-light opacity-75" style={{ fontSize: '0.75rem' }}>Étudiant</small>
          </div>
        </div>
        {/* Bouton de déconnexion */}
        {/* Utilise useNavigate pour rediriger vers la page d'authentification */}
        <button 
          className="btn btn-outline-light btn-sm w-100"
          onClick={() => {
            // Ici vous pouvez ajouter la logique de déconnexion (clear localStorage, etc.)
            // Puis rediriger vers /auth
            window.location.href = '/auth';
          }}
        >
          <i className="bi bi-box-arrow-right me-2"></i>
          Déconnexion
        </button>
      </div>
    </div>
  );
}
