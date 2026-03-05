const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticateToken } = require('../middleware/authMiddleware');
const { uploadProfileImage, handleUploadError } = require('../middleware/uploadMiddleware');

// All user routes require authentication
router.use(authenticateToken);

// Profile management
router.get('/profile', userController.getProfile);
router.put('/profile', 
  uploadProfileImage,
  handleUploadError,
  userController.updateProfile
);

// Applications
router.get('/applications', userController.getMyApplications);
router.get('/applications/:id', userController.getApplicationDetails);

// Messages
router.get('/messages', userController.getMessages);
router.get('/messages/:id', userController.getMessageDetails);
router.post('/messages', userController.sendMessage);
router.put('/messages/:id/read', userController.markMessageAsRead);

// Statistics
router.get('/stats', userController.getUserStats);

module.exports = router;