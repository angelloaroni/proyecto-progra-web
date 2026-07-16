import { useEffect, useState } from "react";
import authService from "../../services/auth.service";
import getErrorMessage from "../../services/getErrorMessage";
import "./UsersTable.css";

const UsersTable = () => {
  const [usuarios, setUsuarios] = useState([]);

  const cargarUsuarios = async () => {
    try {
      const data = await authService.listarUsuarios();
      setUsuarios(data);
    } catch (error) {
      console.error("Error al cargar usuarios:", getErrorMessage(error));
    }
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const toggleAccesoUsuario = async (id) => {
    try {
      const response = await authService.toggleAcceso(id);
      if (response.success) {
        cargarUsuarios();
      } else {
        alert(response.message);
      }
    } catch (error) {
      alert(getErrorMessage(error, "No se pudo actualizar el acceso del usuario."));
    }
  };

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
                    onClick={() => toggleAccesoUsuario(usr.id)}
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
