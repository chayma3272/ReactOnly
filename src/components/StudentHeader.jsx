/**
 * COMPOSANT: StudentHeader
 * 
 * DESCRIPTION:
 * Ce composant représente l'en-tête (header) de l'interface étudiante.
 * Il affiche le titre du dashboard, un bouton de notifications avec badge,
 * et les informations du profil utilisateur (avatar, nom, rôle).
 * 
 * FONCTIONNALITÉS:
 * - Affiche le titre "Dashboard Étudiant" avec une description
 * - Bouton de notifications avec un badge indiquant le nombre de notifications (2)
 * - Section profil avec avatar (initiales "AB"), nom de l'étudiant et rôle
 * 
 * STYLE:
 * - Utilise Bootstrap 5 pour le design
 * - Couleur verte (bg-success) pour l'avatar, différenciant l'interface étudiante de l'interface enseignante (bleue)
 * - Position fixe en haut de la page
 */

import React from 'react'

export default function StudentHeader() {
  return (
    <header className="bg-white shadow-sm py-3 px-4 d-flex justify-content-between align-items-center">
      {/* Section gauche: Titre et description */}
      <div>
        <h5 className="mb-0 fw-bold">Dashboard Étudiant</h5>
        <small className="text-muted">Gérez vos cours et votre progression</small>
      </div>
      
      {/* Section droite: Notifications et profil */}
      <div className="d-flex align-items-center gap-3">
        {/* Bouton de notifications avec badge */}
        {/* Le badge affiche le nombre de notifications non lues (2) */}
        <button className="btn btn-outline-secondary position-relative">
          <i className="bi bi-bell"></i>
          {/* Badge rouge avec le nombre de notifications */}
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '0.65rem' }}>
            2
          </span>
        </button>
        
        {/* Section profil utilisateur */}
        {/* Affiche l'avatar (initiales), le nom et le rôle de l'étudiant */}
        <div className="d-flex align-items-center gap-2">
          {/* Avatar circulaire avec initiales "AB" (Ali Ben) */}
          {/* bg-success = couleur verte pour différencier l'interface étudiante */}
          <div className="rounded-circle bg-success text-white d-inline-flex align-items-center justify-content-center fw-bold" style={{width: 40, height: 40}}>
            AB
          </div>
          {/* Informations de l'utilisateur */}
          <div>
            <div className="fw-semibold" style={{fontSize: '14px'}}>Ali Ben</div>
            <small className="text-muted">Étudiant</small>
          </div>
        </div>
      </div>
    </header>
  );
}

