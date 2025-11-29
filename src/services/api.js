import axios from 'axios';

/**
 * Configuration de l'API
 * 
 * Base URL: http://localhost:5000/api
 * Toutes les requêtes seront préfixées avec cette URL
 */

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Intercepteur pour ajouter le token d'authentification à chaque requête
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Intercepteur pour gérer les erreurs de réponse
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expiré ou invalide - rediriger vers la page de connexion
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/auth';
    }
    return Promise.reject(error);
  }
);

// API pour les utilisateurs
export const userAPI = {
  getAll: () => API.get('/users'),
  getById: (id) => API.get(`/users/${id}`),
  create: (userData) => API.post('/users', userData),
  update: (id, userData) => API.put(`/users/${id}`, userData),
  delete: (id) => API.delete(`/users/${id}`),
};

// API pour l'authentification
export const authAPI = {
  register: (userData) => API.post('/auth/register', userData),
  login: (credentials) => API.post('/auth/login', credentials),
};

// API pour les cours
export const courseAPI = {
  getAll: () => API.get('/courses'),
  getById: (id) => API.get(`/courses/${id}`),
  getByTeacher: (teacherId) => API.get(`/courses/teacher/${teacherId}`),
  create: (courseData) => API.post('/courses', courseData),
  update: (id, courseData) => API.put(`/courses/${id}`, courseData),
  delete: (id) => API.delete(`/courses/${id}`),
};

// API pour les étudiants
export const studentAPI = {
  getAll: () => API.get('/students'),
  getById: (id) => API.get(`/students/${id}`),
  getByCourse: (courseId) => API.get(`/students/course/${courseId}`),
  create: (studentData) => API.post('/students', studentData),
  update: (id, studentData) => API.put(`/students/${id}`, studentData),
  delete: (id) => API.delete(`/students/${id}`),
};

// API pour les activités
export const activityAPI = {
  getAll: () => API.get('/activities'),
  getById: (id) => API.get(`/activities/${id}`),
  getByStudent: (studentId) => API.get(`/activities/student/${studentId}`),
  getByCourse: (courseId) => API.get(`/activities/course/${courseId}`),
  create: (activityData) => API.post('/activities', activityData),
  update: (id, activityData) => API.put(`/activities/${id}`, activityData),
  delete: (id) => API.delete(`/activities/${id}`),
};

export default API;

