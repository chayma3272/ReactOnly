import React from 'react'

export default function MenuBar({ activeMenu, setActiveMenu }) {
  const menuItems = [
    { id: 'dashboard', icon: 'bi-speedometer2', label: 'Tableau de bord' },
    { id: 'students', icon: 'bi-backpack2', label: 'Étudiants' },
    { id: 'courses', icon: 'bi-book-half', label: 'Mes Cours' },
    { id: 'analytics', icon: 'bi-bar-chart', label: 'Analytique' },
    { id: 'settings', icon: 'bi-gear', label: 'Paramètres' },
  ];

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
          {menuItems.map(item => (
            <li key={item.id} className="nav-item">
              <button
                className={`nav-link text-white w-100 text-start border-0 ${
                  activeMenu === item.id ? 'active bg-light bg-opacity-25' : 'bg-opacity-10'
                }`}
                onClick={() => setActiveMenu(item.id)}
                style={{ transition: 'all 0.3s' }}
              >
                <i className={`bi ${item.icon} me-3`}></i>
                {item.label}
              </button>
            </li>
          ))}
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
        <button className="btn btn-outline-light btn-sm w-100">
          <i className="bi bi-box-arrow-right me-2"></i>
          Déconnexion
        </button>
      </div>
    </div>
  );
}