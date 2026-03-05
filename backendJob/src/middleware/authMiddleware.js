const jwt = require('jsonwebtoken');

// Authenticate token middleware
exports.authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ 
      error: 'Access token required',
      code: 'NO_TOKEN'
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json({ 
          error: 'Token expired',
          code: 'TOKEN_EXPIRED'
        });
      }
      return res.status(403).json({ 
        error: 'Invalid token',
        code: 'INVALID_TOKEN'
      });
    }

    req.user = user;
    next();
  });
};

// Optional authentication (doesn't require token, but adds user if present)
exports.optionalAuth = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return next();
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (!err) {
      req.user = user;
    }
    next();
  });
};

// Authorize admin only
exports.authorizeAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  if (req.user.userType !== 'admin') {
    return res.status(403).json({ 
      error: 'Admin access required',
      code: 'ADMIN_ONLY'
    });
  }

  next();
};

// Authorize company or admin
exports.authorizeCompanyOrAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  if (req.user.userType !== 'company' && req.user.userType !== 'admin') {
    return res.status(403).json({ 
      error: 'Company or admin access required',
      code: 'COMPANY_ADMIN_ONLY'
    });
  }

  next();
};

// Check if user is approved
exports.checkApproved = async (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Authentication required' });
  }

  // Admin doesn't need approval
  if (req.user.userType === 'admin') {
    return next();
  }

  // Check if user is approved (you might want to fetch from DB to get latest status)
  if (req.user.status !== 'Approved') {
    return res.status(403).json({ 
      error: 'Your account is pending approval',
      code: 'PENDING_APPROVAL'
    });
  }

  next();
};