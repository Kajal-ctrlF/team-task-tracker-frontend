import API from "./axios";

// ─────────────────────────────────────────────────────────────────────────────
// AUTH API CALLS
// ─────────────────────────────────────────────────────────────────────────────
// Each function maps to one backend endpoint.
// They return the axios promise — the caller handles .then/.catch or async/await.
// ─────────────────────────────────────────────────────────────────────────────

// POST /api/auth/register
export const registerUser = (data) => API.post("/auth/register", data);

// POST /api/auth/login
export const loginUser = (data) => API.post("/auth/login", data);

// GET /api/auth/me
export const getMe = () => API.get("/auth/me");

// PUT /api/auth/me
export const updateProfile = (data) => API.put("/auth/me", data);
