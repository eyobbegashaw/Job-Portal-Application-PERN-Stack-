import React, { createContext, useState, useContext, useEffect } from 'react';
import { jobService } from '../services/jobService';
import { useAuth } from './AuthContext';

const JobContext = createContext();

export const useJobs = () => {
  const context = useContext(JobContext);
  if (!context) {
    throw new Error('useJobs must be used within a JobProvider');
  }
  return context;
};

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({});
  const [savedJobs, setSavedJobs] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    fetchJobs();
  }, [filters]);

  useEffect(() => {
    if (user) {
      fetchSavedJobs();
    }
  }, [user]);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const data = await jobService.getActiveJobs(filters);
      setJobs(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch jobs');
    } finally {
      setLoading(false);
    }
  };

  const fetchSavedJobs = async () => {
    try {
      const data = await jobService.getSavedJobs();
      setSavedJobs(data.map(item => item.job.id));
    } catch (err) {
      console.error('Error fetching saved jobs:', err);
    }
  };

  const saveJob = async (jobId) => {
    try {
      await jobService.saveJob(jobId);
      setSavedJobs(prev => [...prev, jobId]);
      return true;
    } catch (err) {
      throw err;
    }
  };

  const unsaveJob = async (jobId) => {
    try {
      await jobService.unsaveJob(jobId);
      setSavedJobs(prev => prev.filter(id => id !== jobId));
      return true;
    } catch (err) {
      throw err;
    }
  };

  const updateFilters = (newFilters) => {
    setFilters(newFilters);
  };

  const value = {
    jobs,
    loading,
    error,
    filters,
    savedJobs,
    saveJob,
    unsaveJob,
    updateFilters,
    refreshJobs: fetchJobs
  };

  return (
    <JobContext.Provider value={value}>
      {children}
    </JobContext.Provider>
  );
};