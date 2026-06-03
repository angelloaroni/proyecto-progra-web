import "./Header.css";
import logo from "../../assets/Universidad_de_Lima_logo.png";

const Header = ({ view, rol, onNavigate, onLogout }) => {
  return (
    <header>
      <div className="header-brand">
        <img className="header-logo" src={logo} alt="Universidad de Lima" />
        <div className="header-title">
          <span className="header-ulima">ULIMA</span>
          <span className="header-divider">|</span>
          <span className="header-subtitle">Plataforma de Objetos Perdidos</span>
        </div>
      </div>
      {view !== "login" && (
        <nav>
          {rol === "admin" && (
            <>
              <button onClick={() => onNavigate("student")}>Objetos Perdidos</button>
              <button onClick={() => onNavigate("admin")}>Panel Admin</button>
            </>
          )}
          <button className="logout-btn" onClick={onLogout}>Cerrar Sesión</button>
        </nav>
      )}
    </header>
  );
};

export default Header;
