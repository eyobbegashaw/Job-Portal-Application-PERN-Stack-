import React, { useState } from 'react';
import JobList from '../components/jobs/JobList';
import JobFilters from '../components/jobs/JobFilters';
import { useJobs } from '../contexts/JobContext';
import { useAuth } from '../contexts/AuthContext';

const JobsPage = () => {
  const { jobs, loading, savedJobs, saveJob, unsaveJob, updateFilters } = useJobs();
  const { user } = useAuth();

  const handleSaveJob = async (jobId) => {
    if (savedJobs.includes(jobId)) {
      await unsaveJob(jobId);
    } else {
      await saveJob(jobId);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Browse Jobs</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <JobFilters onFilterChange={updateFilters} />
        </div>

        {/* Job Listings */}
        <div className="lg:col-span-3">
          <JobList
            jobs={jobs}
            loading={loading}
            onSaveJob={handleSaveJob}
            savedJobs={savedJobs}
          />
        </div>
      </div>
    </div>
  );
};

export default JobsPage;