import React, { useState, useEffect } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard";
import ManagerDashboard from "./pages/ManagerDashboard";
import AdminDashboard from "./pages/AdminDashboard";

function MainContent() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("login");

  // Sync active tab with user role when user logs in or switches
  useEffect(() => {
    if (user) {
      if (user.role === "admin") setActiveTab("admin");
      else if (user.role === "manager") setActiveTab("manager");
      else setActiveTab("user");
    } else {
      setActiveTab("login");
    }
  }, [user]);

  return (
    <div style={styles.appContainer}>
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      <main style={styles.mainContent}>
        {activeTab === "login" && (
          <Login
            onSwitchToRegister={() => setActiveTab("register")}
            onSuccess={(loggedUser) => {
              if (loggedUser.role === "admin") setActiveTab("admin");
              else if (loggedUser.role === "manager") setActiveTab("manager");
              else setActiveTab("user");
            }}
          />
        )}

        {activeTab === "register" && (
          <Register
            onSwitchToLogin={() => setActiveTab("login")}
            onSuccess={(regUser) => {
              if (regUser.role === "admin") setActiveTab("admin");
              else if (regUser.role === "manager") setActiveTab("manager");
              else setActiveTab("user");
            }}
          />
        )}

        {activeTab === "user" && (
          <ProtectedRoute>
            <UserDashboard onNavigate={(tab) => setActiveTab(tab)} />
          </ProtectedRoute>
        )}

        {activeTab === "manager" && (
          <ProtectedRoute allowedRoles={["manager", "admin"]}>
            <ManagerDashboard onNavigate={(tab) => setActiveTab(tab)} />
          </ProtectedRoute>
        )}

        {activeTab === "admin" && (
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminDashboard onNavigate={(tab) => setActiveTab(tab)} />
          </ProtectedRoute>
        )}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainContent />
    </AuthProvider>
  );
}

const styles = {
  appContainer: {
    minHeight: "100vh",
    backgroundColor: "#f1f5f9",
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    display: "flex",
    flexDirection: "column",
  },
  mainContent: {
    flex: 1,
  },
};
