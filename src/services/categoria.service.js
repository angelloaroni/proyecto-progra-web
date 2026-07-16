import axiosClient from "./axiosClient";

const listar = async () => {
  const { data } = await axiosClient.get("/categoria");
  return data;
};

const crear = async (nombre) => {
  const { data } = await axiosClient.post("/categoria", { nombre });
  return data;
};

const eliminar = async (id) => {
  const { data } = await axiosClient.delete(`/categoria/${id}`);
  return data;
};

const categoriaService = { listar, crear, eliminar };

export default categoriaService;