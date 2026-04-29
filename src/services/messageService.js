import api from './api';

export const messageService = {
  // Public
  submit: async (messageData) => {
    const response = await api.post('/messages', messageData);
    return response.data?.data || response.data;
  },

  // Admin
  list: async (page = 1, limit = 10, filters = {}) => {
    const response = await api.get('/office/messages', { params: { page, limit, ...filters } });
    return response.data?.data || response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/office/messages/${id}`);
    return response.data?.data || response.data;
  },

  delete: async (id) => {
    const response = await api.delete(`/office/messages/${id}`);
    return response.data?.data || response.data;
  },
};

export default messageService;
