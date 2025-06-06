import axios from 'axios';

// Use environment variable for API URL with fallback to relative path
const API_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_URL.startsWith('http') ? API_URL : `${window.location.origin}${API_URL}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth endpoints
export const login = async (email: string, password: string) => {
  const response = await api.post('/auth/login', { email, password });
  return response.data;
};

export const register = async (name: string, email: string, password: string, confirmPassword: string) => {
  const response = await api.post('/auth/register', { 
    name, 
    email, 
    password, 
    confirmPassword 
  });
  return response.data;
};

// Destinations
export const getDestinations = async () => {
  const response = await api.get('/destinations');
  return response.data;
};

// Packages
export const getPackages = async () => {
  const response = await api.get('/packages');
  return response.data;
};

// Search with abort controller for better cleanup
export const searchDestinations = async (query: string, signal?: AbortSignal) => {
  if (!query.trim()) return [];
  
  console.log('Searching for:', query);
  try {
    // Add timestamp to prevent caching
    const timestamp = new Date().getTime();
    
    // Make requests in parallel with abort signal
    const [destResponse, pkgResponse] = await Promise.all([
      api.get('/destinations', { 
        params: { 
          q: query,
          _t: timestamp
        },
        signal
      }),
      api.get('/packages', { 
        params: { 
          q: query,
          _t: timestamp
        },
        signal
      })
    ]);

    console.log('Destinations response:', destResponse.data);
    console.log('Packages response:', pkgResponse.data);

    // Combine and format results
    const results = [
      ...(destResponse?.data || []).map((d: any) => ({
        ...d,
        id: d._id || d.id,
        type: 'destination'
      })),
      ...(pkgResponse?.data || []).map((p: any) => ({
        ...p,
        id: p._id || p.id,
        type: 'package'
      }))
    ];
    
    console.log('Combined results:', results);
    return results;
  } catch (error: any) {
    console.error('Search error details:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      config: {
        url: error.config?.url,
        method: error.config?.method,
        params: error.config?.params
      }
    });
    return [];
  }
};

// Get package by ID
export const getPackageById = async (id: string) => {
  const response = await api.get(`/packages/${id}`);
  return response.data;
};

// Get destination by ID
export const getDestinationById = async (id: string) => {
  const response = await api.get(`/destinations/${id}`);
  return response.data;
};

// Package CRUD operations
export const createPackage = async (packageData: any, token: string) => {
  const response = await api.post('/packages', packageData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const updatePackage = async (id: string, packageData: any, token: string) => {
  const response = await api.put(`/packages/${id}`, packageData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const deletePackage = async (id: string, token: string) => {
  const response = await api.delete(`/packages/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export const getMyPackages = async (token: string) => {
  const response = await api.get('/packages/me', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export default {
  login,
  register,
  getDestinations,
  getPackages,
  searchDestinations,
  createPackage,
  updatePackage,
  deletePackage,
  getMyPackages,
};