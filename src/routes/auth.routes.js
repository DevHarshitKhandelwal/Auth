const express = require("express");
const authController = require("../controller/auth.controller");
const { protect, authorize } = require("../middleware/auth.middleware");

const router = express.Router();

/**
 * Public Auth Routes
 */
router.post("/register", authController.userRegisterController);
router.post("/login", authController.userLoginController);
router.post("/logout", authController.userLogoutController);

/**
 * Protected User Profile Route
 */
router.get("/me", protect, authController.getMeController);

/**
 * Protected Manager Route
 * Server-side: router.get('/manager', protect, authorize('manager', 'admin'), controller);
 */
router.get("/manager", protect, authorize("manager", "admin"), (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the Manager Dashboard! Server-side role check passed.",
    managerUser: {
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
    },
    teamStats: {
      teamMembers: 10,
      activeProjects: 8,
      pendingApprovals: 4,
    },
  });
});

/**
 * Protected Admin Route
 * Server-side: router.get('/admin', protect, authorize('admin'), controller);
 */
router.get("/admin", protect, authorize("admin"), (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the Admin Dashboard! Server-side role check passed.",
    adminUser: {
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role,
    },
    systemStats: {
      usersCount: 100,
      managersCount: 15,
      adminsCount: 3,
      systemHealth: "Good",
    },
  });
});

module.exports = router;