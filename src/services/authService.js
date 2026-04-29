import api from './api';

export const authService = {
  login: async (email, password, rememberMe = false) => {
    const response = await api.post('/auth/login', { email, password, rememberMe });
    return response.data?.data || response.data;
  },

  logout: async () => {
    const response = await api.post('/auth/logout');
    return response.data?.data || response.data;
  },

  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data?.data || response.data;
  },

  forgotPassword: async (email) => {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data?.data || response.data;
  },

  resetPassword: async (token, password, confirmPassword) => {
    const response = await api.post('/auth/reset-password', { token, password, confirmPassword });
    return response.data?.data || response.data;
  },
};

export default authService;
