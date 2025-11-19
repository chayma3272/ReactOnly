import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Inscription() {
  const [userType, setUserType] = useState('student');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    // Étudiant
    studentLevel: '',
    // Enseignant  
    teacherSpecialty: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    
    // Effacer l'erreur du champ quand l'utilisateur tape
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Validation des champs de base
    if (!formData.firstName.trim()) newErrors.firstName = 'Le prénom est requis';
    if (!formData.lastName.trim()) newErrors.lastName = 'Le nom est requis';
    
    if (!formData.email) {
      newErrors.email = 'Email requis';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Format email invalide';
    }
    
    if (!formData.password) {
      newErrors.password = 'Mot de passe requis';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Veuillez confirmer votre mot de passe';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Les mots de passe ne correspondent pas';
    }

    // Validation des champs spécifiques
    if (userType === 'student' && !formData.studentLevel) {
      newErrors.studentLevel = 'Veuillez sélectionner votre niveau';
    }

    if (userType === 'teacher' && !formData.teacherSpecialty.trim()) {
      newErrors.teacherSpecialty = 'La spécialité est requise';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Simuler une requête d'inscription
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Inscription réussie:', { userType, ...formData });
      
      // Redirection après inscription réussie
      navigate('/auth', { 
        state: { message: 'Inscription réussie! Veuillez vous connecter.' }
      });
    } catch (error) {
      console.error('Erreur d\'inscription:', error);
      setErrors({ submit: 'Erreur lors de l\'inscription. Veuillez réessayer.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="min-vh-100 d-flex align-items-center"
      style={{
        backgroundImage: 'url("/background_authen.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            
            {/* Carte principale */}
            <div className="card shadow border-0">
              <div className="card-body p-4 p-md-5">
                
                {/* En-tête */}
                <div className="text-center mb-4">
                  <h2 className="text-primary fw-bold">Créer un compte</h2>
                  <p className="text-muted">Rejoignez notre plateforme éducative</p>
                </div>

                {/* Type d'utilisateur */}
                <div className="mb-4">
                  <label className="form-label fw-semibold">Je suis :</label>
                  <div className="btn-group w-100" role="group">
                    <button
                      type="button"
                      className={`btn ${userType === 'student' ? 'btn-primary' : 'btn-outline-primary'}`}
                      onClick={() => setUserType('student')}
                    >
                      Étudiant
                    </button>
                    <button
                      type="button"
                      className={`btn ${userType === 'teacher' ? 'btn-primary' : 'btn-outline-primary'}`}
                      onClick={() => setUserType('teacher')}
                    >
                      Enseignant
                    </button>
                  </div>
                </div>

                {/* Formulaire */}
                <form onSubmit={handleSubmit}>
                  
                  {errors.submit && (
                    <div className="alert alert-danger" role="alert">
                      {errors.submit}
                    </div>
                  )}

                  {/* Champs de base */}
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <input
                        type="text"
                        className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                        name="firstName"
                        placeholder="Prénom"
                        value={formData.firstName}
                        onChange={handleChange}
                      />
                      {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                    </div>
                    <div className="col-md-6 mb-3">
                      <input
                        type="text"
                        className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                        name="lastName"
                        placeholder="Nom"
                        value={formData.lastName}
                        onChange={handleChange}
                      />
                      {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                    </div>
                  </div>

                  <div className="mb-3">
                    <input
                      type="email"
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                      name="email"
                      placeholder="Adresse email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <input
                        type="password"
                        className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                        name="password"
                        placeholder="Mot de passe"
                        value={formData.password}
                        onChange={handleChange}
                      />
                      {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                    </div>
                    <div className="col-md-6 mb-3">
                      <input
                        type="password"
                        className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                        name="confirmPassword"
                        placeholder="Confirmer le mot de passe"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                      />
                      {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
                    </div>
                  </div>

                  {/* Champs spécifiques */}
                  {userType === 'student' && (
                    <div className="mb-3">
                      <select
                        className={`form-select ${errors.studentLevel ? 'is-invalid' : ''}`}
                        name="studentLevel"
                        value={formData.studentLevel}
                        onChange={handleChange}
                      >
                        <option value="">Sélectionnez votre niveau d'études</option>
                        <option value="college">Collège</option>
                        <option value="lycee">Lycée</option>
                        <option value="bac">Baccalauréat</option>
                        <option value="licence">Licence</option>
                        <option value="master">Master</option>
                        <option value="doctorat">Doctorat</option>
                      </select>
                      {errors.studentLevel && <div className="invalid-feedback">{errors.studentLevel}</div>}
                    </div>
                  )}

                  {userType === 'teacher' && (
                    <div className="mb-3">
                      <input
                        type="text"
                        className={`form-control ${errors.teacherSpecialty ? 'is-invalid' : ''}`}
                        name="teacherSpecialty"
                        placeholder="Votre spécialité (ex: Mathématiques, Physique...)"
                        value={formData.teacherSpecialty}
                        onChange={handleChange}
                      />
                      {errors.teacherSpecialty && <div className="invalid-feedback">{errors.teacherSpecialty}</div>}
                    </div>
                  )}

                  {/* Conditions */}
                  <div className="form-check mb-4">
                    <input 
                      className="form-check-input" 
                      type="checkbox" 
                      id="conditions" 
                      required 
                    />
                    <label className="form-check-label small" htmlFor="conditions">
                      J'accepte les <a href="#conditions" className="text-decoration-none">conditions d'utilisation</a> et la <a href="#privacy" className="text-decoration-none">politique de confidentialité</a>
                    </label>
                  </div>

                  {/* Bouton d'inscription */}
                  <button 
                    type="submit" 
                    className="btn btn-primary w-100 mb-3 py-2"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                        Inscription en cours...
                      </>
                    ) : (
                      'S\'inscrire'
                    )}
                  </button>

                  {/* Lien de connexion */}
                  <div className="text-center mb-3">
                    <small className="text-muted">
                      Déjà un compte ?{' '}
                      <Link to="/auth" className="text-decoration-none">
                        Se connecter
                      </Link>
                    </small>
                  </div>

                  {/* Lien de retour à l'accueil */}
                  <div className="text-center">
                    <Link to="/" className="text-decoration-none small">
                      ← Retour à l'accueil
                    </Link>
                  </div>

                </form>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}