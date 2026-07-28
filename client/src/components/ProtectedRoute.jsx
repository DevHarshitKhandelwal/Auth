import React from "react";
import { useAuth } from "../context/AuthContext";

/**
 * Client-Side Protection Component
 * Usage:
 * <ProtectedRoute allowedRoles={['admin']}>
 *   <AdminDashboard />
 * </ProtectedRoute>
 */
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, token, loading } = useAuth();

  if (loading) {
    return (
      <div style={styles.centerContainer}>
        <div style={styles.spinner}></div>
        <p style={{ marginTop: 12, color: "#64748b" }}>Verifying authentication...</p>
      </div>
    );
  }

  // Check 1: User is authenticated
  if (!token || !user) {
    return (
      <div style={styles.card}>
        <div style={styles.alertHeader}>
          <span style={styles.icon}>🔒</span>
          <h3>Authentication Required</h3>
        </div>
        <p style={styles.text}>
          You must be logged in to view this page. Please log in or register an account.
        </p>
      </div>
    );
  }

  // Check 2: Role Authorization
  if (allowedRoles && Array.isArray(allowedRoles) && !allowedRoles.includes(user.role)) {
    return (
      <div style={styles.cardError}>
        <div style={styles.alertHeader}>
          <span style={styles.icon}>🚫</span>
          <h3>403 - Access Denied</h3>
        </div>
        <p style={styles.text}>
          Your current role (<strong>{user.role}</strong>) does not have permission to view this resource.
        </p>
        <p style={{ fontSize: "0.85rem", color: "#94a3b8", marginTop: 8 }}>
          Required Role(s): <code>{allowedRoles.join(", ")}</code>
        </p>
      </div>
    );
  }

  return children;
};

const styles = {
  centerContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "250px",
  },
  spinner: {
    width: "36px",
    height: "36px",
    border: "4px solid #e2e8f0",
    borderTop: "4px solid #6366f1",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  card: {
    background: "#0f172a",
    border: "1px solid #334155",
    borderRadius: "12px",
    padding: "24px",
    color: "#f8fafc",
    maxWidth: "500px",
    margin: "30px auto",
    textAlign: "center",
  },
  cardError: {
    background: "#1e1b4b",
    border: "1px solid #4338ca",
    borderRadius: "12px",
    padding: "24px",
    color: "#f8fafc",
    maxWidth: "500px",
    margin: "30px auto",
    textAlign: "center",
  },
  alertHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "12px",
  },
  icon: {
    fontSize: "1.8rem",
  },
  text: {
    color: "#cbd5e1",
    fontSize: "0.95rem",
    lineHeight: "1.5",
  },
};

export default ProtectedRoute;
