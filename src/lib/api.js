export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export const getHeaders = () => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
};

export const api = {
  auth: {
    login: async (email, password) => {
      const formData = new URLSearchParams();
      formData.append('username', email);
      formData.append('password', password);

      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formData.toString()
      });
      if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new Error(error.detail || 'Login failed');
      }
      return res.json();
    },
    register: async (email, password, fullName, role) => {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, full_name: fullName, role })
      });
      if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new Error(error.detail || 'Registration failed');
      }
      return res.json();
    },
    googleLogin: async (accessToken, role) => {
      const res = await fetch(`${API_URL}/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: accessToken, role })
      });
      if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new Error(error.detail || 'Google login failed');
      }
      return res.json();
    },
    me: async () => {
      const res = await fetch(`${API_URL}/users/me`, {
        headers: getHeaders()
      });
      if (!res.ok) throw new Error('Not authenticated');
      return res.json();
    }
  },
  users: {
    updateProfile: async (data) => {
      const formData = new FormData();
      Object.keys(data).forEach(key => {
        if (key === 'profile_picture_preview') return;
        
        if (data[key] !== null && data[key] !== undefined && data[key] !== '') {
          if (Array.isArray(data[key])) {
            data[key].forEach(item => formData.append(key, item));
          } else {
            formData.append(key, data[key]);
          }
        }
      });

      const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
      
      const res = await fetch(`${API_URL}/users/profile`, {
        method: 'PUT',
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {})
          // Note: DO NOT set Content-Type here, let browser set multipart/form-data with boundaries
        },
        body: formData
      });
      if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new Error(error.detail || 'Failed to update profile');
      }
      return res.json();
    }
  }
};
