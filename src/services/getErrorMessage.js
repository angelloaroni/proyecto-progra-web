
const getErrorMessage = (error, fallback = "Ocurrió un error inesperado. Intenta nuevamente.") => {
  return error?.response?.data?.message || fallback;
};

export default getErrorMessage;
