import api from './api';

export const assetService = {
  // Public endpoints
  listPublic: async (page = 1, limit = 10, filters = {}) => {
    const response = await api.get('/assets', { params: { page, limit, ...filters } });
    return response.data?.data || response.data;
  },

  getPublic: async (id) => {
    const response = await api.get(`/assets/${id}`);
    return response.data?.data || response.data;
  },

  // Admin endpoints
  listAdmin: async (page = 1, limit = 10, filters = {}) => {
    const response = await api.get('/office/assets', { params: { page, limit, ...filters } });
    return response.data?.data || response.data;
  },

  create: async (formData) => {
    const response = await api.post('/office/assets', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data?.data || response.data;
  },

  update: async (id, formData) => {
    const response = await api.put(`/office/assets/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data?.data || response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/office/assets/${id}`);
    return response.data?.data || response.data;
  },

  updateStatus: async (id, status) => {
    const response = await api.patch(`/office/assets/${id}/status`, { status });
    return response.data?.data || response.data;
  },
};

export default assetService;
