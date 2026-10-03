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
      const res = await fetch(`${API_URL}/auth/me`, {
        headers: getHeaders()
      });
      if (!res.ok) throw new Error('Not authenticated');
      return res.json();
    }
  },
  users: {
    updateProfile: async (data) => {
      const formData = new FormData();
      if (data.bio) formData.append('bio', data.bio);
      if (data.location) formData.append('location', data.location);
      if (data.hourly_rate) formData.append('hourly_rate', data.hourly_rate);
      if (data.experience_years) formData.append('experience_years', data.experience_years);
      if (data.profile_picture) formData.append('profile_picture', data.profile_picture);

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
