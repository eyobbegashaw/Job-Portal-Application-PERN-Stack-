import React, { useState, useEffect } from 'react';
import { jobService } from '../../services/jobService';
import JobCard from '../common/JobCard';
import LoadingSpinner from '../common/LoadingSpinner';
import Alert from '../common/Alert';
import { FaHeart } from 'react-icons/fa';

const SavedJobsList = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSavedJobs();
  }, []);

  const fetchSavedJobs = async () => {
    try {
      setLoading(true);
      const data = await jobService.getSavedJobs();
      setSavedJobs(data);
    } catch (error) {
      setError('Failed to load saved jobs');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveJob = async (jobId) => {
    try {
      await jobService.unsaveJob(jobId);
      setSavedJobs(savedJobs.filter(item => item.job.id !== jobId));
    } catch (error) {
      console.error('Error removing saved job:', error);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <Alert type="error" message={error} />;
  }

  if (savedJobs.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow">
        <FaHeart className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-sm font-medium text-gray-900">No saved jobs</h3>
        <p className="mt-1 text-sm text-gray-500">
          Start saving jobs you're interested in
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Saved Jobs</h2>
      {savedJobs.map((item) => (
        <div key={item.job.id} className="relative">
          <JobCard
            job={item.job}
            onSave={handleRemoveJob}
            isSaved={true}
          />
        </div>
      ))}
    </div>
  );
};

export default SavedJobsList;