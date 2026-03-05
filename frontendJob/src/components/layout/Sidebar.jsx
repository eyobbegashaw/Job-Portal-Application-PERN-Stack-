import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import {
  FaTachometerAlt,
  FaBriefcase,
  FaHeart,
  FaBuilding,
  FaUser,
  FaCog,
  FaUsers,
  FaChartBar,
  FaEnvelope,
  FaFileAlt,
  FaSignOutAlt
} from 'react-icons/fa';

const Sidebar = ({ isOpen, onClose }) => {
  const { user, isAdmin, isCompany, isJobSeeker, logout } = useAuth();

  const jobSeekerLinks = [
    { to: '/dashboard', icon: FaTachometerAlt, label: 'Dashboard' },
    { to: '/jobs', icon: FaBriefcase, label: 'Browse Jobs' },
    { to: '/saved-jobs', icon: FaHeart, label: 'Saved Jobs' },
    { to: '/applications', icon: FaFileAlt, label: 'My Applications' },
    { to: '/messages', icon: FaEnvelope, label: 'Messages' },
    { to: '/profile', icon: FaUser, label: 'Profile' },
    { to: '/settings', icon: FaCog, label: 'Settings' },
  ];

  const companyLinks = [
    { to: '/dashboard', icon: FaTachometerAlt, label: 'Dashboard' },
    { to: '/jobs', icon: FaBriefcase, label: 'My Jobs' },
    { to: '/post-job', icon: FaBuilding, label: 'Post a Job' },
    { to: '/applications', icon: FaFileAlt, label: 'Applications' },
    { to: '/messages', icon: FaEnvelope, label: 'Messages' },
    { to: '/profile', icon: FaUser, label: 'Profile' },
    { to: '/settings', icon: FaCog, label: 'Settings' },
  ];

  const adminLinks = [
    { to: '/admin', icon: FaTachometerAlt, label: 'Dashboard' },
    { to: '/admin/users', icon: FaUsers, label: 'Users' },
    { to: '/admin/companies', icon: FaBuilding, label: 'Companies' },
    { to: '/admin/jobs', icon: FaBriefcase, label: 'Jobs' },
    { to: '/admin/analytics', icon: FaChartBar, label: 'Analytics' },
    { to: '/admin/settings', icon: FaCog, label: 'Settings' },
  ];

  let links = [];
  if (isAdmin) links = adminLinks;
  else if (isCompany) links = companyLinks;
  else if (isJobSeeker) links = jobSeekerLinks;

  const sidebarClasses = `fixed lg:static inset-y-0 left-0 transform ${
    isOpen ? 'translate-x-0' : '-translate-x-full'
  } lg:translate-x-0 transition duration-200 ease-in-out z-40 w-64 bg-white dark:bg-gray-800 shadow-lg overflow-y-auto`;

  return (
    <aside className={sidebarClasses}>
      <div className="h-full flex flex-col">
        {/* User info */}
        <div className="p-4 border-b dark:border-gray-700">
          <div className="flex items-center space-x-3">
            {user?.profileImagePath ? (
              <img
                src={user.profileImagePath}
                alt={user.name}
                className="h-10 w-10 rounded-full object-cover"
              />
            ) : (
              <div className="h-10 w-10 rounded-full bg-primary-600 flex items-center justify-center">
                <span className="text-white font-semibold">
                  {user?.name?.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {user?.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {user?.email}
              </p>
            </div>
          </div>
          <div className="mt-2">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200 capitalize">
              {user?.userType}
            </span>
            {user?.status && (
              <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                user.status === 'Approved' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                user.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
              }`}>
                {user.status}
              </span>
            )}
          </div>
        </div>

        {/* Navigation links */}
        <nav className="flex-1 px-2 py-4 space-y-1">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                  isActive
                    ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-200'
                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`
              }
            >
              <link.icon className="mr-3 h-5 w-5" />
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Logout button */}
        <div className="p-4 border-t dark:border-gray-700">
          <button
            onClick={logout}
            className="flex items-center w-full px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          >
            <FaSignOutAlt className="mr-3 h-5 w-5" />
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;