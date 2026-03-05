export const USER_TYPES = {
  JOBSEEKER: 'jobseeker',
  COMPANY: 'company',
  ADMIN: 'admin'
};

export const USER_STATUS = {
  PENDING: 'Pending',
  APPROVED: 'Approved',
  REJECTED: 'Rejected'
};

export const JOB_TYPES = [
  'Full-time',
  'Part-time',
  'Contract',
  'Internship',
  'Remote',
  'Freelance'
];

export const EXPERIENCE_LEVELS = [
  'Entry Level',
  'Mid Level',
  'Senior Level',
  'Lead',
  'Manager',
  'Director',
  'Executive'
];

export const APPLICATION_STATUS = {
  PENDING: 'pending',
  REVIEWED: 'reviewed',
  ACCEPTED: 'accepted',
  REJECTED: 'rejected'
};

export const SALARY_RANGES = [
  'Under $30k',
  '$30k - $50k',
  '$50k - $70k',
  '$70k - $90k',
  '$90k - $120k',
  '$120k - $150k',
  'Above $150k'
];

export const EDUCATION_LEVELS = [
  'High School',
  'Associate Degree',
  'Bachelor\'s Degree',
  'Master\'s Degree',
  'PhD',
  'Certificate',
  'Diploma'
];

export const FILE_SIZE_LIMITS = {
  PROFILE_IMAGE: 5 * 1024 * 1024, // 5MB
  COMPANY_LOGO: 5 * 1024 * 1024, // 5MB
  RESUME: 10 * 1024 * 1024, // 10MB
  COVER_LETTER: 5 * 1024 * 1024 // 5MB
};

export const ALLOWED_FILE_TYPES = {
  IMAGES: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'],
  DOCUMENTS: ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  ALL: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
};

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    ME: '/auth/me',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    CHANGE_PASSWORD: '/auth/change-password'
  },
  JOBS: {
    ACTIVE: '/jobs/active',
    BY_COMPANY: '/jobs/company',
    CREATE: '/jobs',
    SAVED: '/jobs/saved/list',
    SAVE: (id) => `/jobs/${id}/save`,
    APPLY: (id) => `/jobs/${id}/apply`,
    APPLICATIONS: (id) => `/jobs/${id}/applications`
  },
  ADMIN: {
    PENDING_USERS: '/admin/users/pending',
    USERS: '/admin/users',
    APPROVE_USER: (email) => `/admin/users/${email}/approve`,
    REJECT_USER: (email) => `/admin/users/${email}/reject`,
    COMPANIES: '/admin/companies',
    DASHBOARD: '/admin/dashboard/stats'
  },
  USER: {
    PROFILE: '/users/profile',
    APPLICATIONS: '/users/applications',
    MESSAGES: '/users/messages',
    STATS: '/users/stats'
  }
};

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  DASHBOARD: '/dashboard',
  JOBS: '/jobs',
  JOB_DETAILS: (id) => `/jobs/${id}`,
  POST_JOB: '/post-job',
  SAVED_JOBS: '/saved-jobs',
  PROFILE: '/profile',
  ADMIN: '/admin',
  FORGOT_PASSWORD: '/forgot-password',
  NOT_FOUND: '/404'
};

export const TOAST_MESSAGES = {
  LOGIN_SUCCESS: 'Login successful!',
  LOGIN_ERROR: 'Login failed. Please check your credentials.',
  REGISTER_SUCCESS: 'Registration successful!',
  REGISTER_ERROR: 'Registration failed. Please try again.',
  JOB_SAVED: 'Job saved successfully!',
  JOB_UNSAVED: 'Job removed from saved.',
  APPLICATION_SUBMITTED: 'Application submitted successfully!',
  PROFILE_UPDATED: 'Profile updated successfully!',
  PASSWORD_CHANGED: 'Password changed successfully!',
  NETWORK_ERROR: 'Network error. Please check your connection.'
};