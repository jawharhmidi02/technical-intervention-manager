import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("accessToken");
    const user = localStorage.getItem("user");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    if (user) {
      config.headers["x-user"] = user;
    }
  }
  return config;
});

export default api;
