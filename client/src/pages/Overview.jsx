import React from "react";

const Overview = ({ setActiveTab }) => {
  return (
    <div style={styles.container}>
      <div style={styles.hero}>
        <h1 style={styles.heroTitle}>JWT Authentication Flow Summary</h1>
        <p style={styles.heroSubtitle}>
          Production-Ready Stateless MERN Architecture with Client & Server-Side Security
        </p>
      </div>

      <div style={styles.grid}>
        {/* Step 1: Registration */}
        <div style={styles.card}>
          <div style={styles.stepHeader}>
            <span style={styles.stepNum}>1</span>
            <h3>Registration Flow</h3>
          </div>
          <ul style={styles.list}>
            <li><strong>Client:</strong> Submit form &rarr; <code>AuthContext</code> &rarr; <code>POST /api/auth/register</code></li>
            <li><strong>Server:</strong> Hash password using <code>bcrypt</code></li>
            <li><strong>Server:</strong> Create user in MongoDB</li>
            <li><strong>Server:</strong> Generate JWT token signed with secret key + expiration</li>
            <li><strong>Server:</strong> Return token + user data (<code>{`{ _id, name, email, role }`}</code>)</li>
          </ul>
        </div>

        {/* Step 2: Login */}
        <div style={styles.card}>
          <div style={styles.stepHeader}>
            <span style={styles.stepNum}>2</span>
            <h3>Login Flow</h3>
          </div>
          <ul style={styles.list}>
            <li><strong>Client:</strong> Submit credentials &rarr; <code>POST /api/auth/login</code></li>
            <li><strong>Server:</strong> Find user & compare password hash using <code>comparePassword()</code></li>
            <li><strong>Server:</strong> Generate JWT token</li>
            <li><strong>Server:</strong> Return token + user data</li>
          </ul>
        </div>

        {/* Step 3: Token Storage & Usage */}
        <div style={styles.card}>
          <div style={styles.stepHeader}>
            <span style={styles.stepNum}>3</span>
            <h3>Token Storage & Usage</h3>
          </div>
          <ul style={styles.list}>
            <li><strong>Storage:</strong> <code>localStorage</code> (key: <code>'token'</code>)</li>
            <li><strong>Auto-attach:</strong> Axios interceptors add <code>Authorization: Bearer &lt;token&gt;</code> to all HTTP requests</li>
            <li><strong>State Restoration:</strong> Auto fetch user profile via <code>GET /api/auth/me</code> on page reload</li>
          </ul>
        </div>

        {/* Step 4: Protection & Role Validation */}
        <div style={styles.card}>
          <div style={styles.stepHeader}>
            <span style={styles.stepNum}>4</span>
            <h3>Protection & Security</h3>
          </div>
          <ul style={styles.list}>
            <li><strong>Client-Side Protection:</strong> <code>&lt;ProtectedRoute allowedRoles={['admin']}&gt;</code></li>
            <li><strong>Server-Side Protection:</strong> <code>router.get('/admin', protect, authorize('admin'), controller);</code></li>
            <li><strong>Security:</strong> Signed JWT tokens, bcrypt hashed passwords, stateless authorization</li>
          </ul>
        </div>

        {/* Step 5: Logout */}
        <div style={styles.cardFull}>
          <div style={styles.stepHeader}>
            <span style={styles.stepNum}>5</span>
            <h3>Logout Flow</h3>
          </div>
          <p style={{ color: "#cbd5e1", fontSize: "0.9rem", margin: "6px 0 14px" }}>
            Remove token from <code>localStorage</code> (<code>localStorage.removeItem('token')</code>) + clear auth state in <code>AuthContext</code> + reset authorization headers.
          </p>
          <div style={styles.btnRow}>
            <button style={styles.primaryBtn} onClick={() => setActiveTab("register")}>
              Try Registration Flow
            </button>
            <button style={styles.secondaryBtn} onClick={() => setActiveTab("login")}>
              Try Login Flow
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "900px",
    margin: "0 auto",
    color: "#f8fafc",
  },
  hero: {
    textAlign: "center",
    marginBottom: "32px",
  },
  heroTitle: {
    fontSize: "2.2rem",
    fontWeight: "800",
    background: "linear-gradient(135deg, #6366f1 0%, #a855f7 100%)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  heroSubtitle: {
    color: "#94a3b8",
    fontSize: "1rem",
    marginTop: "8px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
  },
  card: {
    background: "#0f172a",
    border: "1px solid #1e293b",
    borderRadius: "12px",
    padding: "24px",
  },
  cardFull: {
    gridColumn: "1 / -1",
    background: "#0f172a",
    border: "1px solid #1e293b",
    borderRadius: "12px",
    padding: "24px",
  },
  stepHeader: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "16px",
  },
  stepNum: {
    background: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
    color: "#fff",
    width: "28px",
    height: "28px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "700",
    fontSize: "0.9rem",
  },
  list: {
    listStyleType: "none",
    padding: 0,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    color: "#cbd5e1",
    fontSize: "0.88rem",
  },
  btnRow: {
    display: "flex",
    gap: "12px",
    marginTop: "12px",
  },
  primaryBtn: {
    background: "#4f46e5",
    color: "#fff",
    border: "none",
    padding: "10px 18px",
    borderRadius: "8px",
    fontWeight: "600",
    cursor: "pointer",
  },
  secondaryBtn: {
    background: "#1e293b",
    color: "#f8fafc",
    border: "1px solid #334155",
    padding: "10px 18px",
    borderRadius: "8px",
    fontWeight: "600",
    cursor: "pointer",
  },
};

export default Overview;
