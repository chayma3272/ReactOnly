import React, { useState } from 'react'

export default function StudentsTeacher() {
  const [students] = useState([
    { id: 1, name: 'Ali Ben Ahmed', email: 'ali@example.com', courses: 3, progress: 85, avatar: 'AB' },
    { id: 2, name: 'Sara Dridi', email: 'sara@example.com', courses: 2, progress: 92, avatar: 'SD' },
    { id: 3, name: 'Mohamed Karim', email: 'mohamed@example.com', courses: 4, progress: 78, avatar: 'MK' },
    { id: 4, name: 'Leila Mansour', email: 'leila@example.com', courses: 3, progress: 88, avatar: 'LM' },
  ]);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold">Mes Étudiants</h3>
        <div className="d-flex gap-2">
          <input type="search" className="form-control" placeholder="Rechercher un étudiant..." style={{width: '300px'}} />
          <button className="btn btn-outline-secondary">
            <i className="bi bi-filter"></i>
          </button>
        </div>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover mb-0">
              <thead className="bg-light">
                <tr>
                  <th className="border-0 py-3 px-4">Étudiant</th>
                  <th className="border-0 py-3">Cours Inscrits</th>
                  <th className="border-0 py-3">Progression Moyenne</th>
                  <th className="border-0 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map(student => (
                  <tr key={student.id}>
                    <td className="py-3 px-4">
                      <div className="d-flex align-items-center gap-3">
                        <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center fw-bold" 
                             style={{width: '40px', height: '40px', fontSize: '0.9rem'}}>
                          {student.avatar}
                        </div>
                        <div>
                          <div className="fw-semibold">{student.name}</div>
                          <small className="text-muted">{student.email}</small>
                        </div>
                      </div>
                    </td>
                    <td className="py-3">
                      <span className="badge bg-primary bg-opacity-10 text-primary">
                        {student.courses} cours
                      </span>
                    </td>
                    <td className="py-3">
                      <div style={{width: '150px'}}>
                        <div className="d-flex justify-content-between align-items-center mb-1">
                          <small className="text-muted">{student.progress}%</small>
                        </div>
                        <div className="progress" style={{height: '6px'}}>
                          <div className="progress-bar bg-success" 
                               style={{width: `${student.progress}%`}}></div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3">
                      <div className="d-flex gap-2">
                        <button className="btn btn-sm btn-outline-primary">
                          <i className="bi bi-eye me-1"></i>Voir
                        </button>
                        <button className="btn btn-sm btn-outline-secondary">
                          <i className="bi bi-envelope me-1"></i>Message
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Statistiques rapides */}
      <div className="row g-3 mt-4">
        <div className="col-md-3">
          <div className="card border-0 bg-primary bg-opacity-10">
            <div className="card-body text-center">
              <h4 className="fw-bold text-primary">{students.length}</h4>
              <small className="text-muted">Total Étudiants</small>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 bg-success bg-opacity-10">
            <div className="card-body text-center">
              <h4 className="fw-bold text-success">
                {Math.round(students.reduce((acc, s) => acc + s.progress, 0) / students.length)}%
              </h4>
              <small className="text-muted">Progression Moyenne</small>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 bg-info bg-opacity-10">
            <div className="card-body text-center">
              <h4 className="fw-bold text-info">
                {students.reduce((acc, s) => acc + s.courses, 0)}
              </h4>
              <small className="text-muted">Inscriptions Totales</small>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 bg-warning bg-opacity-10">
            <div className="card-body text-center">
              <h4 className="fw-bold text-warning">
                {students.filter(s => s.progress < 80).length}
              </h4>
              <small className="text-muted">Besoin d'Aide</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}