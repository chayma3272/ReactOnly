# Frontend Integration Guide

This guide shows how to connect your existing React components to the new backend API.

## Setup

1. Update `src/services/api.js` to point to your backend:

```javascript
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// Add token to requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
```

## Authentication

### Login Example

```javascript
import API from '../services/api';

const login = async (email, password) => {
  try {
    const response = await API.post('/auth/login', { email, password });
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.user));
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};
```

### Register Example

```javascript
const register = async (userData) => {
  try {
    const response = await API.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    console.error('Register error:', error);
    throw error;
  }
};
```

## Protected Routes

Create a route guard component:

```javascript
// src/components/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children, requireRole }) {
  const userId = localStorage.getItem('userId');
  const userRole = localStorage.getItem('userRole');

  if (!userId) {
    return <Navigate to="/auth" />;
  }

  if (requireRole && userRole !== requireRole) {
    return <Navigate to="/" />;
  }

  return children;
}
```

Use in `App.jsx`:

```javascript
<Route 
  path="/teacher/dashboard" 
  element={
    <ProtectedRoute requireRole="teacher">
      <DashboardTeacher />
    </ProtectedRoute>
  } 
/>
```

## Error Handling

Create a centralized error handler:

```javascript
// src/utils/errorHandler.js
export const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error
    return error.response.data.error || 'Une erreur est survenue';
  } else if (error.request) {
    // Request made but no response
    return 'Impossible de contacter le serveur';
  } else {
    // Error setting up request
    return 'Erreur de configuration';
  }
};
```

Use in components:

```javascript
try {
  await courseAPI.create(data);
} catch (error) {
  const errorMessage = handleApiError(error);
  setErrors({ submit: errorMessage });
}
```

## Loading States

Always show loading indicators:

```javascript
const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await api.getData();
      setData(response.data);
    } catch (error) {
      // Handle error
    } finally {
      setLoading(false);
    }
  };
  fetchData();
}, []);

if (loading) {
  return <div className="text-center py-5">Chargement...</div>;
}
```

## Next Steps

1. Update all components to use API calls instead of mock data
2. Add authentication to protected routes
3. Implement error handling
4. Add loading states
5. Test all API endpoints

