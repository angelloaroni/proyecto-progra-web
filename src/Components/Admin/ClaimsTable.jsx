import "./Admin.css";

export default function ClaimsTable({ reclamos, onResolver }) {
  return (
    <div className="box">
      <h2>Reclamos Pendientes</h2>
      <div style={{ overflowX: "auto" }}>
        <table>
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
                <td colSpan="4" style={{ textAlign: "center", color: "#888" }}>
                  No hay reclamos pendientes
                </td>
              </tr>
            ) : (
              reclamos.map((rec, index) => (
                <tr key={rec.id}>
                  <td><strong>{rec.objetoNombre}</strong></td>
                  <td>{rec.alumnoCodigo}</td>
                  <td>"{rec.evidencia}"</td>
                  <td className="actions">
                    <button
                      className="btn"
                      style={{ backgroundColor: "#28a745" }}
                      onClick={() => onResolver(index, true)}
                    >
                      Aceptar
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => onResolver(index, false)}
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
}