/**
 * COMPOSANT: SettingsStudent
 * 
 * DESCRIPTION:
 * Ce composant gère les paramètres du compte étudiant.
 * Il permet de modifier les informations personnelles, la sécurité et les notifications.
 * 
 * SECTIONS:
 * 1. Informations Personnelles: Prénom, nom, email, téléphone, biographie
 * 2. Sécurité: Changement de mot de passe, authentification à deux facteurs
 * 3. Notifications: Préférences de notification (nouveaux cours, rappels, certificats)
 * 4. Statistiques: Aperçu des statistiques du compte
 * 
 * ÉTATS (STATE):
 * - form: Données du formulaire d'informations personnelles
 * - passwordForm: Données du formulaire de changement de mot de passe
 * - showPasswordModal: Contrôle l'affichage du modal de changement de mot de passe
 */

import React, { useState } from 'react'

export default function SettingsStudent() {
  /**
   * ÉTAT: form
   * 
   * Stocke les informations personnelles de l'étudiant.
   * Utilisé pour le formulaire d'édition des informations.
   */
  const [form, setForm] = useState({ 
    firstName: 'Ali', 
    lastName: 'Ben', 
    email: 'ali@example.com',
    phone: '+216 98 123 456',
    bio: 'Étudiant passionné par le développement web et l\'intelligence artificielle'
  });

  /**
   * ÉTAT: passwordForm
   * 
   * Stocke les données du formulaire de changement de mot de passe.
   * Utilisé uniquement dans le modal de changement de mot de passe.
   */
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  /**
   * ÉTAT: showPasswordModal
   * 
   * Contrôle l'affichage du modal de changement de mot de passe.
   * true = modal visible, false = modal caché
   */
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  /**
   * FONCTION: handleChange
   * 
   * DESCRIPTION:
   * Gère les changements dans le formulaire d'informations personnelles.
   * Utilise la syntaxe [e.target.name] pour mettre à jour dynamiquement
   * le champ correspondant dans l'objet form.
   * 
   * EXEMPLE:
   * Si l'input a name="firstName", alors form.firstName sera mis à jour
   */
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  
  /**
   * FONCTION: handlePasswordChange
   * 
   * DESCRIPTION:
   * Gère les changements dans le formulaire de mot de passe.
   * Même principe que handleChange mais pour passwordForm.
   */
  const handlePasswordChange = e => setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });

  /**
   * FONCTION: handlePasswordSubmit
   * 
   * DESCRIPTION:
   * Gère la soumission du formulaire de changement de mot de passe.
   * 
   * VALIDATION:
   * 1. Vérifie que le nouveau mot de passe et la confirmation correspondent
   * 2. Si non: affiche une alerte et arrête l'exécution
   * 3. Si oui: affiche un message de succès, ferme le modal et réinitialise le formulaire
   * 
   * PARAMÈTRES:
   * - e: Événement du formulaire (utilisé pour preventDefault())
   */
  const handlePasswordSubmit = (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    
    // Validation: vérifie que les deux mots de passe correspondent
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('Les mots de passe ne correspondent pas');
      return; // Arrête l'exécution si les mots de passe ne correspondent pas
    }
    
    // Si la validation passe, affiche un message de succès
    alert('Mot de passe modifié avec succès !');
    
    // Ferme le modal et réinitialise le formulaire
    setShowPasswordModal(false);
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  return (
    <div>
      <h3 className="fw-bold mb-4">Paramètres du Compte</h3>
      
      <div className="row">
        <div className="col-lg-8">
          {/* Informations personnelles */}
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-header bg-white border-0 py-3">
              <h5 className="mb-0 fw-bold">
                <i className="bi bi-person-circle me-2 text-success"></i>
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
                    onChange={handleChange} 
                    className="form-control" 
                    placeholder="Votre prénom"
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label fw-semibold small">Nom</label>
                  <input 
                    name="lastName" 
                    value={form.lastName} 
                    onChange={handleChange} 
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
                  onChange={handleChange} 
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
                  onChange={handleChange} 
                  className="form-control" 
                  placeholder="+216 XX XXX XXX"
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold small">Biographie</label>
                <textarea 
                  name="bio" 
                  value={form.bio} 
                  onChange={handleChange} 
                  className="form-control" 
                  rows="3"
                  placeholder="Parlez de vous..."
                ></textarea>
              </div>
              <button className="btn btn-success">
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
                  <small className="text-muted">Dernière modification il y a 2 mois</small>
                </div>
                <button 
                  className="btn btn-outline-success btn-sm"
                  onClick={() => setShowPasswordModal(true)}
                >
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
                    <div className="fw-semibold">Nouveaux cours</div>
                    <small className="text-muted">Recevoir une notification pour les nouveaux cours disponibles</small>
                  </div>
                  <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" defaultChecked />
                  </div>
                </div>
              </div>
              <div className="mb-3 pb-3 border-bottom">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <div className="fw-semibold">Rappels de cours</div>
                    <small className="text-muted">Notification pour continuer vos cours en cours</small>
                  </div>
                  <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" defaultChecked />
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <div className="fw-semibold">Certificats obtenus</div>
                  <small className="text-muted">Notification quand vous obtenez un certificat</small>
                </div>
                <div className="form-check form-switch">
                  <input className="form-check-input" type="checkbox" defaultChecked />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          {/* Photo de profil */}
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body text-center">
              <div className="rounded-circle bg-success text-white d-inline-flex align-items-center justify-content-center fw-bold mb-3" 
                   style={{width: '100px', height: '100px', fontSize: '2rem'}}>
                AB
              </div>
              <h5 className="fw-bold mb-1">Ali Ben</h5>
              <p className="text-muted small mb-3">ali@example.com</p>
              <button className="btn btn-outline-success btn-sm w-100 mb-2">
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
                  <small className="fw-semibold">Janvier 2024</small>
                </div>
              </div>
              <div className="mb-3 pb-3 border-bottom">
                <div className="d-flex justify-content-between">
                  <small className="text-muted">Cours inscrits</small>
                  <small className="fw-semibold">5 cours</small>
                </div>
              </div>
              <div className="mb-3 pb-3 border-bottom">
                <div className="d-flex justify-content-between">
                  <small className="text-muted">Cours complétés</small>
                  <small className="fw-semibold">2 cours</small>
                </div>
              </div>
              <div>
                <div className="d-flex justify-content-between">
                  <small className="text-muted">Certificats</small>
                  <small className="fw-semibold">
                    <i className="bi bi-trophy-fill text-warning me-1"></i>2 certificats
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de changement de mot de passe */}
      {showPasswordModal && (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  <i className="bi bi-key me-2"></i>Changer le Mot de Passe
                </h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={() => setShowPasswordModal(false)}
                ></button>
              </div>
              <form onSubmit={handlePasswordSubmit}>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Mot de passe actuel</label>
                    <input
                      type="password"
                      className="form-control"
                      name="currentPassword"
                      value={passwordForm.currentPassword}
                      onChange={handlePasswordChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Nouveau mot de passe</label>
                    <input
                      type="password"
                      className="form-control"
                      name="newPassword"
                      value={passwordForm.newPassword}
                      onChange={handlePasswordChange}
                      required
                      minLength="8"
                    />
                    <small className="text-muted">Minimum 8 caractères</small>
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Confirmer le mot de passe</label>
                    <input
                      type="password"
                      className="form-control"
                      name="confirmPassword"
                      value={passwordForm.confirmPassword}
                      onChange={handlePasswordChange}
                      required
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={() => setShowPasswordModal(false)}
                  >
                    Annuler
                  </button>
                  <button type="submit" className="btn btn-success">
                    <i className="bi bi-check-circle me-2"></i>Sauvegarder
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


