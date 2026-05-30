import "./Header.css";

export default function Header({ view, rol, onNavigate, onLogout }) {
  return (
    <header>
      <h1>
        <span>U</span>LIMA | Plataforma de Objetos Perdidos
      </h1>
      {view !== "login" && (
        <nav>
          <button onClick={() => onNavigate("student")}>Inicio / Buscar</button>
          {rol === "admin" && (
            <button onClick={() => onNavigate("admin")}>Panel Admin</button>
          )}
          <button onClick={onLogout}>Cerrar Sesión</button>
        </nav>
      )}
    </header>
  );
}