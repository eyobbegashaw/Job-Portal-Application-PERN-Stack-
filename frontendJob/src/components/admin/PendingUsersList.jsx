import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/adminService';
import LoadingSpinner from '../common/LoadingSpinner';
import Alert from '../common/Alert';
import { FaCheck, FaTimes, FaUser, FaBuilding } from 'react-icons/fa';

const PendingUsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState({});
  const [alert, setAlert] = useState({ show: false, type: '', message: '' });

  useEffect(() => {
    fetchPendingUsers();
  }, []);

  const fetchPendingUsers = async () => {
    try {
      setLoading(true);
      const data = await adminService.getPendingUsers();
      setUsers(data);
    } catch (error) {
      showAlert('error', 'Failed to fetch pending users');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (email) => {
    setProcessing(prev => ({ ...prev, [email]: true }));
    try {
      await adminService.approveUser(email);
      setUsers(users.filter(user => user.email !== email));
      showAlert('success', 'User approved successfully');
    } catch (error) {
      showAlert('error', 'Failed to approve user');
    } finally {
      setProcessing(prev => ({ ...prev, [email]: false }));
    }
  };

  const handleReject = async (email) => {
    if (window.confirm('Are you sure you want to reject this user?')) {
      setProcessing(prev => ({ ...prev, [email]: true }));
      try {
        await adminService.rejectUser(email);
        setUsers(users.filter(user => user.email !== email));
        showAlert('success', 'User rejected');
      } catch (error) {
        showAlert('error', 'Failed to reject user');
      } finally {
        setProcessing(prev => ({ ...prev, [email]: false }));
      }
    }
  };

  const showAlert = (type, message) => {
    setAlert({ show: true, type, message });
    setTimeout(() => setAlert({ show: false, type: '', message: '' }), 3000);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="bg-white rounded-lg shadow">
      {alert.show && (
        <Alert type={alert.type} message={alert.message} />
      )}

      <div className="p-6 border-b">
        <h2 className="text-xl font-semibold text-gray-900">
          Pending Approvals ({users.length})
        </h2>
      </div>

      {users.length === 0 ? (
        <div className="text-center py-12">
          <FaUser className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">No pending users</h3>
          <p className="mt-1 text-sm text-gray-500">
            All user requests have been processed.
          </p>
        </div>
      ) : (
        <div className="divide-y divide-gray-200">
          {users.map((user) => (
            <div key={user.email} className="p-6 hover:bg-gray-50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  {user.profileImagePath ? (
                    <img
                      src={user.profileImagePath}
                      alt={user.name}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center">
                      <span className="text-primary-600 text-lg font-semibold">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                  
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">{user.name}</h3>
                    <p className="text-gray-600">{user.email}</p>
                    <div className="mt-2 flex items-center space-x-3">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {user.userType}
                      </span>
                      {user.companyName && (
                        <span className="inline-flex items-center text-sm text-gray-500">
                          <FaBuilding className="mr-1" />
                          {user.companyName}
                        </span>
                      )}
                      <span className="text-sm text-gray-500">
                        Joined: {new Date(user.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => handleApprove(user.email)}
                    disabled={processing[user.email]}
                    className="p-2 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Approve"
                  >
                    <FaCheck className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleReject(user.email)}
                    disabled={processing[user.email]}
                    className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Reject"
                  >
                    <FaTimes className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PendingUsersList;