import api from './api';

export const adminService = {
  // Dashboard
  getDashboardStats: async (timeRange = 'week') => {
    const response = await api.get(`/admin/dashboard/stats?range=${timeRange}`);
    return response.data;
  },

  // User Management
  getPendingUsers: async () => {
    const response = await api.get('/admin/users/pending');
    return response.data;
  },

  getAllUsers: async (filters = {}) => {
    const response = await api.get('/admin/users', { params: filters });
    return response.data;
  },

  approveUser: async (email) => {
    const response = await api.put(`/admin/users/${email}/approve`);
    return response.data;
  },

  rejectUser: async (email) => {
    const response = await api.put(`/admin/users/${email}/reject`);
    return response.data;
  },

  // Company Management
  getCompanies: async () => {
    const response = await api.get('/admin/companies');
    return response.data;
  },

  addCompany: async (companyData) => {
    const response = await api.post('/admin/companies', companyData);
    return response.data;
  },

  deleteCompany: async (id) => {
    const response = await api.delete(`/admin/companies/${id}`);
    return response.data;
  },

  // Analytics
  getUserAnalytics: async () => {
    const response = await api.get('/admin/analytics/users');
    return response.data;
  },

  getJobAnalytics: async () => {
    const response = await api.get('/admin/analytics/jobs');
    return response.data;
  },

  getApplicationAnalytics: async () => {
    const response = await api.get('/admin/analytics/applications');
    return response.data;
  }
};