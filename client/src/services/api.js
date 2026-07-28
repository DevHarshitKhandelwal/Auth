import axios from "axios";

// Create Axios instance with base URL
const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

/**
 * Token Storage & Usage
 * Auto-attach: Axios interceptors add Authorization: Bearer <token> to all requests
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor for handling global auth errors (e.g. 401 token expired)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token is invalid or expired
      console.warn("Unauthorized API call - invalid or expired token.");
    }
    return Promise.reject(error);
  }
);

export default api;
