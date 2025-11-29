/**
 * COMPOSANT: MenuBar (Teacher)
 * 
 * DESCRIPTION:
 * Barre de menu latérale pour l'interface enseignante utilisant React Router.
 */

import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function MenuBar() {
  /**
   * Configuration des éléments du menu avec leurs routes correspondantes
   */
  const menuItems = [
    { path: '/teacher/dashboard', icon: 'bi-speedometer2', label: 'Tableau de bord' },
    { path: '/teacher/students', icon: 'bi-backpack2', label: 'Étudiants' },
    { path: '/teacher/courses', icon: 'bi-book-half', label: 'Mes Cours' },
    { path: '/teacher/analytics', icon: 'bi-bar-chart', label: 'Analytique' },
    { path: '/teacher/settings', icon: 'bi-gear', label: 'Paramètres' },
  ];

  // useLocation pour détecter la route actuelle
  const location = useLocation();

  return (
    <div className="bg-primary text-white d-flex flex-column" style={{ width: '280px', minHeight: '100vh', position: 'fixed', left: 0, top: 0 }}>
      <div className="p-4">
        {/* Logo et titre */}
        <div className="text-center mb-4">
          <i className="bi bi-mortarboard-fill fs-1 mb-2"></i>
          <h4 className="fw-bold mb-0">EduSmart</h4>
          <small className="opacity-75">Espace Enseignant</small>
        </div>

        <hr className="bg-light opacity-25 my-4" />

        {/* Menu de navigation */}
        <ul className="nav nav-pills flex-column gap-2">
          {menuItems.map(item => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path} className="nav-item">
                <Link
                  to={item.path}
                  className={`nav-link text-white w-100 text-start border-0 ${
                    isActive ? 'active bg-light bg-opacity-25' : 'bg-opacity-10'
                  }`}
                  style={{ transition: 'all 0.3s', textDecoration: 'none' }}
                >
                  <i className={`bi ${item.icon} me-3`}></i>
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Profil utilisateur en bas */}
      <div className="mt-auto p-3 border-top border-light border-opacity-25">
        <div className="d-flex align-items-center mb-3">
          <div className="rounded-circle bg-light bg-opacity-25 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
            <i className="bi bi-person text-white"></i>
          </div>
          <div className="ms-3">
            <div className="text-light fw-semibold small">Prof. Ahmed</div>
            <small className="text-light opacity-75" style={{ fontSize: '0.75rem' }}>Enseignant</small>
          </div>
        </div>
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