import api from './api';

export const activityLogService = {
  list: async (page = 1, limit = 20, filters = {}) => {
    const response = await api.get('/office/activity-log', { params: { page, limit, ...filters } });
    return response.data?.data || response.data;
  },

  clear: async () => {
    const response = await api.delete('/office/activity-log');
    return response.data?.data || response.data;
  },

  export: async (format = 'csv') => {
    return api.get('/office/activity-log/export', {
      params: { format },
      responseType: 'blob',
    });
  },
};

export const dashboardService = {
  getStats: async () => {
    const response = await api.get('/office/dashboard/stats');
    return response.data?.data || response.data;
  },

  getAssetTrends: async () => {
    const response = await api.get('/office/dashboard/asset-trends');
    return response.data?.data || response.data;
  },

  getAssetDistribution: async () => {
    const response = await api.get('/office/dashboard/asset-distribution');
    return response.data?.data || response.data;
  },

  getUserGrowth: async () => {
    const response = await api.get('/office/dashboard/user-growth');
    return response.data?.data || response.data;
  },
};

export default { activityLogService, dashboardService };
