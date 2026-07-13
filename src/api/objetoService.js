import axiosClient from "./axiosClient";

// GET /objeto (público) -> [ objeto ]
const listar = async () => {
  const { data } = await axiosClient.get("/objeto");
  return data;
};

// GET /objeto/:id (público) -> objeto
const obtener = async (id) => {
  const { data } = await axiosClient.get(`/objeto/${id}`);
  return data;
};

// POST /objeto (admin) -> { success, message, objeto }
const crear = async ({ nombre, categoria, descripcion, icono }) => {
  const { data } = await axiosClient.post("/objeto", { nombre, categoria, descripcion, icono });
  return data;
};

// PUT /objeto/:id (admin) -> { success, message, objeto }
const actualizar = async (id, { nombre, categoria, descripcion, icono }) => {
  const { data } = await axiosClient.put(`/objeto/${id}`, { nombre, categoria, descripcion, icono });
  return data;
};

// DELETE /objeto/:id (admin) -> { success, message }
const eliminar = async (id) => {
  const { data } = await axiosClient.delete(`/objeto/${id}`);
  return data;
};

const objetoService = { listar, obtener, crear, actualizar, eliminar };

export default objetoService;
