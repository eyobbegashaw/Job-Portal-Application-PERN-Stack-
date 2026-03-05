const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticateToken } = require('../middleware/authMiddleware');
const { validateRegister, validateLogin } = require('../middleware/validationMiddleware');
const { uploadProfileImage, handleUploadError } = require('../middleware/uploadMiddleware');

// Public routes
router.post('/register', 
  uploadProfileImage,
  handleUploadError,
  validateRegister,
  authController.register
);

router.post('/login', 
  validateLogin,
  authController.login
);

// Protected routes
router.get('/me', 
  authenticateToken, 
  authController.getMe
);

router.post('/change-password',
  authenticateToken,
  authController.changePassword
);

router.post('/logout',
  authenticateToken,
  authController.logout
);

module.exports = router;