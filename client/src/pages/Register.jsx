import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Register = ({ onSwitchToLogin, onSuccess }) => {
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("user");
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg(null);

    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match!");
      return;
    }

    setSubmitting(true);
    const result = await register(name, email, password, role);
    setSubmitting(false);

    if (result.success) {
      if (onSuccess) onSuccess(result.user);
    } else {
      setErrorMsg(result.message);
    }
  };

  return (
    <div style={styles.pageBackground}>
      <div style={styles.card}>
        <h2 style={styles.title}>Register</h2>

        {errorMsg && <div style={styles.alertError}>{errorMsg}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.field}>
            <label style={styles.label}>Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
              style={styles.input}
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              style={styles.input}
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              style={styles.input}
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              required
              style={styles.input}
            />
          </div>

          <div style={styles.field}>
            <label style={styles.label}>Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              style={styles.select}
            >
              <option value="user">User</option>
              <option value="manager">Manager</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button type="submit" disabled={submitting} style={styles.submitBtn}>
            {submitting ? "Registering..." : "Register"}
          </button>
        </form>

        <div style={styles.footerText}>
          Already have an account?{" "}
          <span style={styles.link} onClick={onSwitchToLogin}>
            Login here
          </span>
        </div>
      </div>
    </div>
  );
};

const styles = {
  pageBackground: {
    minHeight: "calc(100vh - 65px)",
    background: "linear-gradient(135deg, #10b981 0%, #06b6d4 50%, #2563eb 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
  },
  card: {
    background: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
    padding: "40px 36px",
    width: "100%",
    maxWidth: "420px",
    color: "#1e293b",
  },
  title: {
    fontSize: "1.8rem",
    fontWeight: "800",
    textAlign: "center",
    marginBottom: "24px",
    color: "#1e293b",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  label: {
    fontSize: "0.88rem",
    fontWeight: "600",
    color: "#334155",
  },
  input: {
    background: "#ffffff",
    border: "1px solid #cbd5e1",
    borderRadius: "8px",
    padding: "11px 14px",
    color: "#1e293b",
    fontSize: "0.95rem",
    outline: "none",
  },
  select: {
    background: "#ffffff",
    border: "1px solid #cbd5e1",
    borderRadius: "8px",
    padding: "11px 14px",
    color: "#1e293b",
    fontSize: "0.95rem",
    outline: "none",
    cursor: "pointer",
  },
  submitBtn: {
    background: "#10b981",
    color: "#ffffff",
    border: "none",
    padding: "12px",
    borderRadius: "8px",
    fontWeight: "700",
    fontSize: "1rem",
    cursor: "pointer",
    marginTop: "8px",
    boxShadow: "0 4px 6px -1px rgba(16, 185, 129, 0.3)",
  },
  alertError: {
    background: "#fef2f2",
    border: "1px solid #fca5a5",
    color: "#dc2626",
    padding: "10px 14px",
    borderRadius: "8px",
    fontSize: "0.88rem",
    marginBottom: "16px",
    textAlign: "center",
  },
  footerText: {
    textAlign: "center",
    marginTop: "20px",
    fontSize: "0.9rem",
    color: "#64748b",
  },
  link: {
    color: "#10b981",
    fontWeight: "700",
    cursor: "pointer",
    textDecoration: "underline",
  },
};

export default Register;
