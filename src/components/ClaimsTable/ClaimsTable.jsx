import { useEffect, useState } from "react";
import reclamoService from "../../services/reclamo.service";
import getErrorMessage from "../../services/getErrorMessage";
import "./ClaimsTable.css";

const ClaimsTable = () => {
  const [reclamos, setReclamos] = useState([]);

  const cargarReclamos = async () => {
    try {
      const data = await reclamoService.listarPendientes();
      setReclamos(data);
    } catch (error) {
      console.error("Error al cargar reclamos:", getErrorMessage(error));
    }
  };

  useEffect(() => {
    cargarReclamos();
  }, []);

  const resolverReclamo = async (id, aprobado) => {
    try {
      const response = await reclamoService.resolver(id, aprobado);
      alert(response.message);
      if (response.success) {
        cargarReclamos();
      }
    } catch (error) {
      alert(getErrorMessage(error, "No se pudo resolver el reclamo."));
    }
  };

  return (
    <div className="claims-table-box">
      <h2>Reclamos Pendientes</h2>
      <div className="claims-table-wrapper">
        <table className="claims-table">
          <thead>
            <tr>
              <th>Objeto</th>
              <th>Alumno (Código)</th>
              <th>Evidencia Presentada</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {reclamos.length === 0 ? (
              <tr>
                <td colSpan="4" className="no-claims-cell">
                  <span className="no-claims-icon">✅</span>
                  No hay reclamos pendientes
                </td>
              </tr>
            ) : (
              reclamos.map((rec) => (
                <tr key={rec.id}>
                  <td><strong>{rec.objetoNombre}</strong></td>
                  <td><code className="codigo">{rec.alumnoCodigo}</code></td>
                  <td className="evidencia-cell">"{rec.evidencia}"</td>
                  <td className="actions">
                    <button
                      className="btn btn-accept"
                      onClick={() => resolverReclamo(rec.id, true)}
                    >
                      Aceptar
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => resolverReclamo(rec.id, false)}
                    >
                      Rechazar
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClaimsTable;
