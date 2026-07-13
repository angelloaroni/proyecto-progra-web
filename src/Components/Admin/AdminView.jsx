import "./AdminView.css";
import registroIcon from "../../assets/Registro_objeto.png";
import reclamoIcon from "../../assets/Reclamo.png";
import usuariosIcon from "../../assets/Gestion_usuario.png";

const AdminView = ({ onNavigate }) => {
  return (
    <section className="admin-view">
      <div className="admin-hero">
        <h2>Panel de Administración</h2>
        <p>Gestiona los objetos perdidos, reclamos y usuarios del campus.</p>
      </div>
      <div className="admin-options">
        <article className="admin-card" onClick={() => onNavigate("/admin/register")}>
          <div className="admin-card-icon">
            <img src={registroIcon} alt="Registrar" />
          </div>
          <div className="admin-card-body">
            <h3>Registrar Objeto Perdido</h3>
            <p>Publica un nuevo objeto encontrado en el catálogo del campus.</p>
          </div>
          <span className="admin-card-arrow">→</span>
        </article>

        <article className="admin-card" onClick={() => onNavigate("/admin/claims")}>
          <div className="admin-card-icon">
            <img src={reclamoIcon} alt="Reclamos" />
          </div>
          <div className="admin-card-body">
            <h3>Reclamos Pendientes</h3>
            <p>Revisa y resuelve los reclamos enviados por los alumnos.</p>
          </div>
          <span className="admin-card-arrow">→</span>
        </article>

        <article className="admin-card" onClick={() => onNavigate("/admin/users")}>
          <div className="admin-card-icon">
            <img src={usuariosIcon} alt="Usuarios" />
          </div>
          <div className="admin-card-body">
            <h3>Gestión de Usuarios</h3>
            <p>Administra el acceso de los alumnos a la plataforma.</p>
          </div>
          <span className="admin-card-arrow">→</span>
        </article>

        <article className="admin-card" onClick={() => onNavigate("/admin/items")}>
          <div className="admin-card-icon">
            <img src={registroIcon} alt="Objetos" />
          </div>
          <div className="admin-card-body">
            <h3>Catálogo de Objetos</h3>
            <p>Visualiza y edita los objetos publicados en el catálogo.</p>
          </div>
          <span className="admin-card-arrow">→</span>
        </article>
      </div>
    </section>
  );
};

export default AdminView;