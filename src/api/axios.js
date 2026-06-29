import axios from "axios";

const api = axios.create({
  baseURL: "https://jobai-backend-swrv.onrender.com",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (
      token &&
      !config.url.includes("/api/resume/") &&
      !config.url.includes("/api/ai/") &&
      !config.url.includes("/api/users/login") &&
      !config.url.includes("/api/users/register")
    ) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;   // ✅ Add this line
