const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const { authenticateToken, optionalAuth, authorizeCompanyOrAdmin, checkApproved } = require('../middleware/authMiddleware');
const { validateJobPost, validateIdParam, validatePagination } = require('../middleware/validationMiddleware');
const { uploadCompanyLogo, handleUploadError } = require('../middleware/uploadMiddleware');

// Public routes
router.get('/active', 
  optionalAuth,
  validatePagination,
  jobController.getActiveJobs
);

router.get('/:id', 
  validateIdParam,
  jobController.getJobById
);

router.get('/company/:companyName', 
  jobController.getJobsByCompany
);

// Protected routes (require authentication)
router.post('/', 
  authenticateToken,
  checkApproved,
  authorizeCompanyOrAdmin,
  uploadCompanyLogo,
  handleUploadError,
  validateJobPost,
  jobController.createJob
);

router.put('/:id',
  authenticateToken,
  checkApproved,
  validateIdParam,
  uploadCompanyLogo,
  handleUploadError,
  jobController.updateJob
);

router.delete('/:id',
  authenticateToken,
  validateIdParam,
  jobController.deleteJob
);

// Saved jobs routes
router.get('/saved/list',
  authenticateToken,
  jobController.getSavedJobs
);

router.post('/:jobId/save',
  authenticateToken,
  validateIdParam,
  jobController.saveJob
);

router.delete('/:jobId/save',
  authenticateToken,
  validateIdParam,
  jobController.unsaveJob
);

// Job applications
router.post('/:jobId/apply',
  authenticateToken,
  checkApproved,
  validateIdParam,
  jobController.applyForJob
);

router.get('/:jobId/applications',
  authenticateToken,
  authorizeCompanyOrAdmin,
  validateIdParam,
  jobController.getJobApplications
);

router.put('/applications/:applicationId/status',
  authenticateToken,
  authorizeCompanyOrAdmin,
  jobController.updateApplicationStatus
);

module.exports = router;