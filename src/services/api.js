import axios from 'axios';

// Get base URL from environment or use fallback
const BASE_URL = import.meta.env.VITE_BASE_URL_API || 'http://localhost:4004/api';

// Create axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach token automatically on requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('summacapital_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 globally (redirect to login)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('summacapital_token');
      localStorage.removeItem('summacapital_user');
      window.location.href = '/office/login';
    }
    return Promise.reject(error);
  }
);

export default api;

/**
 * Helper function to make API calls with fallback to dummy data
 * @param {Function} apiCall - Async function that makes the API request
 * @param {*} dummyData - Fallback dummy data if API fails
 * @returns {Promise} Resolved data or dummy data on error
 */
export const withFallback = async (apiCall, dummyData = null) => {
  try {
    const response = await apiCall();
    return response.data?.data || response.data || dummyData;
  } catch (error) {
    console.warn('API call failed, using fallback data:', error.message);
    return dummyData;
  }
};

/**
 * Helper for paginated list calls
 * Returns consistent shape: { data: [], meta: { page, limit, total, totalPages } }
 */
export const withPaginationFallback = async (apiCall, dummyData = [], page = 1, limit = 10) => {
  try {
    const response = await apiCall();
    const data = response.data?.data || response.data || dummyData;
    const meta = response.data?.meta || {
      page: parseInt(page),
      limit: parseInt(limit),
      total: Array.isArray(dummyData) ? dummyData.length : (dummyData?.length || 0),
      totalPages: Math.ceil((Array.isArray(dummyData) ? dummyData.length : (dummyData?.length || 0)) / limit),
    };
    return { data: Array.isArray(data) ? data : dummyData, meta };
  } catch (error) {
    console.warn('API call failed, using fallback pagination data:', error.message);
    const total = Array.isArray(dummyData) ? dummyData.length : 0;
    return {
      data: dummyData,
      meta: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
};
