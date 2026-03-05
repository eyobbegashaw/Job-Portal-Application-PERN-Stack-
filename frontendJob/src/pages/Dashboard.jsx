import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { FaUser, FaBriefcase, FaHeart, FaClock } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();

  const stats = [
    { label: 'Profile Views', value: '124', icon: FaUser, change: '+12%' },
    { label: 'Applications', value: '8', icon: FaBriefcase, change: '+3' },
    { label: 'Saved Jobs', value: '15', icon: FaHeart, change: '+5' },
    { label: 'Pending', value: '3', icon: FaClock, change: '-2' },
  ];

  const recentActivity = [
    { action: 'Applied for Senior Developer at Tech Corp', time: '2 hours ago' },
    { action: 'Saved Frontend Engineer position', time: '5 hours ago' },
    { action: 'Profile viewed by Google', time: '1 day ago' },
    { action: 'Application status updated', time: '2 days ago' },
  ];

  const recommendedJobs = [
    { title: 'Senior React Developer', company: 'Tech Corp', location: 'Remote' },
    { title: 'Full Stack Engineer', company: 'Startup Inc', location: 'New York' },
    { title: 'UI/UX Designer', company: 'Design Studio', location: 'San Francisco' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user?.name}!
        </h1>
        <p className="text-gray-600 mt-2">
          Here's what's happening with your job search today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <stat.icon className="h-8 w-8 text-primary-600" />
              <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded">
                {stat.change}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
            <p className="text-gray-600 text-sm">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                  <p className="text-gray-700">{activity.action}</p>
                  <span className="text-sm text-gray-500">{activity.time}</span>
                </div>
              ))}
            </div>
            <button className="mt-4 text-primary-600 hover:text-primary-700 text-sm font-medium">
              View all activity →
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div>
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <Link
                to="/jobs"
                className="block w-full text-center bg-primary-600 text-white px-4 py-2 rounded-md hover:bg-primary-700"
              >
                Browse Jobs
              </Link>
              <Link
                to="/saved-jobs"
                className="block w-full text-center bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300"
              >
                View Saved Jobs
              </Link>
              <Link
                to="/profile"
                className="block w-full text-center bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300"
              >
                Update Profile
              </Link>
            </div>
          </div>

          {/* Recommended Jobs */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Recommended for You</h2>
            <div className="space-y-4">
              {recommendedJobs.map((job, index) => (
                <div key={index} className="pb-3 border-b last:border-0">
                  <h3 className="font-medium text-gray-900">{job.title}</h3>
                  <p className="text-sm text-gray-600">{job.company}</p>
                  <p className="text-xs text-gray-500 mt-1">{job.location}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;