import api from './api';

export const userService = {
  list: async (page = 1, limit = 10, filters = {}) => {
    const response = await api.get('/office/users', { params: { page, limit, ...filters } });
    return response.data?.data || response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/office/users/${id}`);
    return response.data?.data || response.data;
  },

  create: async (userData) => {
    const response = await api.post('/office/users', userData);
    return response.data?.data || response.data;
  },

  update: async (id, userData) => {
    const response = await api.put(`/office/users/${id}`, userData);
    return response.data?.data || response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/office/users/${id}`);
    return response.data?.data || response.data;
  },

  updateRole: async (id, role) => {
    const response = await api.patch(`/office/users/${id}/role`, { role });
    return response.data?.data || response.data;
  },

  exportExcel: async () => {
    return api.get('/office/users/export/excel', { responseType: 'blob' });
  },

  importExcel: async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    const response = await api.post('/office/users/import/excel', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data?.data || response.data;
  },

  getImportTemplate: async () => {
    return api.get('/office/users/import/template', { responseType: 'blob' });
  },
};

export default userService;
