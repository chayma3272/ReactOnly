import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Authentification() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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
      
      // Ici vous feriez votre appel API réel
      console.log('Connexion réussie:', formData);
      
      // Redirection après connexion réussie
      navigate('/');
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
                    className="btn btn-primary btn-lg w-100 mb-3"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                        Connexion...
                      </>
                    ) : (
                      'Se Connecter'
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