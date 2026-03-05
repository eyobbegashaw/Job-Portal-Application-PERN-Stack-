import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { jobService } from '../../services/jobService';
import { useAuth } from '../../contexts/AuthContext';
import LoadingSpinner from '../common/LoadingSpinner';
import Alert from '../common/Alert';
import { 
  FaBuilding, FaMapMarkerAlt, FaBriefcase, FaClock, 
  FaDollarSign, FaGraduationCap, FaCode, FaCalendarAlt,
  FaArrowLeft, FaHeart, FaRegHeart, FaPaperPlane
} from 'react-icons/fa';
import { format } from 'date-fns';

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isJobSeeker } = useAuth();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [applying, setApplying] = useState(false);
  const [showApplicationForm, setShowApplicationForm] = useState(false);

  useEffect(() => {
    fetchJobDetails();
    if (isJobSeeker) {
      checkIfSaved();
    }
  }, [id]);

  const fetchJobDetails = async () => {
    try {
      setLoading(true);
      const data = await jobService.getJobById(id);
      setJob(data);
    } catch (error) {
      setError('Failed to load job details');
    } finally {
      setLoading(false);
    }
  };

  const checkIfSaved = async () => {
    try {
      const savedJobs = await jobService.getSavedJobs();
      setIsSaved(savedJobs.some(saved => saved.job.id === parseInt(id)));
    } catch (error) {
      console.error('Error checking saved status:', error);
    }
  };

  const handleSaveJob = async () => {
    try {
      if (isSaved) {
        await jobService.unsaveJob(id);
        setIsSaved(false);
      } else {
        await jobService.saveJob(id);
        setIsSaved(true);
      }
    } catch (error) {
      console.error('Error saving job:', error);
    }
  };

  const handleApply = () => {
    setShowApplicationForm(true);
  };

  const handleSubmitApplication = async (formData) => {
    setApplying(true);
    try {
      await jobService.applyForJob(id, formData);
      setShowApplicationForm(false);
      // Show success message
    } catch (error) {
      console.error('Error applying:', error);
    } finally {
      setApplying(false);
    }
  };

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Alert type="error" message={error} />
      </div>
    );
  }

  if (!job) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Job not found</h2>
          <button
            onClick={() => navigate('/jobs')}
            className="mt-4 text-primary-600 hover:text-primary-700"
          >
            Browse other jobs
          </button>
        </div>
      </div>
    );
  }

  const isExpired = new Date(job.deadline) < new Date();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center text-gray-600 hover:text-primary-600 mb-6"
      >
        <FaArrowLeft className="mr-2" />
        Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                {job.logoFilePath ? (
                  <img
                    src={job.logoFilePath}
                    alt={job.companyName}
                    className="w-20 h-20 object-contain rounded"
                  />
                ) : (
                  <div className="w-20 h-20 bg-gray-200 rounded flex items-center justify-center">
                    <FaBuilding className="h-10 w-10 text-gray-400" />
                  </div>
                )}
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
                  <p className="text-xl text-gray-600 mb-2">{job.companyName}</p>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <FaMapMarkerAlt className="mr-1" /> {job.location}
                    </span>
                    <span className="flex items-center">
                      <FaBriefcase className="mr-1" /> {job.jobType}
                    </span>
                    <span className="flex items-center">
                      <FaDollarSign className="mr-1" /> {job.salaryRange || 'Not specified'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-2">
                {isJobSeeker && !isExpired && (
                  <>
                    <button
                      onClick={handleSaveJob}
                      className={`p-3 rounded-full ${
                        isSaved
                          ? 'bg-red-100 text-red-600 hover:bg-red-200'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {isSaved ? <FaHeart /> : <FaRegHeart />}
                    </button>
                    <button
                      onClick={handleApply}
                      className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 flex items-center"
                    >
                      <FaPaperPlane className="mr-2" />
                      Apply Now
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Job Description</h2>
            <div className="prose max-w-none">
              <p className="text-gray-700 whitespace-pre-line">{job.description}</p>
            </div>
          </div>

          {/* Requirements */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Requirements</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900 mb-2 flex items-center">
                  <FaGraduationCap className="mr-2 text-primary-600" />
                  Qualifications
                </h3>
                <p className="text-gray-700 whitespace-pre-line">{job.qualifications}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-2 flex items-center">
                  <FaCode className="mr-2 text-primary-600" />
                  Skills Required
                </h3>
                <p className="text-gray-700 whitespace-pre-line">{job.skills}</p>
              </div>
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Experience</h3>
                <p className="text-gray-700">{job.experience}+ years</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          {/* Job Overview */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Job Overview</h2>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-500">Posted Date</div>
                <div className="font-medium flex items-center">
                  <FaCalendarAlt className="mr-2 text-primary-600" />
                  {format(new Date(job.postedDate), 'MMM dd, yyyy')}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Application Deadline</div>
                <div className={`font-medium flex items-center ${isExpired ? 'text-red-600' : ''}`}>
                  <FaClock className="mr-2 text-primary-600" />
                  {format(new Date(job.deadline), 'MMM dd, yyyy')}
                  {isExpired && ' (Expired)'}
                </div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Vacancies</div>
                <div className="font-medium">{job.vacancies} positions</div>
              </div>
              <div>
                <div className="text-sm text-gray-500">Application Method</div>
                <div className="font-medium capitalize">{job.method}</div>
              </div>
            </div>
          </div>

          {/* Company Info */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">About Company</h2>
            <p className="text-gray-700 mb-4">{job.companyName}</p>
            <button className="text-primary-600 hover:text-primary-700 font-medium">
              View company profile →
            </button>
          </div>
        </div>
      </div>

      {/* Application Modal */}
      {showApplicationForm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
                Apply for {job.title}
              </h3>
              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                handleSubmitApplication(Object.fromEntries(formData));
              }}>
                {/* Application form fields */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Cover Letter *
                    </label>
                    <textarea
                      name="coverLetter"
                      rows="6"
                      required
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Explain why you're a good fit for this position..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Resume/CV *
                    </label>
                    <input
                      type="file"
                      name="resume"
                      accept=".pdf,.doc,.docx"
                      required
                      className="w-full"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Accepted formats: PDF, DOC, DOCX (Max 5MB)
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Additional Information
                    </label>
                    <textarea
                      name="additionalInfo"
                      rows="3"
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="Any additional information you'd like to share..."
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowApplicationForm(false)}
                    className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={applying}
                    className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:opacity-50"
                  >
                    {applying ? 'Submitting...' : 'Submit Application'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDetails;