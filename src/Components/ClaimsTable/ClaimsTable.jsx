import "./ClaimsTable.css";

const ClaimsTable = ({ reclamos, onResolver }) => {
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
                      className="btn btn-accept"
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
};

export default ClaimsTable;