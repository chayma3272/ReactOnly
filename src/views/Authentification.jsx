import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Authentification() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'student' // Par défaut: étudiant
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Effacer l'erreur quand l'utilisateur tape
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
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
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Simuler une requête API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Ici vous feriez votre appel API réel qui retourne le rôle de l'utilisateur
      console.log('Connexion réussie:', formData);
      
      // Sauvegarder le rôle dans localStorage pour maintenir la session
      localStorage.setItem('userRole', formData.role);
      localStorage.setItem('userEmail', formData.email);
      
      // Redirection selon le rôle
      if (formData.role === 'teacher') {
        // Si c'est un enseignant, rediriger vers le dashboard enseignant
        navigate('/teacher/dashboard');
      } else {
        // Si c'est un étudiant, rediriger vers le dashboard étudiant
        navigate('/student/dashboard');
      }
      
    } catch (error) {
      console.error('Erreur de connexion:', error);
      setErrors({ submit: 'Erreur de connexion. Veuillez réessayer.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div 
      className="flex-grow-1 d-flex align-items-center justify-content-center"
      style={{
        backgroundImage: 'url("/background_authen.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh'
      }}
    >
      <div className="container-fluid p-4">
        <div className="row justify-content-center align-items-center min-vh-100">
          <div className="col-md-5 col-lg-4">
            <div className="card shadow-lg border-0">
              <div className="card-body p-5">
                <h2 className="text-center mb-4 text-primary">S'Authentifier</h2>
                
                {errors.submit && (
                  <div className="alert alert-danger" role="alert">
                    {errors.submit}
                  </div>
                )}
                
                <form onSubmit={handleSubmit}>
                  {/* Sélection du rôle */}
                  <div className="mb-4">
                    <label className="form-label fw-semibold">Se connecter en tant que :</label>
                    <div className="d-flex gap-3">
                      <div className="form-check flex-fill">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="role"
                          id="roleStudent"
                          value="student"
                          checked={formData.role === 'student'}
                          onChange={handleChange}
                        />
                        <label className="form-check-label w-100" htmlFor="roleStudent">
                          <div className="border rounded p-3 text-center" style={{ cursor: 'pointer' }}>
                            <i className="bi bi-mortarboard-fill fs-3 text-success d-block mb-2"></i>
                            <strong>Étudiant</strong>
                          </div>
                        </label>
                      </div>
                      <div className="form-check flex-fill">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="role"
                          id="roleTeacher"
                          value="teacher"
                          checked={formData.role === 'teacher'}
                          onChange={handleChange}
                        />
                        <label className="form-check-label w-100" htmlFor="roleTeacher">
                          <div className="border rounded p-3 text-center" style={{ cursor: 'pointer' }}>
                            <i className="bi bi-person-workspace fs-3 text-primary d-block mb-2"></i>
                            <strong>Enseignant</strong>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <input
                      type="email"
                      name="email"
                      className={`form-control form-control-lg ${errors.email ? 'is-invalid' : ''}`}
                      placeholder="Adresse Email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                  </div>
                  
                  <div className="mb-3">
                    <input
                      type="password"
                      name="password"
                      className={`form-control form-control-lg ${errors.password ? 'is-invalid' : ''}`}
                      placeholder="Mot De Passe"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    {errors.password && <div className="invalid-feedback">{errors.password}</div>}
                  </div>
                  
                  <button 
                    type="submit" 
                    className={`btn btn-lg w-100 mb-3 ${
                      formData.role === 'teacher' ? 'btn-primary' : 'btn-success'
                    }`}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                        Connexion...
                      </>
                    ) : (
                      <>
                        Se Connecter en tant que {formData.role === 'teacher' ? 'Enseignant' : 'Étudiant'}
                      </>
                    )}
                  </button>
                  
                  <div className="text-center">
                    <Link to="/forgot-password" className="d-block mb-2 text-decoration-none">
                      Mot de passe oublié ?
                    </Link>
                    <span className="text-muted">Vous n'avez pas de compte ? </span>
                    <Link to="/inscription" className="text-decoration-none">
                      Créer un compte
                    </Link>
                  </div>

                  <div className="text-center mt-3">
                    <Link to="/" className="text-decoration-none">
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
