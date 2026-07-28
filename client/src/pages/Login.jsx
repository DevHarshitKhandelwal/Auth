import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Login = ({ onSwitchToRegister, onSuccess }) => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg(null);

    const result = await login(email, password);
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
        <h2 style={styles.title}>Login</h2>

        {errorMsg && <div style={styles.alertError}>{errorMsg}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
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

          <button type="submit" disabled={submitting} style={styles.submitBtn}>
            {submitting ? "Logging in..." : "Login"}
          </button>
        </form>

        <div style={styles.footerText}>
          Don't have an account?{" "}
          <span style={styles.link} onClick={onSwitchToRegister}>
            Register here
          </span>
        </div>
      </div>
    </div>
  );
};

const styles = {
  pageBackground: {
    minHeight: "calc(100vh - 65px)",
    background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 50%, #a855f7 100%)",
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
    marginBottom: "28px",
    color: "#1e293b",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
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
    padding: "12px 14px",
    color: "#1e293b",
    fontSize: "0.95rem",
    outline: "none",
    transition: "border-color 0.2s ease",
  },
  submitBtn: {
    background: "#2563eb",
    color: "#ffffff",
    border: "none",
    padding: "12px",
    borderRadius: "8px",
    fontWeight: "700",
    fontSize: "1rem",
    cursor: "pointer",
    marginTop: "8px",
    boxShadow: "0 4px 6px -1px rgba(37, 99, 235, 0.3)",
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
    marginTop: "24px",
    fontSize: "0.9rem",
    color: "#64748b",
  },
  link: {
    color: "#2563eb",
    fontWeight: "700",
    cursor: "pointer",
    textDecoration: "underline",
  },
};

export default Login;
