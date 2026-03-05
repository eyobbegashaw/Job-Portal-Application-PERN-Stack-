import React from 'react';
import SavedJobsList from '../components/jobs/SavedJobsList';

const SavedJobsPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <SavedJobsList />
    </div>
  );
};

export default SavedJobsPage;