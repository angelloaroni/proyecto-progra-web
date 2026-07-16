import axios from "axios";


const baseURL = import.meta.env.VITE_API_URL || "http://localhost:3006";

const axiosClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Adjunta automáticamente el token JWT (si existe) a cada petición.
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("usuario");
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
