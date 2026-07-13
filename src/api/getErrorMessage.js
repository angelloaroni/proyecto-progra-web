// Extrae un mensaje de error legible desde un error de axios/fetch a la API.
// El backend responde errores como { success: false, message: "..." }.
const getErrorMessage = (error, fallback = "Ocurrió un error inesperado. Intenta nuevamente.") => {
  return error?.response?.data?.message || fallback;
};

export default getErrorMessage;
