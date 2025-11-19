import React from 'react'

export default function TeacherHeader() {
  return (
    <header className="bg-white shadow-sm py-3 px-4 d-flex justify-content-between align-items-center">
      <div>
        <h5 className="mb-0 fw-bold">Dashboard Enseignant</h5>
        <small className="text-muted">Gérez vos cours et étudiants</small>
      </div>
      <div className="d-flex align-items-center gap-3">
        {/* Notifications */}
        <button className="btn btn-outline-secondary position-relative">
          <i className="bi bi-bell"></i>
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: '0.65rem' }}>
            3
          </span>
        </button>
        
        {/* Profil utilisateur */}
        <div className="d-flex align-items-center gap-2">
          <div className="rounded-circle bg-primary text-white d-inline-flex align-items-center justify-content-center fw-bold" style={{width: 40, height: 40}}>
            PA
          </div>
          <div>
            <div className="fw-semibold" style={{fontSize: '14px'}}>Prof. Ahmed</div>
            <small className="text-muted">Enseignant</small>
          </div>
        </div>
      </div>
    </header>
  );
}