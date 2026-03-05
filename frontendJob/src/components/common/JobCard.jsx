import React from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow, format } from 'date-fns';
import { FaMapMarkerAlt, FaBriefcase, FaClock, FaBuilding, FaHeart, FaRegHeart } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';

const JobCard = ({ job, onSave, isSaved = false, showSaveButton = true }) => {
  const { user, isJobSeeker } = useAuth();

  const handleSaveClick = (e) => {
    e.preventDefault();
    if (onSave) {
      onSave(job.id);
    }
  };

  return (
    <Link to={`/jobs/${job.id}`}>
      <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 mb-4">
        <div className="flex items-start space-x-4">
          {/* Company Logo */}
          <div className="flex-shrink-0">
            {job.logoFilePath ? (
              <img
                src={job.logoFilePath}
                alt={job.companyName}
                className="w-16 h-16 object-contain rounded"
              />
            ) : (
              <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center">
                <FaBuilding className="h-8 w-8 text-gray-400" />
              </div>
            )}
          </div>

          {/* Job Details */}
          <div className="flex-1">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 hover:text-primary-600 transition-colors">
                  {job.title}
                </h3>
                <p className="text-gray-600">{job.companyName}</p>
              </div>

              {/* Save Button */}
              {showSaveButton && isJobSeeker && (
                <button
                  onClick={handleSaveClick}
                  className={`p-2 rounded-full transition-colors ${
                    isSaved
                      ? 'text-red-500 hover:text-red-600'
                      : 'text-gray-400 hover:text-gray-500'
                  }`}
                >
                  {isSaved ? <FaHeart className="h-5 w-5" /> : <FaRegHeart className="h-5 w-5" />}
                </button>
              )}
            </div>

            {/* Job Meta */}
            <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-500">
              <span className="flex items-center">
                <FaMapMarkerAlt className="mr-1" /> {job.location}
              </span>
              <span className="flex items-center">
                <FaBriefcase className="mr-1" /> {job.jobType}
              </span>
              <span className="flex items-center">
                <FaClock className="mr-1" />
                {new Date(job.deadline) > new Date() ? (
                  <>Deadline: {format(new Date(job.deadline), 'MMM dd, yyyy')}</>
                ) : (
                  <span className="text-red-500">Expired</span>
                )}
              </span>
            </div>

            {/* Description Preview */}
            <p className="mt-3 text-gray-700 line-clamp-2">
              {job.description}
            </p>

            {/* Tags */}
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                {job.vacancies} {job.vacancies === 1 ? 'vacancy' : 'vacancies'}
              </span>
              {job.salaryRange && (
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                  {job.salaryRange}
                </span>
              )}
              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                {job.experience}+ years exp.
              </span>
            </div>

            {/* Posted Time */}
            <div className="mt-4 text-xs text-gray-400">
              Posted {formatDistanceToNow(new Date(job.postedDate), { addSuffix: true })}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default JobCard;