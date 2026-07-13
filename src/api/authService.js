import axiosClient from "./axiosClient";

// POST /auth/login -> { success, message, token, usuario }
const login = async (codigo, password, rol) => {
  const { data } = await axiosClient.post("/auth/login", { codigo, password, rol });
  return data;
};

// POST /auth/registrar -> { success, message, token, usuario }
const registrar = async ({ codigo, nombre, password, rol }) => {
  const { data } = await axiosClient.post("/auth/registrar", { codigo, nombre, password, rol });
  return data;
};

// GET /auth/usuarios (admin) -> [{ id, codigo, nombre, rol, activo, totalReclamos, aprobados }]
const listarUsuarios = async () => {
  const { data } = await axiosClient.get("/auth/usuarios");
  return data;
};

// PUT /auth/usuarios/:id/acceso (admin) -> { success, message, usuario }
const toggleAcceso = async (id) => {
  const { data } = await axiosClient.put(`/auth/usuarios/${id}/acceso`);
  return data;
};

const authService = { login, registrar, listarUsuarios, toggleAcceso };

export default authService;
