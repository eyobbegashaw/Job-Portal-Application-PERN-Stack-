import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { jobService } from '../../services/jobService';
import { adminService } from '../../services/adminService';
import { useAuth } from '../../contexts/AuthContext';
import Alert from '../common/Alert';

const PostJobForm = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [alert, setAlert] = useState({ show: false, type: '', message: '' });
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const data = await adminService.getCompanies();
      setCompanies(data);
    } catch (error) {
      console.error('Error fetching companies:', error);
    }
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      
      // Append all form fields
      Object.keys(data).forEach(key => {
        if (key === 'logo' && data[key][0]) {
          formData.append('logo', data[key][0]);
        } else if (data[key]) {
          formData.append(key, data[key]);
        }
      });

      await jobService.createJob(formData);
      setAlert({ show: true, type: 'success', message: 'Job posted successfully!' });
      setTimeout(() => navigate('/jobs'), 2000);
    } catch (error) {
      setAlert({ 
        show: true, 
        type: 'error', 
        message: error.response?.data?.error || 'Failed to post job' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {alert.show && (
        <Alert 
          type={alert.type} 
          message={alert.message} 
          onClose={() => setAlert({ show: false, type: '', message: '' })}
        />
      )}

      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Post a New Job</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Company Selection/Display */}
          {user?.userType === 'admin' ? (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company *
              </label>
              <select
                {...register('companyName', { required: 'Please select a company' })}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="">Select a company</option>
                {companies.map(company => (
                  <option key={company.id} value={company.name}>
                    {company.name}
                  </option>
                ))}
              </select>
              {errors.companyName && (
                <p className="error-text">{errors.companyName.message}</p>
              )}
            </div>
          ) : (
            <input
              type="hidden"
              {...register('companyName')}
              value={user?.companyName}
            />
          )}

          {/* Company Logo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company Logo
            </label>
            <input
              type="file"
              {...register('logo')}
              accept="image/*"
              className="w-full"
            />
          </div>

          {/* Job Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Title *
            </label>
            <input
              type="text"
              {...register('title', { 
                required: 'Job title is required',
                minLength: {
                  value: 5,
                  message: 'Title must be at least 5 characters'
                }
              })}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                errors.title ? 'border-red-500' : ''
              }`}
              placeholder="e.g., Senior Software Engineer"
            />
            {errors.title && (
              <p className="error-text">{errors.title.message}</p>
            )}
          </div>

          {/* Job Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Job Description *
            </label>
            <textarea
              rows="6"
              {...register('description', { 
                required: 'Description is required',
                minLength: {
                  value: 50,
                  message: 'Description must be at least 50 characters'
                }
              })}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                errors.description ? 'border-red-500' : ''
              }`}
              placeholder="Describe the role, responsibilities, and what you're looking for..."
            />
            {errors.description && (
              <p className="error-text">{errors.description.message}</p>
            )}
          </div>

          {/* Job Type and Vacancies */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Type *
              </label>
              <select
                {...register('jobType', { required: 'Job type is required' })}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                  errors.jobType ? 'border-red-500' : ''
                }`}
              >
                <option value="">Select type</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
                <option value="Remote">Remote</option>
              </select>
              {errors.jobType && (
                <p className="error-text">{errors.jobType.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Number of Vacancies *
              </label>
              <input
                type="number"
                min="1"
                {...register('vacancies', { 
                  required: 'Vacancies is required',
                  min: { value: 1, message: 'Must be at least 1' }
                })}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                  errors.vacancies ? 'border-red-500' : ''
                }`}
              />
              {errors.vacancies && (
                <p className="error-text">{errors.vacancies.message}</p>
              )}
            </div>
          </div>

          {/* Qualifications and Skills */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Qualifications *
            </label>
            <textarea
              rows="3"
              {...register('qualifications', { 
                required: 'Qualifications are required',
                minLength: {
                  value: 20,
                  message: 'Qualifications must be at least 20 characters'
                }
              })}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                errors.qualifications ? 'border-red-500' : ''
              }`}
              placeholder="List required qualifications (education, certifications, etc.)"
            />
            {errors.qualifications && (
              <p className="error-text">{errors.qualifications.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Required Skills *
            </label>
            <textarea
              rows="3"
              {...register('skills', { 
                required: 'Skills are required',
                minLength: {
                  value: 10,
                  message: 'Skills must be at least 10 characters'
                }
              })}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                errors.skills ? 'border-red-500' : ''
              }`}
              placeholder="List required skills (comma-separated)"
            />
            {errors.skills && (
              <p className="error-text">{errors.skills.message}</p>
            )}
          </div>

          {/* Experience and Salary */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Experience Required (years) *
              </label>
              <input
                type="number"
                min="0"
                step="1"
                {...register('experience', { 
                  required: 'Experience is required',
                  min: { value: 0, message: 'Must be 0 or more' },
                  max: { value: 50, message: 'Must be 50 or less' }
                })}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                  errors.experience ? 'border-red-500' : ''
                }`}
              />
              {errors.experience && (
                <p className="error-text">{errors.experience.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Salary Range
              </label>
              <input
                type="text"
                {...register('salaryRange')}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="e.g., $50,000 - $70,000"
              />
            </div>
          </div>

          {/* Deadline and Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Application Deadline *
              </label>
              <input
                type="date"
                {...register('deadline', { 
                  required: 'Deadline is required',
                  validate: value => new Date(value) > new Date() || 'Deadline must be in the future'
                })}
                min={new Date().toISOString().split('T')[0]}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                  errors.deadline ? 'border-red-500' : ''
                }`}
              />
              {errors.deadline && (
                <p className="error-text">{errors.deadline.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location *
              </label>
              <input
                type="text"
                {...register('location', { 
                  required: 'Location is required',
                  minLength: {
                    value: 3,
                    message: 'Location must be at least 3 characters'
                  }
                })}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                  errors.location ? 'border-red-500' : ''
                }`}
                placeholder="e.g., New York, NY or Remote"
              />
              {errors.location && (
                <p className="error-text">{errors.location.message}</p>
              )}
            </div>
          </div>

          {/* Application Method */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Application Method *
            </label>
            <select
              {...register('method', { required: 'Application method is required' })}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                errors.method ? 'border-red-500' : ''
              }`}
            >
              <option value="">Select method</option>
              <option value="online">Online Application</option>
              <option value="email">Email</option>
              <option value="in-person">In-person</option>
              <option value="website">Company Website</option>
            </select>
            {errors.method && (
              <p className="error-text">{errors.method.message}</p>
            )}
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() => navigate('/jobs')}
              className="px-6 py-2 border rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:opacity-50"
            >
              {isLoading ? 'Posting...' : 'Post Job'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostJobForm;