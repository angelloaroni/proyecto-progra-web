import axiosClient from "./axiosClient";

const listar = async () => {
  const { data } = await axiosClient.get("/objeto");
  return data;
};

const obtener = async (id) => {
  const { data } = await axiosClient.get(`/objeto/${id}`);
  return data;
};

const crear = async ({ nombre, categoria, descripcion, icono, ubicacion }) => {
  const { data } = await axiosClient.post("/objeto", { nombre, categoria, descripcion, icono, ubicacion });
  return data;
};

const actualizar = async (id, { nombre, categoria, descripcion, icono, ubicacion }) => {
  const { data } = await axiosClient.put(`/objeto/${id}`, { nombre, categoria, descripcion, icono, ubicacion });
  return data;
};

const eliminar = async (id) => {
  const { data } = await axiosClient.delete(`/objeto/${id}`);
  return data;
};

const objetoService = { listar, obtener, crear, actualizar, eliminar };

export default objetoService;