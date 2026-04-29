import api from './api';

export const articleService = {
  // Public endpoints
  listPublic: async (page = 1, limit = 10, filters = {}) => {
    const response = await api.get('/articles', { params: { page, limit, ...filters } });
    return response.data?.data || response.data;
  },

  getPublic: async (id) => {
    const response = await api.get(`/articles/${id}`);
    return response.data?.data || response.data;
  },

  // Admin endpoints
  listAdmin: async (page = 1, limit = 10, filters = {}) => {
    const response = await api.get('/office/articles', { params: { page, limit, ...filters } });
    return response.data?.data || response.data;
  },

  create: async (formData) => {
    const response = await api.post('/office/articles', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data?.data || response.data;
  },

  update: async (id, formData) => {
    const response = await api.put(`/office/articles/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data?.data || response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/office/articles/${id}`);
    return response.data?.data || response.data;
  },

  toggleStatus: async (id, status) => {
    const response = await api.patch(`/office/articles/${id}/status`, { status });
    return response.data?.data || response.data;
  },
};

export default articleService;
