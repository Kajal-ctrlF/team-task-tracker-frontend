import axios from "axios";

// ─────────────────────────────────────────────────────────────────────────────
// AXIOS INSTANCE
// ─────────────────────────────────────────────────────────────────────────────
// Instead of writing the full URL in every API call, we create one configured
// axios instance. All API calls in the app use this instance.
//
// Benefits:
//   - Base URL is set once — change it in one place for all calls
//   - Request interceptor auto-attaches the JWT token to every request
//   - Response interceptor handles 401 (token expired) globally
// ─────────────────────────────────────────────────────────────────────────────

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// ── REQUEST INTERCEPTOR ───────────────────────────────────────────────────────
// Runs before EVERY request is sent.
// Reads the token from localStorage and adds it to the Authorization header.
// This means you never have to manually add the token in any API call.
//
// Without interceptor: axios.get("/tasks", { headers: { Authorization: `Bearer ${token}` } })
// With interceptor:    API.get("/tasks")  ← token is added automatically
// ─────────────────────────────────────────────────────────────────────────────

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ── RESPONSE INTERCEPTOR ──────────────────────────────────────────────────────
// Runs after EVERY response is received.
// If the server returns 401 (token expired or invalid), we:
//   1. Clear the stored token and user data
//   2. Redirect to login page
// This handles session expiry automatically across the whole app.
// ─────────────────────────────────────────────────────────────────────────────

API.interceptors.response.use(
  (response) => response, // success — just pass through
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login"; // force redirect to login
    }
    return Promise.reject(error);
  }
);

export default API;
