import React, { createContext, useState, useEffect, useContext } from "react";
import api from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Auto-fetch profile on initial load if token exists in localStorage
  useEffect(() => {
    const loadUser = async () => {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        try {
          const res = await api.get("/auth/me");
          if (res.data.success) {
            setUser(res.data.user);
            setToken(storedToken);
          }
        } catch (err) {
          console.error("Auto login failed:", err.response?.data?.message || err.message);
          // Token is invalid/expired -> clear state
          logout();
        }
      }
      setLoading(false);
    };

    loadUser();
  }, []);

  /**
   * 1. Register: Submit form → AuthContext → POST /api/auth/register
   * Server returns token + user data
   * Storage: localStorage (key: 'token')
   */
  const register = async (name, email, password, role = "user") => {
    setError(null);
    try {
      const res = await api.post("/auth/register", { name, email, password, role });
      const { token: newToken, user: userData } = res.data;

      // Save token to localStorage
      localStorage.setItem("token", newToken);
      setToken(newToken);
      setUser(userData);
      return { success: true, user: userData };
    } catch (err) {
      const msg = err.response?.data?.message || "Registration failed";
      setError(msg);
      return { success: false, message: msg };
    }
  };

  /**
   * 2. Login: Submit credentials → POST /api/auth/login
   * Server returns token + user data
   * Storage: localStorage (key: 'token')
   */
  const login = async (email, password) => {
    setError(null);
    try {
      const res = await api.post("/auth/login", { email, password });
      const { token: newToken, user: userData } = res.data;

      // Save token to localStorage
      localStorage.setItem("token", newToken);
      setToken(newToken);
      setUser(userData);
      return { success: true, user: userData };
    } catch (err) {
      const msg = err.response?.data?.message || "Login failed";
      setError(msg);
      return { success: false, message: msg };
    }
  };

  /**
   * 3. Logout: Remove token from localStorage + clear auth state
   */
  const logout = async () => {
    try {
      await api.post("/auth/logout");
    } catch (err) {
      // Ignore network errors during logout
    } finally {
      localStorage.removeItem("token");
      setToken(null);
      setUser(null);
      setError(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        error,
        register,
        login,
        logout,
        setError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
