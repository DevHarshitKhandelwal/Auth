const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

/**
 * Protect middleware: Ensures the request contains a valid JWT token
 * Auto-attached via Axios interceptors: Authorization: Bearer <token>
 */
const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized access: Token is missing",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "supersecretjwtkey_production_ready_12345");
    
    const user = await User.findById(decoded.userId || decoded.id);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access: User no longer exists",
      });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized access: Token invalid or expired",
    });
  }
};

/**
 * Authorize middleware: Validates user roles (e.g. 'admin')
 * Usage: router.get('/admin', protect, authorize('admin'), controller)
 */
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Forbidden: User role '${req.user?.role}' is not authorized to access this route`,
      });
    }
    next();
  };
};

module.exports = {
  protect,
  authorize,
  // Alias for backward compatibility if needed
  authMiddleware: protect,
};