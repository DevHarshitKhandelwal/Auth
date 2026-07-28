const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth.routes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root welcome endpoint
app.get(["/", "/api"], (req, res) => {
  res.status(200).json({
    success: true,
    message: "🚀 Auth API is running smoothly on Vercel!",
    endpoints: {
      health: "/api/health",
      register: "POST /api/auth/register",
      login: "POST /api/auth/login",
      profile: "GET /api/auth/me",
      manager: "GET /api/auth/manager",
      admin: "GET /api/auth/admin",
    },
  });
});

// Routes (supports both /api/auth and /auth)
app.use("/api/auth", authRoutes);
app.use("/auth", authRoutes);

// Health check endpoint
app.get(["/api/health", "/health"], (req, res) => {
  res.status(200).json({ status: "OK", timestamp: new Date() });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route not found: ${req.method} ${req.url}` });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Global Error:", err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

module.exports = app;
