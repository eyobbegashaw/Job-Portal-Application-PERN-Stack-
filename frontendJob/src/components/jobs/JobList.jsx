import React from 'react';
import JobCard from '../common/JobCard';
import LoadingSpinner from '../common/LoadingSpinner';

const JobList = ({ jobs, loading, onSaveJob, savedJobs = [] }) => {
  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (jobs.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow">
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900">No jobs found</h3>
        <p className="mt-1 text-sm text-gray-500">
          Try adjusting your search or filters
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-sm text-gray-600 mb-4">
        Found <span className="font-semibold">{jobs.length}</span> jobs
      </div>
      {jobs.map((job) => (
        <JobCard
          key={job.id}
          job={job}
          onSave={onSaveJob}
          isSaved={savedJobs.includes(job.id)}
        />
      ))}
    </div>
  );
};

export default JobList;