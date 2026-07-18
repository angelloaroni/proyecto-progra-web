import axios from "axios";


const baseURL = import.meta.env.VITE_API_URL || "http://localhost:3006";


const axiosClient = axios.create({

 baseURL,

 headers: {

  "Content-Type": "application/json",

 },

});



// El backend ya no usa JWT: authMiddleware valida por el header "x-user-id"

// (ver src/middleware/auth.js del backend). Lo adjuntamos automáticamente

// leyendo el usuario logueado desde localStorage.

axiosClient.interceptors.request.use((config) => {

 const usuarioGuardado = localStorage.getItem("usuario");

 if (usuarioGuardado) {

  try {

   const usuario = JSON.parse(usuarioGuardado);

   if (usuario?.id) {

    config.headers["x-user-id"] = usuario.id;

   }

  } catch {

   localStorage.removeItem("usuario");

  }

 }

 return config;

});





axiosClient.interceptors.response.use(

 (response) => response,

 (error) => {

  if (error.response?.status === 401) {

   localStorage.removeItem("usuario");

  }

  return Promise.reject(error);

 }

);



export default axiosClient;