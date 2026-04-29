import api from './api';

export const earlyAccessService = {
  // Public endpoints
  listPublic: async (page = 1, limit = 10) => {
    const response = await api.get('/early-access', { params: { page, limit } });
    return response.data?.data || response.data;
  },

  getPublic: async (id) => {
    const response = await api.get(`/early-access/${id}`);
    return response.data?.data || response.data;
  },

  register: async (id, formData) => {
    const response = await api.post(`/early-access/${id}/register`, formData);
    return response.data?.data || response.data;
  },

  // Admin endpoints
  listAdmin: async (page = 1, limit = 10) => {
    const response = await api.get('/office/early-access', { params: { page, limit } });
    return response.data?.data || response.data;
  },

  create: async (formData) => {
    const response = await api.post('/office/early-access', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data?.data || response.data;
  },

  update: async (id, formData) => {
    const response = await api.put(`/office/early-access/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data?.data || response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/office/early-access/${id}`);
    return response.data?.data || response.data;
  },

  getRegistrations: async (id, page = 1, limit = 10) => {
    const response = await api.get(`/office/early-access/${id}/registrations`, { params: { page, limit } });
    return response.data?.data || response.data;
  },
};

export default earlyAccessService;
