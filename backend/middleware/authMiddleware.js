const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect routes with JWT Bearer Token
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authorized to access this route, token missing'
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'hotelpro_super_secure_jwt_secret_key_2026');
    req.user = await User.findById(decoded.id).select('-password');
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: 'User account not found'
      });
    }
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: 'Token verification failed or token expired'
    });
  }
};

// Grant access to specific roles
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Role '${req.user.role}' is not authorized to access this resource`
      });
    }
    next();
  };
};

module.exports = { protect, authorize };
