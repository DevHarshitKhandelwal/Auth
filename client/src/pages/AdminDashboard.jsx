import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

const AdminDashboard = ({ onNavigate }) => {
  const { user } = useAuth();
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    const fetchAdminData = async () => {
      setLoading(true);
      setErrorMsg(null);
      try {
        const res = await api.get("/auth/admin");
        setAdminData(res.data);
      } catch (err) {
        setErrorMsg(err.response?.data?.message || "Forbidden: Access restricted to Admins only");
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
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
          <h3>Admin Access Denied</h3>
          <p style={{ marginTop: 8, color: "#64748b" }}>{errorMsg}</p>
          <div style={{ marginTop: 20, display: "flex", gap: "10px", justifyContent: "center" }}>
            <button style={styles.blueBtn} onClick={() => onNavigate("user")}>
              View User Dashboard
            </button>
            <button style={styles.purpleBtn} onClick={() => onNavigate("manager")}>
              View Manager Dashboard
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
          <h1 style={styles.bannerTitle}>Admin Dashboard</h1>
          <p style={styles.bannerSubtitle}>
            Welcome, {user?.name}! You have full system control.
          </p>
        </div>

        {/* 4 Stat Cards Row */}
        <div style={styles.statsGrid}>
          {/* Card 1 */}
          <div style={styles.statCardBlue}>
            <div>
              <span style={styles.statLabel}>Total Users</span>
              <h2 style={styles.statNumber}>{adminData?.systemStats?.usersCount || 100}</h2>
            </div>
            <span style={styles.statIcon}>👤</span>
          </div>

          {/* Card 2 */}
          <div style={styles.statCardPurple}>
            <div>
              <span style={styles.statLabel}>Total Managers</span>
              <h2 style={styles.statNumber}>{adminData?.systemStats?.managersCount || 15}</h2>
            </div>
            <span style={styles.statIcon}>👥</span>
          </div>

          {/* Card 3 */}
          <div style={styles.statCardRed}>
            <div>
              <span style={styles.statLabel}>Total Admins</span>
              <h2 style={styles.statNumber}>{adminData?.systemStats?.adminsCount || 3}</h2>
            </div>
            <span style={styles.statIcon}>⚡</span>
          </div>

          {/* Card 4 */}
          <div style={styles.statCardGreen}>
            <div>
              <span style={styles.statLabel}>System Health</span>
              <h2 style={styles.statNumberGreen}>{adminData?.systemStats?.systemHealth || "Good"}</h2>
            </div>
            <span style={styles.statIcon}>✅</span>
          </div>
        </div>

        {/* 2 Columns Grid */}
        <div style={styles.twoColumnGrid}>
          {/* Left Column: Admin Actions */}
          <div style={styles.contentCard}>
            <h3 style={styles.cardHeaderTitle}>🔧 Admin Actions</h3>
            <div style={styles.actionsList}>
              <div style={styles.actionBoxBlue}>
                <strong>Manage Users</strong>
                <span>Add, edit, or remove users</span>
              </div>
              <div style={styles.actionBoxPurple}>
                <strong>System Settings</strong>
                <span>Configure system preferences</span>
              </div>
              <div style={styles.actionBoxGreen}>
                <strong>View Logs</strong>
                <span>Access system audit logs</span>
              </div>
              <div style={styles.actionBoxRed}>
                <strong>Security Settings</strong>
                <span>Manage security configurations</span>
              </div>
            </div>
          </div>

          {/* Right Column: Recent Admin Activities */}
          <div style={styles.contentCard}>
            <h3 style={styles.cardHeaderTitle}>📊 Recent Admin Activities</h3>
            <ul style={styles.activityList}>
              <li style={styles.activityItem}>
                <span style={styles.greenDot}></span>
                <div>
                  <strong>User account created</strong>
                  <div style={styles.timeAgo}>2 hours ago</div>
                </div>
              </li>
              <li style={styles.activityItem}>
                <span style={styles.blueDot}></span>
                <div>
                  <strong>System backup completed</strong>
                  <div style={styles.timeAgo}>5 hours ago</div>
                </div>
              </li>
              <li style={styles.activityItem}>
                <span style={styles.yellowDot}></span>
                <div>
                  <strong>Security patch applied</strong>
                  <div style={styles.timeAgo}>1 day ago</div>
                </div>
              </li>
              <li style={styles.activityItem}>
                <span style={styles.purpleDot}></span>
                <div>
                  <strong>Database optimized</strong>
                  <div style={styles.timeAgo}>2 days ago</div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Admin Information Card */}
        <div style={styles.infoCard}>
          <h3 style={styles.cardHeaderTitle}>Admin Information</h3>
          <div style={styles.infoRowGrid}>
            <div>
              <span style={styles.infoLabel}>Name:</span>{" "}
              <span style={styles.infoValue}>{user?.name}</span>
            </div>
            <div>
              <span style={styles.infoLabel}>Email:</span>{" "}
              <span style={styles.infoValue}>{user?.email}</span>
            </div>
            <div>
              <span style={styles.infoLabel}>Role:</span>{" "}
              <span style={styles.pinkPillBadge}>{capitalize(user?.role)}</span>
            </div>
          </div>
        </div>

        {/* Red Warning Callout Box */}
        <div style={styles.redCallout}>
          <span style={styles.calloutIcon}>⚠️</span>
          <span>
            <strong>Admin Access Level:</strong> You have complete access to all system features, user management, and configurations. Use this power responsibly.
          </span>
        </div>

        {/* Action Buttons */}
        <div style={styles.actionButtonsRow}>
          <button style={styles.blueBtn} onClick={() => onNavigate("user")}>
            View User Dashboard
          </button>
          <button style={styles.purpleBtn} onClick={() => onNavigate("manager")}>
            View Manager Dashboard
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
    background: "linear-gradient(135deg, #e11d48 0%, #db2777 100%)",
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
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "16px",
  },
  statCardBlue: {
    background: "#ffffff",
    borderLeft: "4px solid #3b82f6",
    borderRadius: "8px",
    padding: "16px 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
  },
  statCardPurple: {
    background: "#ffffff",
    borderLeft: "4px solid #a855f7",
    borderRadius: "8px",
    padding: "16px 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
  },
  statCardRed: {
    background: "#ffffff",
    borderLeft: "4px solid #ef4444",
    borderRadius: "8px",
    padding: "16px 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
  },
  statCardGreen: {
    background: "#ffffff",
    borderLeft: "4px solid #22c55e",
    borderRadius: "8px",
    padding: "16px 20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
  },
  statLabel: {
    fontSize: "0.8rem",
    color: "#64748b",
    fontWeight: "500",
  },
  statNumber: {
    fontSize: "1.6rem",
    fontWeight: "800",
    color: "#1e293b",
    marginTop: "2px",
  },
  statNumberGreen: {
    fontSize: "1.3rem",
    fontWeight: "800",
    color: "#16a34a",
    marginTop: "2px",
  },
  statIcon: {
    fontSize: "1.6rem",
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
  actionsList: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  actionBoxBlue: {
    background: "#eff6ff",
    color: "#1e40af",
    borderRadius: "8px",
    padding: "12px 16px",
    display: "flex",
    flexDirection: "column",
    fontSize: "0.85rem",
  },
  actionBoxPurple: {
    background: "#f3e8ff",
    color: "#6b21a8",
    borderRadius: "8px",
    padding: "12px 16px",
    display: "flex",
    flexDirection: "column",
    fontSize: "0.85rem",
  },
  actionBoxGreen: {
    background: "#f0fdf4",
    color: "#166534",
    borderRadius: "8px",
    padding: "12px 16px",
    display: "flex",
    flexDirection: "column",
    fontSize: "0.85rem",
  },
  actionBoxRed: {
    background: "#fef2f2",
    color: "#991b1b",
    borderRadius: "8px",
    padding: "12px 16px",
    display: "flex",
    flexDirection: "column",
    fontSize: "0.85rem",
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
    alignItems: "flex-start",
    gap: "12px",
    fontSize: "0.88rem",
    color: "#334155",
  },
  timeAgo: {
    fontSize: "0.75rem",
    color: "#94a3b8",
    marginTop: "2px",
  },
  greenDot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    background: "#22c55e",
    marginTop: "6px",
  },
  blueDot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    background: "#3b82f6",
    marginTop: "6px",
  },
  yellowDot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    background: "#eab308",
    marginTop: "6px",
  },
  purpleDot: {
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    background: "#a855f7",
    marginTop: "6px",
  },
  infoCard: {
    background: "#ffffff",
    borderRadius: "10px",
    padding: "20px 28px",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
  },
  infoRowGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1.5fr 1fr",
    alignItems: "center",
  },
  infoLabel: {
    color: "#64748b",
    fontSize: "0.88rem",
  },
  infoValue: {
    color: "#1e293b",
    fontWeight: "600",
    fontSize: "0.9rem",
  },
  pinkPillBadge: {
    background: "#fce7f3",
    color: "#be185d",
    padding: "4px 14px",
    borderRadius: "16px",
    fontSize: "0.8rem",
    fontWeight: "700",
    display: "inline-block",
  },
  redCallout: {
    background: "#fef2f2",
    borderLeft: "4px solid #ef4444",
    borderRadius: "6px",
    padding: "14px 20px",
    color: "#991b1b",
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

export default AdminDashboard;
