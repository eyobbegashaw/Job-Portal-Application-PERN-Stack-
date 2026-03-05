import api from './api';

export const jobService = {
  // Job listings
  getActiveJobs: async (filters = {}) => {
    const response = await api.get('/jobs/active', { params: filters });
    return response.data;
  },

  getJobById: async (id) => {
    const response = await api.get(`/jobs/${id}`);
    return response.data;
  },

  getJobsByCompany: async (companyName) => {
    const response = await api.get(`/jobs/company/${companyName}`);
    return response.data;
  },

  // Job posting (for companies)
  createJob: async (jobData) => {
    const response = await api.post('/jobs', jobData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  updateJob: async (id, jobData) => {
    const response = await api.put(`/jobs/${id}`, jobData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  deleteJob: async (id) => {
    const response = await api.delete(`/jobs/${id}`);
    return response.data;
  },

  // Saved jobs
  getSavedJobs: async () => {
    const response = await api.get('/jobs/saved/list');
    return response.data;
  },

  saveJob: async (jobId) => {
    const response = await api.post(`/jobs/${jobId}/save`);
    return response.data;
  },

  unsaveJob: async (jobId) => {
    const response = await api.delete(`/jobs/${jobId}/save`);
    return response.data;
  },

  // Applications
  applyForJob: async (jobId, applicationData) => {
    const response = await api.post(`/jobs/${jobId}/apply`, applicationData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  getJobApplications: async (jobId) => {
    const response = await api.get(`/jobs/${jobId}/applications`);
    return response.data;
  },

  updateApplicationStatus: async (applicationId, status) => {
    const response = await api.put(`/jobs/applications/${applicationId}/status`, { status });
    return response.data;
  },

  // Search and filter
  searchJobs: async (query) => {
    const response = await api.get('/jobs/search', { params: { q: query } });
    return response.data;
  },

  getJobCategories: async () => {
    const response = await api.get('/jobs/categories');
    return response.data;
  }
};