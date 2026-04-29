import api from './api';

export const settingsService = {
  // Profile
  getProfile: async () => {
    const response = await api.get('/office/settings/profile');
    return response.data?.data || response.data;
  },

  updateProfile: async (data) => {
    const response = await api.put('/office/settings/profile', data);
    return response.data?.data || response.data;
  },

  // Organization
  getOrganization: async () => {
    const response = await api.get('/office/settings/organization');
    return response.data?.data || response.data;
  },

  addOrganization: async (formData) => {
    const response = await api.post('/office/settings/organization', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data?.data || response.data;
  },

  updateOrganization: async (id, formData) => {
    const response = await api.put(`/office/settings/organization/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data?.data || response.data;
  },

  deleteOrganization: async (id) => {
    const response = await api.delete(`/office/settings/organization/${id}`);
    return response.data?.data || response.data;
  },

  // Services
  getServices: async () => {
    const response = await api.get('/office/settings/services');
    return response.data?.data || response.data;
  },

  addService: async (data) => {
    const response = await api.post('/office/settings/services', data);
    return response.data?.data || response.data;
  },

  updateService: async (id, data) => {
    const response = await api.put(`/office/settings/services/${id}`, data);
    return response.data?.data || response.data;
  },

  deleteService: async (id) => {
    const response = await api.delete(`/office/settings/services/${id}`);
    return response.data?.data || response.data;
  },

  // Know Us
  getKnowUs: async () => {
    const response = await api.get('/office/settings/know-us');
    return response.data?.data || response.data;
  },

  addKnowUs: async (data) => {
    const response = await api.post('/office/settings/know-us', data);
    return response.data?.data || response.data;
  },

  updateKnowUs: async (id, data) => {
    const response = await api.put(`/office/settings/know-us/${id}`, data);
    return response.data?.data || response.data;
  },

  deleteKnowUs: async (id) => {
    const response = await api.delete(`/office/settings/know-us/${id}`);
    return response.data?.data || response.data;
  },

  // Benefits
  getBenefits: async () => {
    const response = await api.get('/office/settings/benefits');
    return response.data?.data || response.data;
  },

  addBenefit: async (data) => {
    const response = await api.post('/office/settings/benefits', data);
    return response.data?.data || response.data;
  },

  updateBenefit: async (id, data) => {
    const response = await api.put(`/office/settings/benefits/${id}`, data);
    return response.data?.data || response.data;
  },

  deleteBenefit: async (id) => {
    const response = await api.delete(`/office/settings/benefits/${id}`);
    return response.data?.data || response.data;
  },
};

export default settingsService;
