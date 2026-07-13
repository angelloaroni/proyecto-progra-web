import "./UsersTable.css";

const UsersTable = ({ usuarios, onToggleAcceso }) => {
  return (
    <div className="users-table-box">
      <h2>Gestión de Usuarios</h2>
      <div className="users-table-wrapper">
        <table className="users-table">
          <thead>
            <tr>
              <th>Código</th>
              <th>Nombre</th>
              <th>Rol</th>
              <th>Reclamos</th>
              <th>Estado de Acceso</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usr) => (
              <tr key={usr.id}>
                <td><code className="codigo">{usr.codigo}</code></td>
                <td><strong>{usr.nombre}</strong></td>
                <td>
                  <span className={`user-rol ${usr.rol === "admin" ? "admin" : "student"}`}>
                    {usr.rol === "admin" ? "🛡️ Admin" : "🎓 Alumno"}
                  </span>
                </td>
                <td>{usr.aprobados ?? 0} / {usr.totalReclamos ?? 0}</td>
                <td>
                  <span className={`user-status ${usr.activo ? "active" : "blocked"}`}>
                    <span className="status-dot" />
                    {usr.activo ? "Activo" : "Bloqueado"}
                  </span>
                </td>
                <td className="actions">
                  <button
                    className={`btn ${usr.activo ? "btn-danger" : "btn-access"} user-action-btn`}
                    onClick={() => onToggleAcceso(usr.id)}
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
};

export default UsersTable;