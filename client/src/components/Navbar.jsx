import React from "react";
import { useAuth } from "../context/AuthContext";

const Navbar = ({ activeTab, setActiveTab }) => {
  const { user, logout } = useAuth();

  const capitalize = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.brand} onClick={() => setActiveTab(user ? (user.role === "admin" ? "admin" : user.role === "manager" ? "manager" : "user") : "login")}>
        JWT Auth
      </div>

      <div style={styles.rightSection}>
        {user ? (
          <>
            <span style={styles.welcomeText}>
              Welcome, <strong>{user.name}</strong> ({capitalize(user.role)})
            </span>
            <button style={styles.logoutBtn} onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <div style={styles.authButtons}>
            <button
              style={activeTab === "login" ? styles.activeAuthBtn : styles.authBtn}
              onClick={() => setActiveTab("login")}
            >
              Login
            </button>
            <button
              style={activeTab === "register" ? styles.activeAuthBtn : styles.authBtn}
              onClick={() => setActiveTab("register")}
            >
              Register
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    background: "#3b82f6",
    padding: "16px 32px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "#ffffff",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  brand: {
    fontSize: "1.35rem",
    fontWeight: "800",
    color: "#ffffff",
    cursor: "pointer",
    letterSpacing: "0.5px",
  },
  rightSection: {
    display: "flex",
    alignItems: "center",
    gap: "18px",
  },
  welcomeText: {
    fontSize: "0.95rem",
    color: "#ffffff",
  },
  logoutBtn: {
    background: "#ef4444",
    color: "#ffffff",
    border: "none",
    padding: "8px 18px",
    borderRadius: "6px",
    fontWeight: "600",
    fontSize: "0.9rem",
    cursor: "pointer",
    boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
    transition: "background 0.2s ease",
  },
  authButtons: {
    display: "flex",
    gap: "10px",
  },
  authBtn: {
    background: "transparent",
    color: "#ffffff",
    border: "1px solid rgba(255,255,255,0.4)",
    padding: "6px 16px",
    borderRadius: "6px",
    fontWeight: "500",
    cursor: "pointer",
  },
  activeAuthBtn: {
    background: "#ffffff",
    color: "#2563eb",
    border: "1px solid #ffffff",
    padding: "6px 16px",
    borderRadius: "6px",
    fontWeight: "700",
    cursor: "pointer",
  },
};

export default Navbar;
