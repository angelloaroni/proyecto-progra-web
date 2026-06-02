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
                  <span className={`user-status ${usr.activo ? "active" : "blocked"}`}>
                    {usr.activo ? "Activo" : "Bloqueado"}
                  </span>
                </td>
                <td className="actions">
                  <button
                    className={`btn ${usr.activo ? "btn-danger" : "btn-access"} user-action-btn`}
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
};

export default UsersTable;