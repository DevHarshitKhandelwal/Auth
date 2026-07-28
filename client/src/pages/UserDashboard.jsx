import React from "react";
import { useAuth } from "../context/AuthContext";

const UserDashboard = ({ onNavigate }) => {
  const { user } = useAuth();

  const capitalize = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div style={styles.pageBackground}>
      <div style={styles.container}>
        {/* Main Banner Card */}
        <div style={styles.bannerCard}>
          <h1 style={styles.bannerTitle}>User Dashboard</h1>
          <p style={styles.bannerSubtitle}>Welcome, {user?.name}!</p>
        </div>

        {/* 2 Solid Color Stat Cards */}
        <div style={styles.statsGrid}>
          {/* My Tasks Card */}
          <div style={styles.blueStatCard}>
            <div>
              <span style={styles.statLabel}>My Tasks</span>
              <h2 style={styles.statNumber}>5</h2>
            </div>
            <div style={styles.iconCircle}>📋</div>
          </div>

          {/* Notifications Card */}
          <div style={styles.greenStatCard}>
            <div>
              <span style={styles.statLabel}>Notifications</span>
              <h2 style={styles.statNumber}>3</h2>
            </div>
            <div style={styles.iconCircle}>🔔</div>
          </div>
        </div>

        {/* Your Information Card */}
        <div style={styles.infoCard}>
          <h3 style={styles.infoTitle}>Your Information</h3>

          <div style={styles.infoRow}>
            <span style={styles.infoLabel}>Name:</span>
            <span style={styles.infoValue}>{user?.name}</span>
          </div>

          <div style={styles.infoRow}>
            <span style={styles.infoLabel}>Email:</span>
            <span style={styles.infoValue}>{user?.email}</span>
          </div>

          <div style={styles.infoRowLast}>
            <span style={styles.infoLabel}>Role:</span>
            <span style={styles.bluePillBadge}>{capitalize(user?.role)}</span>
          </div>
        </div>

        {/* Callout Box */}
        <div style={styles.yellowCallout}>
          <span style={styles.calloutIcon}>ℹ️</span>
          <span>
            <strong>User Access Level:</strong> You have basic access to view your profile and tasks.
          </span>
        </div>

        {/* Action Buttons */}
        <div style={styles.actionButtonsRow}>
          <button style={styles.purpleBtn} onClick={() => onNavigate("manager")}>
            Go to Manager Dashboard
          </button>
          <button style={styles.redBtn} onClick={() => onNavigate("admin")}>
            Go to Admin Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  pageBackground: {
    minHeight: "calc(100vh - 65px)",
    background: "#f1f5f9",
    padding: "32px 20px",
  },
  container: {
    maxWidth: "920px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },
  bannerCard: {
    background: "#ffffff",
    borderRadius: "10px",
    padding: "24px 32px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
  },
  bannerTitle: {
    fontSize: "1.75rem",
    fontWeight: "800",
    color: "#1e293b",
    marginBottom: "4px",
  },
  bannerSubtitle: {
    fontSize: "0.95rem",
    color: "#64748b",
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
  },
  blueStatCard: {
    background: "#3b82f6",
    color: "#ffffff",
    borderRadius: "10px",
    padding: "20px 24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    boxShadow: "0 4px 6px -1px rgba(59, 130, 246, 0.2)",
  },
  greenStatCard: {
    background: "#22c55e",
    color: "#ffffff",
    borderRadius: "10px",
    padding: "20px 24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    boxShadow: "0 4px 6px -1px rgba(34, 197, 94, 0.2)",
  },
  statLabel: {
    fontSize: "0.85rem",
    fontWeight: "500",
    opacity: 0.9,
  },
  statNumber: {
    fontSize: "2.2rem",
    fontWeight: "800",
    marginTop: "4px",
  },
  iconCircle: {
    fontSize: "2.2rem",
    opacity: 0.85,
  },
  infoCard: {
    background: "#ffffff",
    borderRadius: "10px",
    padding: "24px 32px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
  },
  infoTitle: {
    fontSize: "1.2rem",
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: "18px",
  },
  infoRow: {
    display: "grid",
    gridTemplateColumns: "100px 1fr",
    alignItems: "center",
    padding: "12px 0",
    borderBottom: "1px solid #f1f5f9",
  },
  infoRowLast: {
    display: "grid",
    gridTemplateColumns: "100px 1fr",
    alignItems: "center",
    padding: "12px 0",
  },
  infoLabel: {
    color: "#64748b",
    fontSize: "0.9rem",
    fontWeight: "500",
  },
  infoValue: {
    color: "#1e293b",
    fontWeight: "600",
    fontSize: "0.95rem",
  },
  bluePillBadge: {
    background: "#dbeafe",
    color: "#1d4ed8",
    padding: "4px 14px",
    borderRadius: "16px",
    fontSize: "0.8rem",
    fontWeight: "700",
    display: "inline-block",
    width: "fit-content",
  },
  yellowCallout: {
    background: "#fefce8",
    borderLeft: "4px solid #eab308",
    borderRadius: "6px",
    padding: "14px 20px",
    color: "#854d0e",
    fontSize: "0.9rem",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  calloutIcon: {
    fontSize: "1.2rem",
  },
  actionButtonsRow: {
    display: "flex",
    gap: "14px",
  },
  purpleBtn: {
    background: "#a855f7",
    color: "#ffffff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "8px",
    fontWeight: "700",
    fontSize: "0.95rem",
    cursor: "pointer",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
  redBtn: {
    background: "#dc2626",
    color: "#ffffff",
    border: "none",
    padding: "10px 20px",
    borderRadius: "8px",
    fontWeight: "700",
    fontSize: "0.95rem",
    cursor: "pointer",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  },
};

export default UserDashboard;
