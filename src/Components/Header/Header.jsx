import { useLocation } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/Universidad_de_Lima_logo.png";

const Header = ({ rol, onNavigate, onLogout }) => {
  const { pathname } = useLocation();
  const isLoggedIn = pathname !== "/" && pathname !== "/register";
  const isAdminArea = pathname.startsWith("/admin");

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
      {isLoggedIn && (
        <nav>
          {rol === "student" && (
            <button
              className={pathname === "/student" ? "nav-active" : ""}
              onClick={() => onNavigate("/student")}
            >
              Objetos Perdidos
            </button>
          )}
          {rol === "admin" && (
            <button
              className={isAdminArea ? "nav-active" : ""}
              onClick={() => onNavigate("/admin")}
            >
              Panel Admin
            </button>
          )}
          <button className="logout-btn" onClick={onLogout}>Cerrar Sesión</button>
        </nav>
      )}
    </header>
  );
};

export default Header;