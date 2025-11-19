import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const location = useLocation();

  // Fonction pour gérer la navigation par ancres
  const handleAnchorClick = (hash) => {
    if (location.pathname === '/') {
      // Si on est déjà sur la page d'accueil, scroll vers l'ancre
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Si on est sur une autre page, naviguer vers l'accueil avec l'ancre
      window.location.href = `/${hash}`;
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top">
      <div className="container">
        <Link className="navbar-brand fw-bold text-primary" to="/">
          <i className="bi bi-mortarboard-fill me-2"></i>
          EduSmart
        </Link>
        
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a 
                className="nav-link" 
                href="#courses"
                onClick={(e) => {
                  e.preventDefault();
                  handleAnchorClick('#courses');
                }}
              >
                Cours
              </a>
            </li>
            <li className="nav-item">
              <a 
                className="nav-link" 
                href="#features"
                onClick={(e) => {
                  e.preventDefault();
                  handleAnchorClick('#features');
                }}
              >
                Fonctionnalités
              </a>
            </li>
            <li className="nav-item">
              <a 
                className="nav-link" 
                href="#certificates"
                onClick={(e) => {
                  e.preventDefault();
                  handleAnchorClick('#certificates');
                }}
              >
                Certificats
              </a>
            </li>
            <li className="nav-item">
              <Link className="btn btn-outline-primary ms-2" to="/auth">
                Connexion
              </Link>
            </li>
            <li className="nav-item">
              <Link className="btn btn-primary ms-2" to="/inscription">
                S'inscrire
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}