import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Header.css";
import logo from "../../assets/Universidad_de_Lima_logo.png";

const Header = () => {
  const { usuarioActual, logout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const rol = usuarioActual?.rol;
  const isLoggedIn = pathname !== "/" && pathname !== "/register";
  const isAdminArea = pathname.startsWith("/admin");

  const handleLogout = () => {
    logout();
    navigate("/");
  };

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
              onClick={() => navigate("/student")}
            >
              Objetos Perdidos
            </button>
          )}
          {rol === "admin" && (
            <button
              className={isAdminArea ? "nav-active" : ""}
              onClick={() => navigate("/admin")}
            >
              Panel Admin
            </button>
          )}
          <button className="logout-btn" onClick={handleLogout}>Cerrar Sesión</button>
        </nav>
      )}
    </header>
  );
};

export default Header;
