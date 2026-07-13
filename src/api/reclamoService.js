import axiosClient from "./axiosClient";

// GET /reclamo (admin) -> reclamos pendientes
const listarPendientes = async () => {
  const { data } = await axiosClient.get("/reclamo");
  return data;
};

// GET /reclamo/mios (alumno) -> mis reclamos
const listarMios = async () => {
  const { data } = await axiosClient.get("/reclamo/mios");
  return data;
};

// POST /reclamo (alumno) -> { success, message, reclamo }
const crear = async ({ objetoId, evidencia }) => {
  const { data } = await axiosClient.post("/reclamo", { objetoId, evidencia });
  return data;
};

// PUT /reclamo/:id/resolver (admin) -> { success, message, reclamo }
const resolver = async (id, aprobado) => {
  const { data } = await axiosClient.put(`/reclamo/${id}/resolver`, { aprobado });
  return data;
};

const reclamoService = { listarPendientes, listarMios, crear, resolver };

export default reclamoService;
