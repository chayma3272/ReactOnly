import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const userAPI = {
  getAll: () => API.get('/users'),
  create: (userData) => API.post('/users', userData),
};