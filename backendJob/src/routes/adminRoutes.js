const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { authenticateToken, authorizeAdmin } = require('../middleware/authMiddleware');
const { validateCompany, validateEmailParam } = require('../middleware/validationMiddleware');

// All admin routes require authentication and admin authorization
router.use(authenticateToken);
router.use(authorizeAdmin);

// Dashboard
router.get('/dashboard/stats', adminController.getDashboardStats);

// User management
router.get('/users/pending', adminController.getPendingUsers);
router.get('/users', adminController.getAllUsers);
router.put('/users/:email/approve', 
  validateEmailParam,
  adminController.approveUser
);
router.put('/users/:email/reject', 
  validateEmailParam,
  adminController.rejectUser
);

// Company management
router.get('/companies', adminController.getCompanies);
router.post('/companies', 
  validateCompany,
  adminController.addCompany
);
router.delete('/companies/:id', adminController.deleteCompany);

module.exports = router;