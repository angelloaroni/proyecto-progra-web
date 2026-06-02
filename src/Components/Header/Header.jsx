import "./Header.css";
import logo from "../../assets/Universidad_de_Lima_logo.png";

export default function Header({ view, rol, onNavigate, onLogout }) {
  return (
    <header>
      <div className="header-brand">
        <img className="header-logo" src={logo} alt="Universidad de Lima" />
        <h1>
          <span>U</span>LIMA | Plataforma{rol === "admin" ? " de Objetos Perdidos" : ""}
        </h1>
      </div>
      {view !== "login" && (
        <nav>
          {rol === "admin" && (
            <>
              <button onClick={() => onNavigate("student")}>Objetos Perdidos</button>
              <button onClick={() => onNavigate("admin")}>Panel Admin</button>
            </>
          )}
          <button onClick={onLogout}>Cerrar Sesión</button>
        </nav>
      )}
    </header>
  );
}