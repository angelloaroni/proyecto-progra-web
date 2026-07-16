import axiosClient from "./axiosClient";

const listarPendientes = async () => {
  const { data } = await axiosClient.get("/reclamo");
  return data;
};

const listarMios = async () => {
  const { data } = await axiosClient.get("/reclamo/mios");
  return data;
};

const crear = async ({ objetoId, evidencia }) => {
  const { data } = await axiosClient.post("/reclamo", { objetoId, evidencia });
  return data;
};

const resolver = async (id, aprobado) => {
  const { data } = await axiosClient.put(`/reclamo/${id}/resolver`, { aprobado });
  return data;
};

const reclamoService = { listarPendientes, listarMios, crear, resolver };

export default reclamoService;
