import "./AdminView.css";
import registroIcon from "../../assets/Registro_objeto.png";
import reclamoIcon from "../../assets/Reclamo.png";
import usuariosIcon from "../../assets/Gestion_usuario.png";

const AdminView = ({ onNavigate }) => {
  return (
    <section className="admin-view">
      <h2>Panel de Administración</h2>
      <div className="admin-options">
        <article className="admin-card" onClick={() => onNavigate("admin-register")}>
          <img src={registroIcon} alt="Registrar" />
          <h3>Registrar Nuevo Objeto Perdido</h3>
        </article>

        <article className="admin-card" onClick={() => onNavigate("admin-claims")}>
          <img src={reclamoIcon} alt="Reclamos" />
          <h3>Reclamos Pendientes</h3>
        </article>

        <article className="admin-card" onClick={() => onNavigate("admin-users")}>
          <img src={usuariosIcon} alt="Usuarios" />
          <h3>Gestión de Usuarios</h3>
        </article>
      </div>
    </section>
  );
};

export default AdminView;