import api from './api';

export const galleryService = {
  // Public
  listPublic: async () => {
    const response = await api.get('/gallery');
    return response.data?.data || response.data;
  },

  // Admin
  listAdmin: async (page = 1, limit = 10) => {
    const response = await api.get('/office/gallery', { params: { page, limit } });
    return response.data?.data || response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/office/gallery/${id}`);
    return response.data?.data || response.data;
  },

  create: async (formData) => {
    const response = await api.post('/office/gallery', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data?.data || response.data;
  },

  update: async (id, formData) => {
    const response = await api.put(`/office/gallery/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data?.data || response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/office/gallery/${id}`);
    return response.data?.data || response.data;
  },
};

export default galleryService;
