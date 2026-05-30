import "./Admin.css";

export default function UsersTable({ usuarios, onToggleAcceso }) {
  return (
    <div className="box">
      <h2>Gestión de Usuarios</h2>
      <div style={{ overflowX: "auto" }}>
        <table>
          <thead>
            <tr>
              <th>Código</th>
              <th>Nombre</th>
              <th>Estado de Acceso</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usr, index) => (
              <tr key={usr.codigo}>
                <td>{usr.codigo}</td>
                <td>{usr.nombre}</td>
                <td>
                  <span style={{ color: usr.activo ? "green" : "red", fontWeight: "bold" }}>
                    {usr.activo ? "Activo" : "Bloqueado"}
                  </span>
                </td>
                <td className="actions">
                  <button
                    className={`btn ${usr.activo ? "btn-danger" : ""}`}
                    style={{ width: "130px" }}
                    onClick={() => onToggleAcceso(index)}
                  >
                    {usr.activo ? "Quitar Acceso" : "Dar Acceso"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}