import React, { useState } from 'react'

export default function SettingsTeacher() {
  const [form, setForm] = useState({ 
    firstName: 'Ahmed', 
    lastName: 'Ben Salem', 
    email: 'ahmed@example.com',
    phone: '+216 98 123 456',
    bio: 'Enseignant passionné par les nouvelles technologies'
  });

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div>
      <h3 className="fw-bold mb-4">Paramètres du Compte</h3>
      
      <div className="row">
        {/* Colonne principale */}
        <div className="col-lg-8">
          {/* Informations personnelles */}
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-header bg-white border-0 py-3">
              <h5 className="mb-0 fw-bold">
                <i className="bi bi-person-circle me-2 text-primary"></i>
                Informations Personnelles
              </h5>
            </div>
            <div className="card-body">
              <div className="row g-3 mb-3">
                <div className="col-md-6">
                  <label className="form-label fw-semibold small">Prénom</label>
                  <input 
                    name="firstName" 
                    value={form.firstName} 
                    onChange={handle} 
                    className="form-control" 
                    placeholder="Votre prénom"
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold small">Nom</label>
                  <input 
                    name="lastName" 
                    value={form.lastName} 
                    onChange={handle} 
                    className="form-control" 
                    placeholder="Votre nom"
                  />
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold small">Email</label>
                <input 
                  name="email" 
                  value={form.email} 
                  onChange={handle} 
                  className="form-control" 
                  type="email"
                  placeholder="votre.email@example.com"
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold small">Téléphone</label>
                <input 
                  name="phone" 
                  value={form.phone} 
                  onChange={handle} 
                  className="form-control" 
                  placeholder="+216 XX XXX XXX"
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold small">Biographie</label>
                <textarea 
                  name="bio" 
                  value={form.bio} 
                  onChange={handle} 
                  className="form-control" 
                  rows="3"
                  placeholder="Parlez de vous..."
                ></textarea>
              </div>
              <button className="btn btn-primary">
                <i className="bi bi-check-circle me-2"></i>Sauvegarder les Modifications
              </button>
            </div>
          </div>

          {/* Sécurité */}
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-header bg-white border-0 py-3">
              <h5 className="mb-0 fw-bold">
                <i className="bi bi-shield-check me-2 text-success"></i>
                Sécurité
              </h5>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3 pb-3 border-bottom">
                <div>
                  <div className="fw-semibold">Mot de passe</div>
                  <small className="text-muted">Dernière modification il y a 3 mois</small>
                </div>
                <button className="btn btn-outline-primary btn-sm">
                  <i className="bi bi-key me-1"></i>Changer
                </button>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div className="fw-semibold">Authentification à deux facteurs</div>
                  <small className="text-muted">Sécurisez votre compte avec la 2FA</small>
                </div>
                <button className="btn btn-outline-success btn-sm">
                  <i className="bi bi-shield-lock me-1"></i>Activer
                </button>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white border-0 py-3">
              <h5 className="mb-0 fw-bold">
                <i className="bi bi-bell me-2 text-warning"></i>
                Préférences de Notification
              </h5>
            </div>
            <div className="card-body">
              <div className="mb-3 pb-3 border-bottom">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <div className="fw-semibold">Nouveaux étudiants</div>
                    <small className="text-muted">Recevoir une notification lors d'une nouvelle inscription</small>
                  </div>
                  <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" defaultChecked />
                  </div>
                </div>
              </div>
              <div className="mb-3 pb-3 border-bottom">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <div className="fw-semibold">Devoirs soumis</div>
                    <small className="text-muted">Notification quand un étudiant soumet un devoir</small>
                  </div>
                  <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" defaultChecked />
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div className="fw-semibold">Questions des étudiants</div>
                  <small className="text-muted">Recevoir les questions posées par les étudiants</small>
                </div>
                <div className="form-check form-switch">
                  <input className="form-check-input" type="checkbox" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Colonne latérale */}
        <div className="col-lg-4">
          {/* Photo de profil */}
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body text-center">
              <div className="rounded-circle bg-primary text-white d-inline-flex align-items-center justify-content-center fw-bold mb-3" 
                   style={{width: '100px', height: '100px', fontSize: '2rem'}}>
                PA
              </div>
              <h5 className="fw-bold mb-1">Prof. Ahmed</h5>
              <p className="text-muted small mb-3">ahmed@example.com</p>
              <button className="btn btn-outline-primary btn-sm w-100 mb-2">
                <i className="bi bi-upload me-2"></i>Changer la photo
              </button>
              <button className="btn btn-outline-danger btn-sm w-100">
                <i className="bi bi-trash me-2"></i>Supprimer
              </button>
            </div>
          </div>

          {/* Statistiques */}
          <div className="card border-0 shadow-sm">
            <div className="card-header bg-white border-0 py-3">
              <h6 className="mb-0 fw-bold">Statistiques du Compte</h6>
            </div>
            <div className="card-body">
              <div className="mb-3 pb-3 border-bottom">
                <div className="d-flex justify-content-between">
                  <small className="text-muted">Membre depuis</small>
                  <small className="fw-semibold">Janvier 2023</small>
                </div>
              </div>
              <div className="mb-3 pb-3 border-bottom">
                <div className="d-flex justify-content-between">
                  <small className="text-muted">Cours créés</small>
                  <small className="fw-semibold">8 cours</small>
                </div>
              </div>
              <div className="mb-3 pb-3 border-bottom">
                <div className="d-flex justify-content-between">
                  <small className="text-muted">Total étudiants</small>
                  <small className="fw-semibold">342 étudiants</small>
                </div>
              </div>
              <div>
                <div className="d-flex justify-content-between">
                  <small className="text-muted">Note moyenne</small>
                  <small className="fw-semibold">
                    <i className="bi bi-star-fill text-warning me-1"></i>4.8/5
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}