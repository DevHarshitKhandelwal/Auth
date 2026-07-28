import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

const ManagerDashboard = ({ onNavigate }) => {
  const { user } = useAuth();
  const [managerData, setManagerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const fetchManagerData = async () => {
      setLoading(true);
      setErrorMsg(null);
      try {
        const res = await api.get("/auth/manager");
        setManagerData(res.data);
      } catch (err) {
        setErrorMsg(err.response?.data?.message || "Forbidden: Access restricted to Managers and Admins");
      } finally {
        setLoading(false);
      }
    };

    fetchManagerData();
  }, []);

  const capitalize = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  if (errorMsg) {
    return (
      <div style={styles.pageBackground}>
        <div style={styles.errorCard}>
          <div style={styles.errorIcon}>🚫</div>
          <h3>Manager Access Denied</h3>
          <p style={{ marginTop: 8, color: "#64748b" }}>{errorMsg}</p>
          <div style={{ marginTop: 20 }}>
            <button style={styles.blueBtn} onClick={() => onNavigate("user")}>
              Return to User Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.pageBackground}>
      <div style={styles.container}>
        {/* Main Banner Card */}
        <div style={styles.bannerCard}>
          <h1 style={styles.bannerTitle}>Manager Dashboard</h1>
          <p style={styles.bannerSubtitle}>
            Welcome, {user?.name}! Manage your team efficiently.
          </p>
        </div>

        {/* 3 Stat Cards Row */}
        <div style={styles.statsGrid}>
          {/* Card 1 */}
          <div style={styles.statCardBlue}>
            <div>
              <span style={styles.statLabel}>Team Members</span>
              <h2 style={styles.statNumber}>{managerData?.teamStats?.teamMembers || 10}</h2>
            </div>
            <span style={styles.statIcon}>👥</span>
          </div>

          {/* Card 2 */}
          <div style={styles.statCardGreen}>
            <div>
              <span style={styles.statLabel}>Active Projects</span>
              <h2 style={styles.statNumber}>{managerData?.teamStats?.activeProjects || 8}</h2>
            </div>
            <span style={styles.statIcon}>📊</span>
          </div>

          {/* Card 3 */}
          <div style={styles.statCardYellow}>
            <div>
              <span style={styles.statLabel}>Pending Approvals</span>
              <h2 style={styles.statNumber}>{managerData?.teamStats?.pendingApprovals || 4}</h2>
            </div>
            <span style={styles.statIcon}>⏳</span>
          </div>
        </div>

        {/* 2 Columns Grid */}
        <div style={styles.twoColumnGrid}>
          {/* Left Column: Recent Activities */}
          <div style={styles.contentCard}>
            <h3 style={styles.cardHeaderTitle}>📝 Recent Activities</h3>
            <ul style={styles.activityList}>
              <li style={styles.activityItem}>
                <span style={styles.greenDot}></span>
                <span>Approved project proposal from Team A</span>
              </li>
              <li style={styles.activityItem}>
                <span style={styles.blueDot}></span>
                <span>Reviewed performance reports</span>
              </li>
              <li style={styles.activityItem}>
                <span style={styles.yellowDot}></span>
                <span>Scheduled team meeting for next week</span>
              </li>
              <li style={styles.activityItem}>
                <span style={styles.purpleDot}></span>
                <span>Assigned new tasks to team members</span>
              </li>
            </ul>
          </div>

          {/* Right Column: Manager Information */}
          <div style={styles.contentCard}>
            <h3 style={styles.cardHeaderTitle}>👤 Manager Information</h3>

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
              <span style={styles.purplePillBadge}>{capitalize(user?.role)}</span>
            </div>
          </div>
        </div>

        {/* Callout Box */}
        <div style={styles.blueCallout}>
          <span style={styles.calloutIcon}>ℹ️</span>
          <span>
            <strong>Manager Access Level:</strong> You can manage team members, approve requests, and oversee projects.
          </span>
        </div>

        {/* Action Buttons */}
        <div style={styles.actionButtonsRow}>
          <button style={styles.blueBtn} onClick={() => onNavigate("user")}>
            View User Dashboard
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
    background: "linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%)",
    borderRadius: "10px",
    padding: "28px 32px",
    color: "#ffffff",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
  },
  bannerTitle: {
    fontSize: "1.75rem",
    fontWeight: "800",
    marginBottom: "4px",
  },
  bannerSubtitle: {
    fontSize: "0.95rem",
    opacity: 0.9,
  },
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px",
  },
  statCardBlue: {
    background: "#ffffff",
    borderLeft: "4px solid #3b82f6",
    borderRadius: "8px",
    padding: "20px 24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
  },
  statCardGreen: {
    background: "#ffffff",
    borderLeft: "4px solid #22c55e",
    borderRadius: "8px",
    padding: "20px 24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
  },
  statCardYellow: {
    background: "#ffffff",
    borderLeft: "4px solid #eab308",
    borderRadius: "8px",
    padding: "20px 24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
  },
  statLabel: {
    fontSize: "0.85rem",
    color: "#64748b",
    fontWeight: "500",
  },
  statNumber: {
    fontSize: "1.8rem",
    fontWeight: "800",
    color: "#1e293b",
    marginTop: "4px",
  },
  statIcon: {
    fontSize: "1.8rem",
  },
  twoColumnGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
  },
  contentCard: {
    background: "#ffffff",
    borderRadius: "10px",
    padding: "24px 28px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
  },
  cardHeaderTitle: {
    fontSize: "1.1rem",
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: "16px",
  },
  activityList: {
    listStyleType: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: "14px",
  },
  activityItem: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "0.88rem",
    color: "#334155",
  },
  greenDot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    background: "#22c55e",
    display: "inline-block",
  },
  blueDot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    background: "#3b82f6",
    display: "inline-block",
  },
  yellowDot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    background: "#eab308",
    display: "inline-block",
  },
  purpleDot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    background: "#a855f7",
    display: "inline-block",
  },
  infoRow: {
    display: "grid",
    gridTemplateColumns: "80px 1fr",
    alignItems: "center",
    padding: "10px 0",
    borderBottom: "1px solid #f1f5f9",
  },
  infoRowLast: {
    display: "grid",
    gridTemplateColumns: "80px 1fr",
    alignItems: "center",
    padding: "10px 0",
  },
  infoLabel: {
    color: "#64748b",
    fontSize: "0.88rem",
    fontWeight: "500",
  },
  infoValue: {
    color: "#1e293b",
    fontWeight: "600",
    fontSize: "0.9rem",
  },
  purplePillBadge: {
    background: "#f3e8ff",
    color: "#7e22ce",
    padding: "4px 14px",
    borderRadius: "16px",
    fontSize: "0.8rem",
    fontWeight: "700",
    display: "inline-block",
    width: "fit-content",
  },
  blueCallout: {
    background: "#eff6ff",
    borderLeft: "4px solid #3b82f6",
    borderRadius: "6px",
    padding: "14px 20px",
    color: "#1e40af",
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
  blueBtn: {
    background: "#2563eb",
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
  errorCard: {
    background: "#ffffff",
    borderRadius: "12px",
    padding: "40px",
    maxWidth: "500px",
    margin: "40px auto",
    textAlign: "center",
    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
  },
  errorIcon: {
    fontSize: "3rem",
    marginBottom: "12px",
  },
};

export default ManagerDashboard;
