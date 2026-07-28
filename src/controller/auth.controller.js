const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

/**
 * Generate JWT token helper
 */
const generateToken = (userId, role) => {
  return jwt.sign(
    { userId, role },
    process.env.JWT_SECRET || "supersecretjwtkey_production_ready_12345",
    { expiresIn: process.env.JWT_EXPIRE || "3d" }
  );
};

/**
 * @desc    Register new user
 * @route   POST /api/auth/register
 * @access  Public
 */
async function userRegisterController(req, res) {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide name, email, and password",
      });
    }

    const isExists = await User.findOne({ email: email.toLowerCase() });
    if (isExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    const user = await User.create({
      name,
      email,
      password,
      role: role || "user",
    });

    const token = generateToken(user._id, user.role);

    res.status(201).json({
      success: true,
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during registration",
      error: error.message,
    });
  }
}

/**
 * @desc    Login user
 * @route   POST /api/auth/login
 * @access  Public
 */
async function userLoginController(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }

    // Select password field using projection parameter "+password"
    const user = await User.findOne({ email: email.toLowerCase() }, "+password");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = generateToken(user._id, user.role);

    res.status(200).json({
      success: true,
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during login",
      error: error.message,
    });
  }
}

/**
 * @desc    Get Current User Profile
 * @route   GET /api/auth/me
 * @access  Private (Requires protect)
 */
async function getMeController(req, res) {
  try {
    res.status(200).json({
      success: true,
      user: {
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error fetching user profile",
    });
  }
}

/**
 * @desc    Logout user
 * @route   POST /api/auth/logout
 * @access  Public / Private
 */
async function userLogoutController(req, res) {
  res.status(200).json({
    success: true,
    message: "User logged out successfully. Clear token from localStorage on client.",
  });
}

module.exports = {
  userRegisterController,
  userLoginController,
  getMeController,
  userLogoutController,
};