import axios from "axios";

// URL base de la API. Se configura mediante la variable de entorno VITE_API_URL
// (ver .env.example). Si no está definida, se asume el backend corriendo en local
// en el puerto por defecto (3006).
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

// Si el backend responde 401 (token inválido/expirado), se limpia la sesión local.
// La redirección al login la maneja App.jsx al detectar que ya no hay usuario válido.
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
