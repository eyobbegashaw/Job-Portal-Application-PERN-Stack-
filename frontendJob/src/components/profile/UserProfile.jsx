import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { userService } from '../../services/userService';
import ProfileImage from './ProfileImage';
import EditProfile from './EditProfile';
import LoadingSpinner from '../common/LoadingSpinner';
import Alert from '../common/Alert';
import { 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaGlobe, 
  FaLinkedin, 
  FaGithub,
  FaBriefcase,
  FaGraduationCap,
  FaStar,
  FaEdit
} from 'react-icons/fa';

const UserProfile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [stats, setStats] = useState(null);
  const [alert, setAlert] = useState({ show: false, type: '', message: '' });

  useEffect(() => {
    fetchProfileData();
    fetchUserStats();
  }, []);

  const fetchProfileData = async () => {
    try {
      setLoading(true);
      const data = await userService.getProfile();
      setProfileData(data);
    } catch (error) {
      setAlert({ show: true, type: 'error', message: 'Failed to load profile data' });
    } finally {
      setLoading(false);
    }
  };

  const fetchUserStats = async () => {
    try {
      const data = await userService.getUserStats();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (isEditing) {
    return (
      <EditProfile 
        onCancel={() => setIsEditing(false)}
        onSuccess={() => {
          setIsEditing(false);
          fetchProfileData();
        }}
      />
    );
  }

  const displayData = profileData || user;

  return (
    <div className="max-w-4xl mx-auto">
      {alert.show && (
        <Alert 
          type={alert.type} 
          message={alert.message} 
          onClose={() => setAlert({ show: false, type: '', message: '' })}
        />
      )}

      {/* Profile Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-6">
        {/* Cover Photo Placeholder */}
        <div className="h-32 bg-gradient-to-r from-primary-500 to-primary-700"></div>
        
        {/* Profile Info */}
        <div className="px-6 pb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-end -mt-16">
            <ProfileImage
              imageUrl={displayData?.profileImagePath}
              name={displayData?.name}
              size="xl"
            />
            
            <div className="mt-4 sm:mt-0 sm:ml-6 flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {displayData?.name}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400">
                    {displayData?.userType === 'company' ? displayData?.companyName : displayData?.title || 'Job Seeker'}
                  </p>
                </div>
                
                <button
                  onClick={() => setIsEditing(true)}
                  className="mt-2 sm:mt-0 inline-flex items-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
                >
                  <FaEdit className="mr-2" />
                  Edit Profile
                </button>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {displayData?.email && (
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <FaEnvelope className="mr-3 text-primary-600" />
                <span>{displayData.email}</span>
              </div>
            )}
            
            {displayData?.phone && (
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <FaPhone className="mr-3 text-primary-600" />
                <span>{displayData.phone}</span>
              </div>
            )}
            
            {displayData?.location && (
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <FaMapMarkerAlt className="mr-3 text-primary-600" />
                <span>{displayData.location}</span>
              </div>
            )}
            
            {displayData?.website && (
              <div className="flex items-center text-gray-600 dark:text-gray-400">
                <FaGlobe className="mr-3 text-primary-600" />
                <a 
                  href={displayData.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-primary-600 transition-colors"
                >
                  {displayData.website}
                </a>
              </div>
            )}
          </div>

          {/* Social Links */}
          <div className="mt-4 flex space-x-4">
            {displayData?.linkedin && (
              <a
                href={displayData.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-primary-600 transition-colors"
              >
                <FaLinkedin className="h-5 w-5" />
              </a>
            )}
            
            {displayData?.github && (
              <a
                href={displayData.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-primary-600 transition-colors"
              >
                <FaGithub className="h-5 w-5" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                <FaBriefcase className="h-6 w-6 text-blue-600 dark:text-blue-300" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">Applications</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalApplications}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
                <FaStar className="h-6 w-6 text-green-600 dark:text-green-300" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">Saved Jobs</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.savedJobs}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full">
                <FaGraduationCap className="h-6 w-6 text-purple-600 dark:text-purple-300" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">Profile Views</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.profileViews}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bio */}
      {displayData?.bio && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">About</h2>
          <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{displayData.bio}</p>
        </div>
      )}

      {/* Skills Section (for job seekers) */}
      {user?.userType === 'jobseeker' && displayData?.skills && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {displayData.skills.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;