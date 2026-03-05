import api from './api';

export const userService = {
  // Profile management
  getProfile: async () => {
    const response = await api.get('/users/profile');
    return response.data;
  },

  updateProfile: async (profileData) => {
    const response = await api.put('/users/profile', profileData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  // Applications
  getMyApplications: async () => {
    const response = await api.get('/users/applications');
    return response.data;
  },

  getApplicationDetails: async (id) => {
    const response = await api.get(`/users/applications/${id}`);
    return response.data;
  },

  withdrawApplication: async (id) => {
    const response = await api.delete(`/users/applications/${id}`);
    return response.data;
  },

  // Messages
  getMessages: async () => {
    const response = await api.get('/users/messages');
    return response.data;
  },

  getMessageDetails: async (id) => {
    const response = await api.get(`/users/messages/${id}`);
    return response.data;
  },

  sendMessage: async (messageData) => {
    const response = await api.post('/users/messages', messageData);
    return response.data;
  },

  markMessageAsRead: async (id) => {
    const response = await api.put(`/users/messages/${id}/read`);
    return response.data;
  },

  deleteMessage: async (id) => {
    const response = await api.delete(`/users/messages/${id}`);
    return response.data;
  },

  // Statistics
  getUserStats: async () => {
    const response = await api.get('/users/stats');
    return response.data;
  },

  // Saved searches
  getSavedSearches: async () => {
    const response = await api.get('/users/saved-searches');
    return response.data;
  },

  saveSearch: async (searchData) => {
    const response = await api.post('/users/saved-searches', searchData);
    return response.data;
  },

  deleteSavedSearch: async (id) => {
    const response = await api.delete(`/users/saved-searches/${id}`);
    return response.data;
  }
};