import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import LoadingSpinner from './LoadingSpinner';

const PrivateRoute = ({ children, allowedTypes = [] }) => {
  const { isAuthenticated, loading, user, isApproved, isPending } = useAuth();

  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Check if user type is allowed
  if (allowedTypes.length > 0 && !allowedTypes.includes(user?.userType)) {
    return <Navigate to="/dashboard" replace />;
  }

  // Check approval status for non-admin users
  if (user?.userType !== 'admin') {
    if (isPending) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Account Pending Approval</h2>
            <p className="text-gray-600">
              Your account is waiting for admin approval. You'll be notified once approved.
            </p>
          </div>
        </div>
      );
    }

    if (!isApproved) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-2">Account Rejected</h2>
            <p className="text-gray-600">
              Your account has been rejected. Please contact support for more information.
            </p>
          </div>
        </div>
      );
    }
  }

  return children;
};

export default PrivateRoute;